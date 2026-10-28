import { useId, useState } from 'react'
import type { ComponentProps } from 'react'
import Icon from './Icon'
import { easyHealthyScreenshots } from '../data'
import type { ProjectId } from '../data'

const chatbotPipelines: {
  id: string
  label: string
  title: string
  caption: string
  steps: { icon: ComponentProps<typeof Icon>['name']; title: string; details: string[] }[]
}[] = [
  {
    id: 'request',
    label: 'Request & retrieval',
    title: 'Chatbot request & retrieval flow',
    caption: 'Knowledge retrieval & response generation',
    steps: [
      { icon: 'code', title: 'SharePoint chat', details: ['SPFx with React + TypeScript'] },
      { icon: 'layers', title: 'Flask backend', details: ['Conversation context & orchestration'] },
      { icon: 'spark', title: 'Query preprocessing', details: ['Rewriting, translation & abbreviation expansion'] },
      {
        icon: 'document', title: 'Hybrid retrieval & reranking',
        details: ['Retrieves context from the IT & HR knowledge base', 'ChromaDB + BM25 → Cross-encoder reranker'],
      },
      { icon: 'spark', title: 'ILMU LLM API', details: ['YTL AI Labs · Context-grounded generation'] },
      { icon: 'arrow', title: 'Streaming response', details: ['Server-Sent Events → SharePoint'] },
    ],
  },
  {
    id: 'ingestion',
    label: 'Document ingestion',
    title: 'Document ingestion pipeline',
    caption: 'Document ingestion & knowledge preparation',
    steps: [
      { icon: 'document', title: 'Knowledge documents', details: ['20+ Markdown & PDF sources'] },
      { icon: 'code', title: 'Document processing', details: ['Extract text & track document metadata'] },
      { icon: 'layers', title: 'Hierarchical chunking', details: ['Organize document content into searchable chunks'] },
      { icon: 'document', title: 'Abbreviation extraction', details: ['Build and update abbreviation definitions'] },
      { icon: 'spark', title: 'Embeddings & indexing', details: ['Generate embeddings and update ChromaDB', 'Incrementally re-index changed documents'] },
      { icon: 'arrow', title: 'IT & HR knowledge base', details: ['Prepared context for the retrieval pipeline'] },
    ],
  },
]

function ChatbotVisual() {
  const [activePipeline, setActivePipeline] = useState(0)
  const id = useId()

  return (
    <figure
      className="project-visual chatbot-visual"
      aria-label="Chatbot architecture with separate request and document ingestion diagrams"
    >
      <div className="visual-topline">
        <span className="visual-label"><span className="visual-dot" /> SYSTEM OVERVIEW</span>
      </div>
      <div className="pipeline-tabs" role="tablist" aria-label="Chatbot architecture diagrams">
        {chatbotPipelines.map((pipeline, index) => (
          <button
            key={pipeline.id}
            type="button"
            role="tab"
            id={`${id}-${pipeline.id}-tab`}
            aria-controls={`${id}-${pipeline.id}-panel`}
            aria-selected={activePipeline === index}
            tabIndex={activePipeline === index ? 0 : -1}
            onClick={() => setActivePipeline(index)}
            onKeyDown={(event) => {
              let next = index
              if (event.key === 'ArrowRight') next = (index + 1) % chatbotPipelines.length
              else if (event.key === 'ArrowLeft') next = (index - 1 + chatbotPipelines.length) % chatbotPipelines.length
              else if (event.key === 'Home') next = 0
              else if (event.key === 'End') next = chatbotPipelines.length - 1
              else return
              event.preventDefault()
              setActivePipeline(next)
              event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
            }}
          >
            {pipeline.label}
          </button>
        ))}
      </div>
      {chatbotPipelines.map((pipeline, index) => (
        <div
          key={pipeline.id}
          role="tabpanel"
          id={`${id}-${pipeline.id}-panel`}
          aria-labelledby={`${id}-${pipeline.id}-tab`}
          hidden={activePipeline !== index}
          tabIndex={0}
        >
          <div className="visual-heading">{pipeline.title}</div>
          <div className="chatbot-profiles" aria-label="Separate chatbot profiles">
            <span>IT profile</span>
            <span>HR profile</span>
            {pipeline.id === 'ingestion' && <span>On document updates</span>}
          </div>
          <ol className="chatbot-flow" aria-label={pipeline.title}>
            {pipeline.steps.map((step) => (
              <li key={step.title}>
                <span className="flow-icon"><Icon name={step.icon} size={18} /></span>
                <div>
                  <strong>{step.title}</strong>
                  {step.details.map((detail) => <span key={detail}>{detail}</span>)}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <figcaption>Full-Stack RAG Chatbot · {chatbotPipelines[activePipeline].caption}</figcaption>
    </figure>
  )
}

function EasyHealthyVisual() {
  return (
    <figure
      className="project-visual healthy-visual"
      aria-label="EasyHealthy app screenshots showing recipe discovery and daily meal planning"
    >
      <div className="visual-topline">
        <span className="visual-label"><span className="visual-dot" /> APP SCREENSHOTS</span>
      </div>
      <div className="app-preview-screens">
        {easyHealthyScreenshots.slice(0, 2).map((screenshot) => (
          <div className="app-preview-screen" key={screenshot.src}>
            <img
              src={screenshot.src}
              alt={screenshot.alt}
              width={screenshot.width}
              height={screenshot.height}
              loading="lazy"
            />
            <span>{screenshot.title}</span>
          </div>
        ))}
      </div>
      <figcaption>EasyHealthy · Recipe discovery & meal planning</figcaption>
    </figure>
  )
}

export default function ProjectVisual({ project }: { project: ProjectId }) {
  return project === 'knowledge-chatbot' ? <ChatbotVisual /> : <EasyHealthyVisual />
}
