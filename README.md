# Ng Jing Yao — Portfolio

A personal developer portfolio featuring full-stack and applied AI projects,
internship experience, technical skills, and education. Built with React,
TypeScript, Vite, and regular CSS.

## Run locally

Use Node.js 24 LTS. The project is tested with Node 24.22.1; select it through
nvm-windows in your terminal if needed:

```powershell
nvm use 24.22.1
cd C:\Projects\portfolio
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://127.0.0.1:5173/`.

## Project structure

| File                               | Purpose                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------ |
| `src/data.ts`                      | Public project descriptions, experience, skills, credentials, and contact links      |
| `src/App.tsx`                      | Page sections, project filtering, navigation, and email-copy interaction             |
| `src/components/ProjectVisual.tsx` | Chatbot architecture illustration and EasyHealthy app screenshot preview             |
| `src/components/CaseStudy.tsx`     | Native accessible project-detail dialog                                              |
| `src/components/Icon.tsx`          | Small inline SVG icons                                                               |
| `src/styles.css`                   | Shared CSS variables, section styles, responsive layouts, and reduced-motion support |
| `public/assets/`                   | Public image assets                                                                  |
| `tests/portfolio.test.tsx`         | Interaction and content-integrity checks                                             |

The original content guide is a private development reference. It is ignored by
Git and is not copied into the production build.

## Content and visuals

Edit `src/data.ts` to update the project content and public links. Introductory,
about, and education text is in `src/App.tsx`. The colour palette and typography
tokens are at the beginning of `src/styles.css`.

Each project's `technologies` list supplies concise card tags;
`detailTechnologies` supplies the fuller list in its project-details dialog.

The chatbot card has separate tabs for the request/retrieval flow and document
ingestion pipeline, each with six steps and keyboard navigation. Its project
details include the supplied ChatGPT-generated infographic in
`public/assets/chatbot/system-architecture.png`, with a link to open it full size.
EasyHealthy uses
actual app screenshots from `public/assets/easyhealthy/`, with a two-screen
project preview and six feature screens in its project details. Each gallery image
links to the full-size screenshot. Update the selection and image descriptions
in `src/data.ts`. Original imports are kept in the ignored `artifacts/` folder.

The hero's Download resume link points to `public/Ng Jing Yao Resume.pdf`.
Update `profile.resume` in `src/data.ts` if the filename changes. The site omits
the app's personal profile screenshot from public assets.

## Check and build

```powershell
npm test
npm run build
npm run preview
```

The build command checks TypeScript and generates the static website in `dist/`.
Vitest uses jsdom for interaction checks. These tests do not verify browser layout
or the browser's native dialog focus trap; inspect the website on desktop and
mobile before launch.

## Deploy to Vercel

Push the public source files to a Git repository, then import that repository in
Vercel. Select the Vite framework preset and use:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 24 LTS

`vercel.json` provides the build settings and basic response headers. This is a
static portfolio; it does not require a database, API credentials, or Docker.

Email contact uses a `mailto:` link. Credential and project links open the supplied
external pages.
