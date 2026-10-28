import { useEffect, useRef } from 'react'
import type { Project } from '../data'
import Icon from './Icon'

export default function CaseStudy({
  project,
  onClose,
  returnFocusTo,
}: {
  project: Project
  onClose: () => void
  returnFocusTo: HTMLElement | null
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const pointerStartedOnBackdrop = useRef(false)

  useEffect(() => {
    const previousFocus = returnFocusTo ?? document.activeElement
    const previousOverflow = document.body.style.overflow
    const element = dialog.current
    element?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element?.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [returnFocusTo])

  return (
    <dialog
      ref={dialog}
      className="case-study"
      aria-labelledby="case-study-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onPointerDown={(event) => {
        pointerStartedOnBackdrop.current = event.target === event.currentTarget
      }}
      onClick={(event) => {
        if (pointerStartedOnBackdrop.current && event.target === event.currentTarget) onClose()
        pointerStartedOnBackdrop.current = false
      }}
    >
      <div className="case-study-top">
        <span className="eyebrow">{project.number} / PROJECT DETAILS</span>
        <button className="icon-button" onClick={onClose} aria-label="Close project details" autoFocus>
          <Icon name="close" />
        </button>
      </div>
      <article className="case-study-content">
        <p className="case-context">{project.context}</p>
        <h2 id="case-study-title">{project.title}</h2>
        <p className="case-overview">{project.overview}</p>
        <div className="technology-list">
          {project.detailTechnologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <section className="case-section">
          <span className="eyebrow">01 / THE PROBLEM</span>
          <h3>Problem</h3>
          <p>{project.problem}</p>
        </section>
        <section className="case-section">
          <span className="eyebrow">02 / THE IMPLEMENTATION</span>
          <h3>Implementation</h3>
          <div className="implementation-list">
            {project.implementation.map((item, index) => (
              <div key={item.title}>
                <span className="step-number">0{index + 1}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {project.architecture && (
          <section className="case-section" aria-labelledby="case-architecture-title">
            <span className="eyebrow">SYSTEM ARCHITECTURE</span>
            <h3 id="case-architecture-title">How the system fits together</h3>
            <p>Explore the IT and HR profiles, retrieval pipeline, and integrations.</p>
            <figure className="architecture-figure">
              <a
                className="architecture-link"
                href={project.architecture.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.architecture.title}, view full-size diagram (opens in a new tab)`}
              >
                <img
                  src={project.architecture.src}
                  alt={project.architecture.alt}
                  width={project.architecture.width}
                  height={project.architecture.height}
                  loading="lazy"
                />
                <span>Open full-size diagram <Icon name="external" size={17} /></span>
              </a>
              <figcaption>System architecture diagram created with ChatGPT based on the project’s source code.</figcaption>
            </figure>
          </section>
        )}
        <section className="case-section">
          <span className="eyebrow">03 / MY CONTRIBUTIONS</span>
          <h3>My contributions</h3>
          {project.contributionOverview && <p>{project.contributionOverview}</p>}
          <ul className="case-responsibilities">
            {project.responsibilities.map((item) => (
              <li key={item}>
                <Icon name="check" size={17} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        {project.screenshots && (
          <section className="case-section" aria-labelledby="case-screenshots-title">
            <span className="eyebrow">APP SCREENSHOTS</span>
            <h3 id="case-screenshots-title">Inside the app</h3>
            <p>Explore the meal and nutrition features. Open any screenshot to view it full size.</p>
            <div className="screenshot-gallery">
              {project.screenshots.map((screenshot) => (
                <figure key={screenshot.src}>
                  <a
                    href={screenshot.src}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${screenshot.title}, view full-size screenshot (opens in a new tab)`}
                  >
                    <img
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={screenshot.width}
                      height={screenshot.height}
                      loading="lazy"
                    />
                  </a>
                  <figcaption>{screenshot.title}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        <section className="case-section case-note">
          <span className="eyebrow">{project.considerationsLabel ?? 'PROJECT CONTEXT'}</span>
          {project.evaluation ? (
            <div className="evaluation-layout">
              <div>
                <h4>Automated evaluation</h4>
                <p>{project.evaluation.method}</p>
                <ul className="evaluation-metrics" aria-label="Answer quality metrics">
                  {project.evaluation.metrics.map((metric) => <li key={metric}>{metric}</li>)}
                </ul>
                <p>{project.evaluation.runtime}</p>
              </div>
              <div className="evaluation-feedback">
                <h4>User testing</h4>
                <p>{project.considerations}</p>
              </div>
            </div>
          ) : <p>{project.considerations}</p>}
        </section>
        <div className="case-study-bottom">
          {project.repository ? (
            <a
              className="repository-link"
              href={project.repository}
              target="_blank"
              rel="noreferrer"
              aria-label={`Source code for ${project.title} on GitHub (opens in a new tab)`}
            >
              <Icon name="github" size={20} />
              <span>Source code</span>
              <Icon name="external" size={15} />
            </a>
          ) : (
            <span className="private-project">
              <Icon name="layers" size={18} />
              <span>{project.sourceNote ?? 'Source code is not publicly available.'}</span>
            </span>
          )}
          <button className="text-link" onClick={onClose}>
            Back to projects <Icon name="arrow" size={17} />
          </button>
        </div>
      </article>
    </dialog>
  )
}
