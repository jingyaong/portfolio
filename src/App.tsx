import { useEffect, useRef, useState } from 'react'
import { credentials, experience, profile, projects, skillGroups } from './data'
import type { Project, ProjectFilter } from './data'
import CaseStudy from './components/CaseStudy'
import Icon from './components/Icon'
import ProjectVisual from './components/ProjectVisual'

function SectionHeading({ number, title, id }: { number: string; title: string; id: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow" aria-hidden="true">{number}</span>
      <h2 className="section-title" id={id}>{title}</h2>
    </div>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const menuToggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuToggle.current?.focus()
      }
    }
    const closeOutsideHeader = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    // Reset the disclosure when switching to the desktop navigation.
    const desktop = window.matchMedia('(min-width: 801px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutsideHeader)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOutsideHeader)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])

  return (
    <header
      ref={header}
      className="site-header"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false)
      }}
    >
      <div className="header-inner container">
        <a href="#about" className="brand" aria-label="Ng Jing Yao, back to top">
          <span className="brand-name">Ng Jing Yao</span>
        </a>
        <nav
          className={`main-navigation ${menuOpen ? 'is-open' : ''}`}
          id="main-navigation"
          aria-label="Main navigation"
        >
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>
            Experience
          </a>
          <a href="#education" onClick={() => setMenuOpen(false)}>
            Education
          </a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>
            Projects
          </a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>
            Skills
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
        <button
          ref={menuToggle}
          className="menu-toggle icon-button"
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}

function About() {
  return (
    <section className="hero container" id="about" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="section-title hero-label">About Me</p>
        <p className="hero-introduction">Hi, I’m</p>
        <h1 id="hero-title">Ng Jing Yao</h1>
        <p className="hero-description">
          I’m a Software Engineering fresh graduate interested in full-stack development and building
          AI-powered applications.
        </p>
        <p className="hero-supporting">
          I enjoy building software applications and integrating AI to help solve practical problems.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore my work <Icon name="down" size={18} />
          </a>
          <a href={profile.resume} className="text-link" download="Ng_Jing_Yao_Resume.pdf">
            <Icon name="document" size={18} /> Download resume
          </a>
        </div>
      </div>
    </section>
  )
}

function Projects({
  onSelect,
}: {
  onSelect: (project: Project, trigger: HTMLButtonElement) => void
}) {
  const [filter, setFilter] = useState<ProjectFilter>('All projects')
  const filteredProjects = projects.filter(
    (project) => filter === 'All projects' || project.category === filter,
  )

  return (
    <section
      className="projects-section section-space container"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="projects-toolbar">
        <SectionHeading number="03" title="Projects" id="projects-title" />
        <div className="project-filter" role="group" aria-label="Filter projects">
          {(['All projects', 'Internship project', 'Final-year project'] as ProjectFilter[]).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={filter === item ? 'is-active' : ''}
            >
              {item}
              <span>{item === 'All projects' ? '02' : '01'}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}.
      </p>
      <div className="project-list">
        {filteredProjects.map((project) => (
          <article className={`project-row project-${project.id}`} key={project.id}>
            <ProjectVisual project={project.id} />
            <div className="project-description">
              <div className="project-context">
                <span>{project.number}</span>
                <span>{project.context}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="project-summary">{project.summary}</p>
              <p className="project-contribution">{project.contribution}</p>
              <div className="technology-list">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <div className="project-actions">
                <button
                  className="text-link"
                  onClick={(event) => onSelect(project, event.currentTarget)}
                  aria-label={`View project details for ${project.title}`}
                >
                  View project details <Icon name="arrow" size={18} />
                </button>
                {project.repository && (
                  <a
                    className="repository-link"
                    href={project.repository}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} GitHub repository (opens in a new tab)`}
                  >
                    <Icon name="github" size={20} />
                    <span>Source code</span>
                    <Icon name="external" size={15} />
                  </a>
                )}
                {project.sourceNote && <p className="project-source-note">{project.sourceNote}</p>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section
      className="experience-section container section-space"
      id="experience"
      aria-labelledby="experience-title"
    >
      <SectionHeading number="01" title="Experience" id="experience-title" />
      <div className="experience-list">
        {experience.map((item) => (
          <article className="experience-entry" key={item.company}>
            <div className="experience-date">
              <span className="experience-dot" />
              <span>{item.period}</span>
              <small>INTERNSHIP</small>
            </div>
            <div className="experience-content">
              <div className="experience-role">
                <div>
                  <h3>{item.company}</h3>
                  <p>{item.role}</p>
                </div>
              </div>
              <ul>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section
      className="skills-section container section-space"
      id="skills"
      aria-labelledby="skills-title"
    >
      <SectionHeading number="04" title="Skills" id="skills-title" />
      <div className="skills-list">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <section className="spoken-languages" aria-labelledby="languages-title">
        <h3 id="languages-title">Languages</h3>
        <ul className="language-list">
          <li>
            <span>English</span>
            <small>Proficient</small>
          </li>
          <li>
            <span>Chinese</span>
            <small>Native</small>
          </li>
          <li>
            <span>Malay</span>
            <small>Intermediate</small>
          </li>
        </ul>
      </section>
    </section>
  )
}

function Education() {
  return (
    <section
      className="education-section container section-space"
      id="education"
      aria-labelledby="education-title"
    >
      <SectionHeading number="02" title="Education" id="education-title" />
      <div className="education-grid">
        <div className="degree-list">
          <article className="degree-entry">
            <span className="eyebrow">JUL 2024 — AUG 2026</span>
            <h3>Bachelor of Software Engineering</h3>
            <p>Tunku Abdul Rahman University of Management and Technology (TARUMT)</p>
            <span className="cgpa">
              CGPA <strong>3.73</strong>
            </span>
            <div className="academic-awards">
              <span>
                Dean’s List <small>Nov 2024</small>
              </span>
              <span>
                President’s List <small>Jan 2026</small>
              </span>
            </div>
          </article>
          <article className="degree-entry diploma">
            <span className="eyebrow">JUN 2022 — JUN 2024</span>
            <h3>Diploma in Information Technology</h3>
            <p>Tunku Abdul Rahman University of Management and Technology (TARUMT)</p>
            <span className="cgpa">
              CGPA <strong>3.79</strong>
            </span>
          </article>
        </div>
        <div className="credentials">
          <div className="credentials-heading">
            <h3>Certificates &amp; Badges</h3>
            <Icon name="spark" size={20} />
          </div>
          {credentials.map((credential) => (
            <a
              key={credential.url}
              className="credential-entry"
              href={credential.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${credential.fullTitle}, ${credential.date}, view credential (opens in a new tab)`}
            >
              <div>
                <span className="credential-meta">
                  {credential.issuer}
                  <span>{credential.date}</span>
                </span>
                <h4>{credential.fullTitle}</h4>
                <span className="credential-kind">{credential.kind}</span>
              </div>
              <Icon name="external" size={20} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copyState, setCopyState] = useState<{
    target: 'email' | 'phone'
    status: 'copied' | 'failed'
  } | null>(null)

  useEffect(() => {
    if (!copyState) return
    const timer = window.setTimeout(() => setCopyState(null), 3500)
    return () => window.clearTimeout(timer)
  }, [copyState])

  const copyContact = async (target: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(profile[target])
      setCopyState({ target, status: 'copied' })
    } catch {
      setCopyState({ target, status: 'failed' })
    }
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner container">
        <div className="contact-introduction">
          <SectionHeading number="05" title="Contact" id="contact-title" />
          <p>
            I’m looking for opportunities in software engineering, full-stack development, or AI
            application development. I’d appreciate it if you could review my resume and consider me
            for any suitable opportunities.
          </p>
        </div>
        <div className="contact-actions">
          <div className="contact-email">
            <span>
              <Icon name="mail" size={18} /> EMAIL
            </span>
            <div className="contact-value-row">
              <p className="contact-value">
                <a href={`mailto:${profile.email}`} draggable={false}>
                  <strong>{profile.email}</strong>
                  <Icon name="external" size={27} />
                </a>
              </p>
              <button
                className="contact-copy-button"
                onClick={() => copyContact('email')}
                aria-label="Copy email"
                title="Copy email"
              >
                <Icon
                  name={copyState?.target === 'email' && copyState.status === 'copied' ? 'check' : 'copy'}
                  size={18}
                />
              </button>
            </div>
          </div>
          <div className="contact-email">
            <span>
              <Icon name="phone" size={18} /> PHONE
            </span>
            <div className="contact-value-row">
              <p className="contact-value">
                <strong>{profile.phone}</strong>
              </p>
              <button
                className="contact-copy-button"
                onClick={() => copyContact('phone')}
                aria-label="Copy phone number"
                title="Copy phone number"
              >
                <Icon
                  name={copyState?.target === 'phone' && copyState.status === 'copied' ? 'check' : 'copy'}
                  size={18}
                />
              </button>
            </div>
          </div>
          <div className="contact-links">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
            >
              <Icon name="linkedin" size={20} /> LinkedIn <Icon name="external" size={16} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub (opens in a new tab)"
            >
              <Icon name="github" size={20} /> GitHub <Icon name="external" size={16} />
            </a>
          </div>
          <p className="copy-status" role="status">
            {copyState?.status === 'failed'
              ? copyState.target === 'email'
                ? 'Copy unavailable. You can use the email link above.'
                : 'Copy unavailable. Select the phone number above to copy it manually.'
              : copyState?.status === 'copied'
                ? `${copyState.target === 'email' ? 'Email' : 'Phone number'} copied to your clipboard.`
                : '\u00a0'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const projectTrigger = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <About />
        <Experience />
        <Education />
        <Projects
          onSelect={(project, trigger) => {
            projectTrigger.current = trigger
            setSelectedProject(project)
          }}
        />
        <Skills />
        <Contact />
      </main>
      <footer className="site-footer container">
        <a className="brand" href="#about" aria-label="Back to top">
          <span className="brand-name">Ng Jing Yao</span>
        </a>
        <span>© {new Date().getFullYear()} Ng Jing Yao</span>
        <a className="back-to-top" href="#about">
          Back to top <Icon name="down" size={15} />
        </a>
      </footer>
      {selectedProject && (
        <CaseStudy
          key={selectedProject.id}
          project={selectedProject}
          returnFocusTo={projectTrigger.current}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}
