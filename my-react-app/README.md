# IdeaForge

IdeaForge is a React + Express prototype for exploring early-stage product ideas with other builders. It combines a polished community-first frontend with an AI-backed idea evaluation flow powered by Gemini, then lets users publish those reports into a shared in-app project feed.

The app is centered on a simple loop:

1. Log in with demo authentication.
2. Generate a feasibility report for an idea in AI Mode.
3. Post that report into the community feed.
4. Save, discuss, and request collaboration on promising projects.

## Current Highlights

- animated landing experience with an opening splash, reveal effects, and route transition loader
- demo authentication stored in `localStorage`
- AI idea validation through an Express API and Google Gemini
- community project feed built from React context state
- project detail pages with comments and collaboration requests
- saved ideas, works dashboard, and editable builder profile
- responsive multi-page UI with React Router

## Tech Stack

### Frontend

- React 19
- Vite 8
- React Router DOM 7
- React Icons
- React Markdown
- Tailwind CSS 4 plus custom CSS modules/files

### Backend

- Node.js
- Express 5
- CORS
- dotenv

### AI

- `@google/genai`
- Gemini `gemini-2.5-flash`

## How The App Works

### Public routes

- `/` landing page with animated hero sections
- `/about` product explanation page
- `/contact` contact page
- `/explore` community project feed
- `/explore/:id` individual project detail view
- `/ai` AI report generation flow
- `/login` demo login page
- `/signup` presentational signup page

### Protected routes

These redirect to `/login` when no demo session exists:

- `/dashboard`
- `/profile`
- `/works`

### Main product flows

- `AI Mode`: submit an idea, call `/api/generate-report`, and receive `summary`, `analysis`, `score`, and `verdict`
- `Explore`: browse posted projects, save ideas, and remove your own posts
- `Project Detail`: read the AI analysis, add comments, and send collaboration requests
- `Works`: review all active works, saved ideas, and incoming collaboration requests
- `Profile`: edit display name, bio, focus, skills, and social links

## State And Data Model

The current app is intentionally lightweight and uses client-side state for most product data:

- auth state is stored in `localStorage` under a demo user key
- projects, saved ideas, comments, and collaboration requests live in React context
- project data is not persisted across full page refreshes unless a real backend is added
- profile edits are persisted inside the stored demo user object

## API

### `GET /api/health`

Returns backend status and whether an API key is configured.

Example response:

```json
{
  "ok": true,
  "configured": true,
  "provider": "google-ai-studio"
}
```

### `POST /api/generate-report`

Generates an idea feasibility report from a plain text idea.

Request body:

```json
{
  "idea": "A platform where developers can find collaborators for startup ideas before writing code."
}
```

Response body:

```json
{
  "summary": "Short overview of the idea.",
  "analysis": "Practical product guidance and risks.",
  "score": 78,
  "verdict": "Real Problem"
}
```

Notes:

- the backend requires `GEMINI_API_KEY` or `GOOGLE_API_KEY`
- scores are normalized to an integer from `0` to `100`
- the server currently derives the final verdict from the score threshold

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_key_here
PORT=3001
```

`GOOGLE_API_KEY` is also supported as an alternative to `GEMINI_API_KEY`.

The provided `.env.example` currently includes:

```env
GEMINI_API_KEY=
PORT=3001
```

### 3. Start the app

Run frontend and backend together:

```bash
npm run dev
```

This uses `concurrently` to start:

- the Express server at `http://localhost:3001`
- the Vite client (default Vite port, usually `5173`)

You can also start only the backend:

```bash
npm run server
```

There is also an alias:

```bash
npm run dev:full
```

### 4. Build the frontend

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` starts both the backend and Vite client
- `npm run dev:client` starts only the Vite frontend
- `npm run server` starts the Express API server
- `npm run dev:full` alias for `npm run dev`
- `npm run build` builds the frontend for production
- `npm run preview` previews the Vite production build
- `npm run lint` runs ESLint

## Project Structure

```text
my-react-app/
|-- public/
|-- server/
|   `-- index.js
|-- src/
|   |-- assets/
|   |-- components/
|   |-- context/
|   |   |-- AuthContext.jsx
|   |   `-- ProjectContext.jsx
|   |-- pages/
|   |-- Styles/
|   |-- App.jsx
|   |-- App.css
|   |-- index.css
|   `-- main.jsx
|-- .env.example
|-- package.json
`-- README.md
```

## Current Limitations

- authentication is demo-only and accepts any non-empty credentials
- signup is UI-only and does not create accounts
- there is no database or persistent server-side project storage
- comments, saved ideas, and collaboration requests are stored in memory
- repo links exist in the project model, but there is no repo creation flow yet
- `/forgot-password` is linked from the login page but is not implemented as a route

## Status

IdeaForge is currently a prototype focused on product direction, interaction design, and AI-assisted validation rather than production infrastructure. The codebase already demonstrates the end-to-end idea review flow, but it still needs real auth, persistence, and collaboration backends for a production release.
