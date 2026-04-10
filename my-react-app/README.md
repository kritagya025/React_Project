# IdeaForge

IdeaForge is a developer collaboration platform built around an idea-first workflow. Instead of starting with code repositories, it starts with the early-stage questions that matter most: What should we build? Is the problem real? Who wants to work on it? Who can help move it forward?

The platform helps developers share project ideas, discover like-minded builders, validate concepts with AI, and turn promising discussions into collaborative momentum. Unlike GitHub, which is primarily code-centric, IdeaForge emphasizes discovery, connection, and collaboration before the coding even begins.

## Overview

IdeaForge is designed for developers who want to:

- share product ideas with a community
- validate ideas before investing too much time building
- discover active projects and discussion spaces
- connect with collaborators who match their interests and pace
- move from concept to collaboration in a more community-driven way

The current codebase includes a polished frontend experience, demo authentication, an AI-assisted idea validation flow, and a community project feed powered by shared in-memory state.

## Core Features

- AI Mode for idea validation
  Enter a product idea, generate a feasibility report, receive a score, and get a verdict such as `Real Problem` or `Time Waste`.

- Community project feed
  Post AI-generated idea reports into a shared Explore view where other developers can browse active project ideas.

- Project detail and discussion
  Open individual projects, review the AI analysis, post comments, and express interest in joining.

- Demo dashboard
  Logged-in users get a dashboard with quick actions, project stats, recent activity, and links into the main collaboration flows.

- Demo authentication
  Local demo auth is implemented with React context and `localStorage`, making it easy to test user flows without a production auth backend.

- Builder-focused product direction
  The app is structured around collaboration, project discovery, and early-stage product thinking rather than repository hosting.

## Current Product Flow

1. A user lands on the platform and explores the collaboration-focused experience.
2. The user logs in through demo authentication.
3. The user opens AI Mode and submits a project idea.
4. The backend generates a feasibility report using Gemini.
5. The user posts that report into the community feed.
6. Other users can browse the project, open its detail page, comment, and join the interest flow.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- React Icons
- Plain CSS with a custom visual system

### Backend

- Node.js
- Express
- CORS
- dotenv

### AI Integration

- Google GenAI SDK
- Gemini `gemini-2.5-flash`

## Project Structure

```text
my-react-app/
├── public/
├── server/
│   └── index.js
├── src/
│   ├── components/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ProjectContext.jsx
│   ├── pages/
│   ├── Styles/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env
├── .env.example
├── package.json
└── README.md
```

## Local Development Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root if it does not already exist.

Use one of the following keys:

```env
GEMINI_API_KEY=your_key_here
```

or

```env
GOOGLE_API_KEY=your_key_here
```

You can also configure the backend port:

```env
PORT=3001
```

### 3. Start the app

Run frontend and backend together:

```bash
npm run dev:full
```

Or run them separately:

```bash
npm run server
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` starts the Vite frontend
- `npm run server` starts the Express AI server
- `npm run dev:full` runs frontend and backend together
- `npm run build` creates a production build
- `npm run preview` previews the production build
- `npm run lint` runs ESLint

## API Endpoints

### `GET /api/health`

Returns a simple health response showing whether the AI provider is configured.

### `POST /api/generate-report`

Accepts an idea and returns a generated feasibility report.

Example request:

```json
{
  "idea": "A platform where developers can find collaborators for startup ideas before writing code."
}
```

Example response:

```json
{
  "summary": "A concise explanation of the opportunity.",
  "analysis": "Practical product guidance based on the idea.",
  "score": 78,
  "verdict": "Real Problem"
}
```

## Current Implementation Notes

- Authentication is currently demo-only and stored in `localStorage`
- Project data and comments are currently stored in React state through context
- There is no persistent database yet
- Signup is currently a UI flow and not connected to a real auth backend
- Join project actions are currently simulated in the UI

## Why This Project Matters

Many developers have strong ideas but struggle to find the right collaborators, validate demand early, or create momentum before the implementation phase. IdeaForge is meant to solve that gap by creating a space where discussion, validation, and connection happen before full-scale development starts.

The goal is to make early collaboration easier, faster, and more intentional.

## Future Improvements

- persistent database for users, projects, and comments
- real authentication and user profiles
- richer project collaboration spaces
- collaboration requests and matching workflows
- notifications and activity feeds
- search, filters, and discovery tools
- private and public project rooms
- better team formation and role matching

## Status

IdeaForge is currently in an early product/prototype stage, but the codebase already demonstrates the core vision:

- idea validation
- project discovery
- discussion around project concepts
- dashboard-driven community workflows

## License

This project currently has no license specified.
