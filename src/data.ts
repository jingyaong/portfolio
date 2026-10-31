// Public-facing content only. Private source notes stay in portfolio-content.md.
export const profile = {
  name: 'Ng Jing Yao',
  email: 'jingyaong251104@gmail.com',
  phone: '+60 16-956 8231',
  github: 'https://github.com/jingyaong',
  linkedin: 'https://www.linkedin.com/in/ng-jing-yao-89a172290/',
  resume: '/Ng_Jing_Yao_Resume.pdf',
}

export type ProjectId = 'knowledge-chatbot' | 'easyhealthy'
export type ProjectFilter = 'All projects' | 'Internship project' | 'Final-year project'

export interface ProjectScreenshot {
  src: string
  title: string
  alt: string
  width: number
  height: number
}

export const easyHealthyScreenshots: ProjectScreenshot[] = [
  {
    src: '/assets/easyhealthy/recipe-discovery.jpg',
    title: 'Recipe discovery',
    alt: 'EasyHealthy recipe discovery with recommended recipes and lunch and dinner categories.',
    width: 540,
    height: 1072,
  },
  {
    src: '/assets/easyhealthy/meal-planner.jpg',
    title: 'Daily meal planner',
    alt: 'EasyHealthy generated meal plan with recipes for breakfast, lunch, dinner, and snacks.',
    width: 540,
    height: 1075,
  },
  {
    src: '/assets/easyhealthy/meal-tracking.jpg',
    title: 'Meal tracking',
    alt: 'EasyHealthy daily calorie and macronutrient goals with sections for logging meals.',
    width: 540,
    height: 1073,
  },
  {
    src: '/assets/easyhealthy/my-foods.jpg',
    title: 'My Foods',
    alt: 'EasyHealthy custom food list with serving information and buttons to add food to a meal.',
    width: 540,
    height: 1072,
  },
  {
    src: '/assets/easyhealthy/create-food.jpg',
    title: 'Custom food creation',
    alt: 'EasyHealthy create food form with serving size, calories, protein, carbohydrates, and fats.',
    width: 540,
    height: 1078,
  },
  {
    src: '/assets/easyhealthy/nutrition-progress.jpg',
    title: 'Nutrition progress',
    alt: 'EasyHealthy daily nutrition progress showing calorie and macronutrient totals.',
    width: 540,
    height: 1073,
  },
]

export interface Project {
  id: ProjectId
  number: string
  context: string
  category: Exclude<ProjectFilter, 'All projects'>
  title: string
  summary: string
  contribution: string
  technologies: string[]
  detailTechnologies: string[]
  repository?: string
  sourceNote?: string
  screenshots?: ProjectScreenshot[]
  architecture?: ProjectScreenshot
  overview: string
  problem: string
  implementation: { title: string; text: string }[]
  contributionOverview?: string
  responsibilities: string[]
  evaluation?: {
    method: string
    metrics: string[]
    runtime: string
  }
  considerationsLabel?: string
  considerations: string
}

export const projects: Project[] = [
  {
    id: 'knowledge-chatbot',
    number: '01',
    context: 'YTL Construction Sdn Bhd · Internship project',
    category: 'Internship project',
    title: 'Full-Stack RAG Chatbot',
    summary:
      'A RAG chatbot with AI agent capabilities for internal IT and HR support, combining knowledge retrieval with 5 LLM tool-calling workflows. Searches 20+ documents using hybrid retrieval and reranking, with streaming responses through a SharePoint-integrated interface. Tested with approximately 20 internal users, whose feedback helped improve retrieval quality and answer reliability.',
    contribution:
      'I built the SPFx React/TypeScript interface, Flask API, document ingestion and retrieval pipelines, and Docker deployment on Linux.',
    technologies: ['React', 'TypeScript', 'Python', 'Flask', 'RAG', 'LangChain', 'LLM tool calling', 'Docker'],
    detailTechnologies: [
      'React', 'TypeScript', 'SharePoint Framework (SPFx)', 'Python', 'Flask',
      'RAG', 'LangChain', 'ILMU LLM API', 'LLM tool calling', 'ChromaDB', 'BM25',
      'Cross-encoder reranking', 'Server-Sent Events (SSE)', 'Docker', 'Linux',
    ],
    sourceNote:
      'Source code is not publicly available, as this project was developed for YTL Construction during my internship. I’m happy to discuss the architecture and my implementation approach upon request.',
    architecture: {
      src: '/assets/chatbot/system-architecture.png',
      title: 'ILMU Chatbot system architecture',
      alt: 'Detailed ILMU chatbot architecture showing a SharePoint SPFx frontend, Flask backend with separate IT and HR profiles, hybrid retrieval, tool workflows, knowledge stores, and external services.',
      width: 1536,
      height: 1024,
    },
    overview:
      'A full-stack RAG chatbot with AI agent capabilities, developed during my internship at YTL Construction Sdn Bhd. I implemented document ingestion, hybrid retrieval, and LLM tool-calling workflows through a SharePoint-integrated chat experience.',
    problem:
      'Employees needed a conversational way to find information across internal IT and HR documentation, with answers grounded in the available knowledge sources.',
    implementation: [
      {
        title: 'Document ingestion and retrieval',
        text: 'Built an ingestion pipeline for 20+ Markdown and PDF documents using hierarchical chunking, metadata tracking, abbreviation extraction, embeddings, and incremental re-indexing. Combined ChromaDB vector search with BM25 keyword search and cross-encoder reranking.',
      },
      {
        title: 'ILMU API integration and query processing',
        text: 'Integrated ILMU, a large language model developed by YTL AI Labs, using its OpenAI-compatible API and LangChain. Query preprocessing included conversation-aware rewriting, translation, abbreviation expansion, and multi-query generation.',
      },
      {
        title: 'SharePoint chat interface',
        text: 'Built an SPFx React/TypeScript interface with streaming responses, conversation memory, feedback collection, and error reporting.',
      },
      {
        title: 'Tool-calling workflows',
        text: 'Implemented 5 LLM tool-calling workflows with backend validation, structured tool results, and human-in-the-loop confirmation for sensitive actions.',
      },
      {
        title: 'Answer safeguards',
        text: 'Designed rules for source-grounded answers, handling unsupported document claims, and responding to sensitive personal-data questions, with fallback responses when the available sources could not support an answer.',
      },
      {
        title: 'Deployment',
        text: 'Deployed separate containerized chatbot services on Linux using Docker, with health checks and structured logging.',
      },
    ],
    contributionOverview:
      'I developed the chatbot end to end under the guidance of my internship supervisor, covering the frontend, backend, retrieval pipeline, tool workflows, and deployment.',
    responsibilities: [
      'Built the document ingestion and hybrid retrieval pipelines.',
      'Integrated the ILMU LLM API and implemented 5 validated tool-calling workflows.',
      'Developed the SPFx React/TypeScript interface and feedback workflows.',
      'Configured separate Docker service profiles on Linux with health checks and logging.',
      'Designed source-grounded answer rules and safeguards for sensitive questions.',
      'Built an LLM-as-a-judge evaluation harness for response quality and runtime measurement.',
    ],
    evaluation: {
      method: 'Used ILMU as an LLM judge to score generated answers on a 1–5 scale.',
      metrics: ['Faithfulness', 'Relevance', 'Completeness', 'Format adherence', 'Conciseness'],
      runtime: 'Recorded pipeline and judge runtimes alongside the quality scores.',
    },
    considerationsLabel: 'EVALUATION & FEEDBACK',
    considerations:
      'Tested with approximately 20 internal users, whose feedback helped improve retrieval quality and answer reliability.',
  },
  {
    id: 'easyhealthy',
    number: '02',
    context: 'Final-year project · Two-person team',
    category: 'Final-year project',
    title: 'EasyHealthy',
    summary:
      'A diet and fitness tracker built with Flutter, bringing together meal logging, recipe recommendations, activity tracking, and daily planning.',
    contribution:
      'My focus was meal tracking, food search, recipe features, recommendation logic, meal planning, and nutrition progress.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Cloud Firestore', 'USDA API', 'Recommendation systems'],
    detailTechnologies: [
      'Flutter', 'Dart', 'Firebase', 'Firebase Authentication', 'Cloud Firestore',
      'USDA FoodData Central API', 'Recommendation systems',
    ],
    repository: 'https://github.com/jingyaong/easyhealthy',
    screenshots: easyHealthyScreenshots,
    overview:
      'A two-person final-year project combining nutrition and fitness features in one mobile app. My work focused on the meal tracker and nutrition-related progress views, with shared work on the home and profile sections.',
    problem:
      'Meal records, food information, recipes, and activity goals can become disconnected. EasyHealthy brings these everyday tasks into a single app, with recipe suggestions informed by nutrition targets and meal history.',
    implementation: [
      {
        title: 'Meal logging and food search',
        text: 'Integrated USDA FoodData Central search, meal categories, portion adjustments, and custom food creation through My Foods. Cloud Firestore stores user meal logs and saved recipes.',
      },
      {
        title: 'Hybrid recipe recommendations',
        text: 'Built recipe discovery and favourites. Implemented a hybrid recommendation system combining content-based filtering and collaborative filtering to personalize recipe suggestions. Content-based filtering scores recipes against the user’s calorie and macronutrient targets. Collaborative filtering compares recipe ingredients and categories with the user’s saved recipes and logged meals. Both scores are combined using weighted ranking to rank recommendations.',
      },
      {
        title: 'Daily meal-plan generation',
        text: 'Allocated daily calorie and macronutrient targets across breakfast, lunch, dinner, and snacks. Used the hybrid recommendation engine to plan each meal, applying repeat-recipe penalties and adding side dishes to improve nutritional fit.',
      },
      {
        title: 'Nutrition progress',
        text: 'Contributed nutrition progress views and calorie-goal updates. The wider application includes activity logging, habits, workout planning, progress charts, PDF export, and optional AI-assisted workout generation.',
      },
    ],
    responsibilities: [
      'Built meal tracking, USDA food lookup, and custom food management.',
      'Implemented recipe browsing, details, favourites, and recommendation logic.',
      'Built daily meal-plan generation and contributed nutrition progress views.',
      'Collaborated on the home and profile sections.',
    ],
    considerationsLabel: 'DATA SOURCE',
    considerations:
      'The repository includes 1,021 Kaggle-sourced recipe records, with original author credits and BBC Good Food source links preserved.',
  },
]

export const experience = [
  {
    company: 'YTL Construction Sdn Bhd',
    role: 'Intern',
    period: 'Jan 2026 - Jul 2026',
    highlights: [
      'Built a full-stack RAG chatbot over 20+ internal IT and HR knowledge documents using Flask, LangChain, ILMU via OpenAI-compatible LLM APIs, and a hybrid retrieval pipeline with ChromaDB vector search, BM25 keyword search, and cross-encoder reranking.',
      'Built the frontend as a SharePoint Framework (SPFx) React/TypeScript extension with streaming responses, conversation memory, feedback collection, and error reporting.',
      'Created a document ingestion pipeline for Markdown/PDF knowledge sources, including hierarchical chunking, metadata tracking, abbreviation extraction, vector embedding generation, and incremental re-indexing.',
      'Implemented query preprocessing for conversation-aware query rewriting, language translation, abbreviation expansion, and multi-query generation to improve retrieval quality.',
      'Implemented 5 LLM tool-calling workflows with backend validation, structured tool results, and human-in-the-loop confirmation for sensitive actions.',
      'Designed guardrails for source-grounded answers, unsupported document claims, sensitive personal-data questions, and safe fallback responses.',
      'Deployed separate containerized chatbot service profiles on Linux using Docker, with independent routing, environment variables, vector stores, and knowledge sources.',
      'Collaborated with approximately 20 internal users to improve retrieval quality, knowledge coverage, answer reliability, and feedback workflows.',
    ],
  },
  {
    company: 'YYC GST Consultants Sdn Bhd (YYC taxPOD)',
    role: 'Software Development Intern',
    period: 'Nov 2023 - Feb 2024',
    highlights: [
      'Assisted in developing web application modules using Vue.js and Laravel, contributing to the enhancement of user interface and overall functionality of the web application.',
      'Utilized APIs in the back end using Laravel to retrieve data from multiple database tables and present it efficiently on the front end.',
      'Created dynamic tables on the front end using Vue.js to display query results from the back-end in a user-friendly format.',
      'Collaborated with the team using GitHub for version control, ensuring seamless integration of front-end and back-end components.',
      'Participated in testing and debugging to identify and resolve issues before deployment.',
    ],
  },
]

export const skillGroups = [
  { title: 'Backend', items: ['Python', 'Flask', 'Java', 'PHP', 'Laravel', 'REST APIs'] },
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'Vue.js', 'Flutter', 'HTML', 'CSS'],
  },
  { title: 'Databases', items: ['MySQL', 'Firebase'] },
  { title: 'Deployment', items: ['Docker', 'Linux', 'Internet Information Services (IIS)'] },
  {
    title: 'AI/LLM',
    items: [
      'Retrieval-augmented generation (RAG)',
      'Prompt engineering',
      'LLM APIs',
      'LLM tool/function calling',
      'LangChain',
      'ChromaDB',
      'BM25',
      'Cross-encoder reranking',
    ],
  },
  { title: 'Tools', items: ['Git', 'GitHub', 'XAMPP', 'Codex', 'Claude Code'] },
]

export const credentials = [
  {
    title: 'Cloud Web Application Builder',
    fullTitle: 'AWS Academy Graduate - Cloud Web Application Builder - Training Badge',
    issuer: 'AWS Academy',
    kind: 'Training badge',
    date: 'Dec 2025',
    url: 'https://www.credly.com/badges/cef1789d-3436-407d-97c5-c10ec9e7b52e/linked_in_profile',
  },
  {
    title: 'Cloud Architecting',
    fullTitle: 'AWS Academy Graduate - Cloud Architecting - Training Badge',
    issuer: 'AWS Academy',
    kind: 'Training badge',
    date: 'Dec 2025',
    url: 'https://www.credly.com/badges/67ec0e9e-fd00-4e1f-a5f0-fdd8d3bd41ac/linked_in_profile',
  },
  {
    title: 'Introduction to Networks',
    fullTitle: 'CCNA: Introduction to Networks',
    issuer: 'Cisco',
    kind: 'Learning badge',
    date: 'Jun 2024',
    url: 'https://www.credly.com/badges/91742fa8-5f27-4d36-a3ab-326eaee14203/linked_in_profile',
  },
  {
    title: 'Cloud Foundations',
    fullTitle: 'AWS Academy Graduate - AWS Academy Cloud Foundations',
    issuer: 'AWS Academy',
    kind: 'Learning badge',
    date: 'May 2024',
    url: 'https://www.credly.com/badges/d02824d7-9bd1-400c-9977-c1692370b6bc/linked_in_profile',
  },
]
