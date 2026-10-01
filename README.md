# GEARZ Bug Chain Forge 🔗

GEARZ Bug Chain Forge is a local AI-assisted prototype for exploring how a security finding might connect to other weaknesses. Enter a finding, and the app asks Ollama to suggest a sequence of potential follow-up steps for review.

Built with Next.js, React, TypeScript, and Tailwind CSS, it pairs a Wild West-themed interface with a locally hosted language model.

## What it does

- Accepts a finding as plain text
- Sends it to the local `llama3:instruct` model through Ollama
- Displays the response as individual, numbered steps

The app generates text. It does not scan a target, execute a chain, or confirm that a suggested vulnerability exists. Treat every result as a hypothesis requiring independent validation within an explicitly authorized scope.

## Requirements

- Node.js and npm, using a maintained Node.js version compatible with `package-lock.json`
- [Ollama](https://ollama.com/) installed on the machine running the Next.js server
- The `llama3:instruct` model available locally

The checked-in backend uses Ollama's OpenAI-compatible endpoint. A hosted OpenAI integration and a provider selector are not implemented.

## Local setup

### 1. Prepare Ollama

Start Ollama if it is not already running:

```bash
ollama serve
```

In a separate terminal, download the model:

```bash
ollama pull llama3:instruct
```

Keep Ollama available at `http://localhost:11434`.

### 2. Install and start the app

```bash
git clone https://github.com/Gearsoldier/gearz-bug-chain-forge.git
cd gearz-bug-chain-forge
npm ci
npm run dev -- --hostname 127.0.0.1
```

Open [http://localhost:3000](http://localhost:3000), enter a finding, and select **Forge Attack Chain**.

Use sanitized examples for evaluation. Do not paste credentials, personal data, or confidential findings unless your handling of that data is authorized.

## Configuration

- Model: `app/api/generate-chain/route.ts`, currently `llama3:instruct`
- Ollama endpoint: `app/lib/ollama.ts`, currently `http://localhost:11434/v1/chat/completions`
- Background artwork: `public/gearz-background.png`

The model and endpoint are configured in source rather than environment variables. `localhost` is resolved by the Next.js server, so hosting the app on another machine also requires making the model available to that server.

## Development

The repository defines these npm scripts:

- `npm run dev`: start the development server
- `npm run build`: create a production build
- `npm start`: serve a completed production build
- `npm run lint`: run the configured Next.js lint command

No automated test script or GitHub Actions workflow is included.

### Source map

- `app/page.tsx`: application entry point
- `app/components/GearChainUI.tsx`: finding input and result display
- `app/api/generate-chain/route.ts`: prompt construction and response parsing
- `app/lib/ollama.ts`: local model client
- `app/components/ui/`: reusable form controls

## Current limitations

This is a prototype. Input validation and model-error handling are limited, and responses are split into steps by line breaks rather than a structured output schema. A model can produce inaccurate, incomplete, or irrelevant suggestions.

The repository does not include authentication, rate limiting, result persistence, or automated verification of generated chains. Keep the app local unless you add and review the controls needed for your deployment. Beginner and advanced payload modes mentioned in the original project plan are not implemented.
