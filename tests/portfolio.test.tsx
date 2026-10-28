import { act } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App'
import { profile } from '../src/data'

let root: Root
let host: HTMLDivElement
let desktopMediaQuery: MediaQueryList

function button(name: string) {
  const match = [...host.querySelectorAll('button')].find(
    (element) =>
      element.getAttribute('aria-label') === name || element.textContent?.startsWith(name),
  )
  if (!match) throw new Error(`Missing button: ${name}`)
  return match
}

async function click(element: Element) {
  await act(async () => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
}

beforeEach(async () => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
  desktopMediaQuery = Object.assign(new EventTarget(), {
    matches: false,
    media: '(min-width: 801px)',
  }) as MediaQueryList
  vi.stubGlobal('matchMedia', vi.fn(() => desktopMediaQuery))
  // jsdom has no top-layer dialog implementation. Model only open/close state;
  // browser focus trapping and visual layout require a real-browser check.
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    value() {
      this.setAttribute('open', '')
    },
  })
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,
    value() {
      this.removeAttribute('open')
    },
  })
  host = document.createElement('div')
  document.body.append(host)
  root = createRoot(host)
  await act(async () => {
    root.render(<App />)
  })
})

afterEach(async () => {
  await act(async () => {
    root.unmount()
  })
  host.remove()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('portfolio interactions', () => {
  it('shows both projects with the architecture illustration, real app screenshots, and resume', () => {
    expect(host.querySelectorAll('.project-row')).toHaveLength(2)
    expect(host.querySelectorAll('h1')).toHaveLength(1)
    expect(host.textContent).toContain('approximately 20 internal users')
    expect(host.textContent).toContain('Full-Stack RAG Chatbot · Knowledge retrieval & response generation')
    expect(host.querySelectorAll('.healthy-visual img')).toHaveLength(2)
    expect(host.querySelector('.healthy-visual')?.textContent).toContain('APP SCREENSHOTS')
    expect(host.innerHTML).not.toContain('[TODO')
    expect(host.innerHTML).not.toContain('C:\\')
    expect(host.querySelector('.hero-actions a[download]')?.getAttribute('href')).toBe(profile.resume)
  })

  it('separates request and ingestion diagrams with mouse and keyboard navigation', async () => {
    const visiblePanel = () => host.querySelector('[role="tabpanel"]:not([hidden])')!
    expect(visiblePanel().textContent).toContain('Streaming response')
    expect(visiblePanel().textContent).not.toContain('Hierarchical chunking')
    await click(button('Document ingestion'))
    expect(button('Document ingestion').getAttribute('aria-selected')).toBe('true')
    expect(visiblePanel().textContent).toContain('Hierarchical chunking')
    expect(visiblePanel().textContent).not.toContain('Streaming response')
    await act(async () => {
      button('Document ingestion').focus()
      button('Document ingestion').dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
      )
    })
    expect(visiblePanel().textContent).toContain('Streaming response')
    expect(document.activeElement).toBe(button('Request & retrieval'))
    expect(button('Document ingestion').tabIndex).toBe(-1)
    expect(button('Request & retrieval').getAttribute('aria-controls')).toBe(visiblePanel().id)
  })

  it('filters projects and restores the full selection', async () => {
    await click(button('Internship project'))
    expect(host.querySelectorAll('.project-row')).toHaveLength(1)
    expect(host.querySelector('.project-row')?.textContent).toContain('Full-Stack RAG Chatbot')
    expect(button('Internship project').getAttribute('aria-pressed')).toBe('true')
    await click(button('Final-year project'))
    expect(host.querySelectorAll('.project-row')).toHaveLength(1)
    expect(host.querySelector('.project-row')?.textContent).toContain('EasyHealthy')
    await click(button('All projects'))
    expect(host.querySelectorAll('.project-row')).toHaveLength(2)
  })

  it('opens project details and restores focus and scrolling when dismissed', async () => {
    const trigger = button('View project details for Full-Stack RAG Chatbot')
    trigger.focus()
    await click(trigger)
    const dialog = host.querySelector('dialog')!
    expect(dialog.hasAttribute('open')).toBe(true)
    expect(dialog.querySelector('#case-study-title')?.textContent).toBe(
      'Full-Stack RAG Chatbot',
    )
    expect(document.body.style.overflow).toBe('hidden')
    const architectureLink = dialog.querySelector<HTMLAnchorElement>('.architecture-link')!
    expect(architectureLink.getAttribute('href')).toBe('/assets/chatbot/system-architecture.png')
    expect(architectureLink.getAttribute('target')).toBe('_blank')
    expect(architectureLink.querySelector('img')?.getAttribute('alt')).toContain('IT and HR profiles')
    await act(async () => {
      dialog.dispatchEvent(new Event('cancel', { cancelable: true }))
    })
    expect(host.querySelector('dialog')).toBeNull()
    expect(document.body.style.overflow).toBe('')
    expect(document.activeElement).toBe(trigger)
  })

  it('keeps collaboration details and the real repository in the mobile project details', async () => {
    await click(button('View project details for EasyHealthy'))
    const dialog = host.querySelector('dialog')!
    expect(dialog.textContent).toContain('two-person')
    expect(dialog.querySelector('a[href="https://github.com/jingyaong/easyhealthy"]')).not.toBeNull()
    expect(dialog.querySelectorAll('.screenshot-gallery img')).toHaveLength(6)
    expect(dialog.querySelector('.screenshot-gallery a')?.getAttribute('href')).toBe(
      '/assets/easyhealthy/recipe-discovery.jpg',
    )
    expect(dialog.textContent).not.toContain('concept preview')
    await click(button('Close project details'))
    expect(host.querySelector('dialog')).toBeNull()
  })

  it('dismisses project details only when the pointer also started on the backdrop', async () => {
    await click(button('View project details for EasyHealthy'))
    const dialog = host.querySelector('dialog')!
    await act(async () => {
      // Releasing outside after selecting text must not discard the open project details.
      dialog.querySelector('.case-overview')!.dispatchEvent(
        new MouseEvent('pointerdown', { bubbles: true }),
      )
    })
    await click(dialog)
    expect(host.querySelector('dialog')).toBe(dialog)
    await act(async () => {
      dialog.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
    })
    await click(dialog)
    expect(host.querySelector('dialog')).toBeNull()
    expect(document.body.style.overflow).toBe('')
  })

  it('toggles navigation and closes it after a section is selected', async () => {
    await click(button('Open navigation'))
    expect(button('Close navigation').getAttribute('aria-expanded')).toBe('true')
    await click(host.querySelector('#main-navigation a[href="#education"]')!)
    expect(button('Open navigation').getAttribute('aria-expanded')).toBe('false')
    await click(button('Open navigation'))
    await act(async () => {
      host.querySelector<HTMLAnchorElement>('#main-navigation a')!.focus()
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(button('Open navigation').getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(button('Open navigation'))
  })

  it('dismisses navigation when clicking outside or moving keyboard focus out of the header', async () => {
    await click(button('Open navigation'))
    await act(async () => {
      host.querySelector('main')!.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
    })
    expect(button('Open navigation').getAttribute('aria-expanded')).toBe('false')

    await click(button('Open navigation'))
    await act(async () => {
      host.querySelector<HTMLAnchorElement>('#main-navigation a')!.focus()
    })
    await act(async () => {
      host.querySelector<HTMLAnchorElement>('.hero-actions a')!.focus()
    })
    expect(button('Open navigation').getAttribute('aria-expanded')).toBe('false')
  })

  it('resets an open mobile menu after changing to desktop layout', async () => {
    await click(button('Open navigation'))
    await act(async () => {
      Object.assign(desktopMediaQuery, { matches: true })
      desktopMediaQuery.dispatchEvent(new Event('change'))
    })
    expect(button('Open navigation').getAttribute('aria-expanded')).toBe('false')
    await act(async () => {
      Object.assign(desktopMediaQuery, { matches: false })
      desktopMediaQuery.dispatchEvent(new Event('change'))
    })
    expect(button('Open navigation').getAttribute('aria-expanded')).toBe('false')
  })

  it.each([
    ['Copy email', profile.email, 'Email copied to your clipboard'],
    ['Copy phone number', profile.phone, 'Phone number copied to your clipboard'],
  ])('copies the correct contact value using %s', async (label, value, confirmation) => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
    await click(button(label))
    expect(writeText).toHaveBeenCalledWith(value)
    expect(host.querySelector('[role="status"]')?.textContent).toContain(confirmation)
  })

  it('offers an email link when clipboard access fails', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error('Clipboard unavailable')) },
    })
    await click(button('Copy email'))
    expect(host.querySelector('[role="status"]')?.textContent).toContain('use the email link above')
    expect(host.querySelector(`a[href="mailto:${profile.email}"]`)).not.toBeNull()
  })

  it('provides working internal anchors and the four supplied credential links', () => {
    for (const anchor of host.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      expect(
        host.querySelector(anchor.getAttribute('href')!),
        anchor.textContent ?? '',
      ).not.toBeNull()
    }
    expect(host.querySelectorAll('a[href^="https://www.credly.com/badges/"]')).toHaveLength(4)
    for (const anchor of host.querySelectorAll('a[target="_blank"]')) {
      expect(anchor.getAttribute('rel')).toContain('noreferrer')
    }
  })
})
