import type { CSSProperties } from 'react'

type IconName =
  | 'arrow'
  | 'external'
  | 'down'
  | 'close'
  | 'menu'
  | 'github'
  | 'mail'
  | 'phone'
  | 'linkedin'
  | 'check'
  | 'copy'
  | 'document'
  | 'spark'
  | 'leaf'
  | 'code'
  | 'layers'

const paths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M4 12h15M13 5l7 7-7 7" />
    </>
  ),
  external: (
    <>
      <path d="M7 17 18 6M6 6h12v12" />
    </>
  ),
  down: (
    <>
      <path d="M12 4v16M5 13l7 7 7-7" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M6 18 18 6" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 17h16" />
    </>
  ),
  github: (
    <>
      <path
        d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.7-1.6 6.7-7.3A5.7 5.7 0 0 0 19.2 4a5.3 5.3 0 0 0-.1-4S17.8-.4 15 1.5a14 14 0 0 0-7 0C5.2-.4 3.9 0 3.9 0a5.3 5.3 0 0 0-.1 4 5.7 5.7 0 0 0-1.5 4c0 5.7 3.4 6.9 6.7 7.3A3.5 3.5 0 0 0 8 18v4"
        transform="translate(1 1) scale(.9)"
      />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  phone: (
    <path d="M5 3h4l2 5-3 2a14 14 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="7" cy="7" r="0.8" fill="currentColor" stroke="none" />
      <path d="M7 10v7m4 0v-7m0 3a3 3 0 0 1 6 0v4" />
    </>
  ),
  check: (
    <>
      <path d="m5 12 4 4L19 6" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="13" rx="2" />
      <path d="M16 8V3H3v13h5" />
    </>
  ),
  document: (
    <>
      <path d="M14 3H5v18h14V8zM14 3v6h5M8 13h8M8 17h5" />
    </>
  ),
  spark: (
    <>
      <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 3C9 2 2 6 4 14c2 8 16 6 16-11ZM5 19l10-10" />
    </>
  ),
  code: (
    <>
      <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 10 6-10 6L2 9zM2 14l10 6 10-6M2 18l10 6 10-6" transform="translate(0 -1)" />
    </>
  ),
}

export default function Icon({
  name,
  size = 20,
  className,
  style,
}: {
  name: IconName
  size?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {paths[name]}
    </svg>
  )
}
