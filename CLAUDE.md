# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Run tests
npm test

# Run single test file
npm test -- tests/render.test.js

# Lint code
npx eslint src/ api/
```

## Architecture

Gitfolio Online is a Vercel serverless function that generates GitHub portfolio pages on-the-fly.

### Data Flow

```
Request → api/index.js → src/fetch.js → GitHub GraphQL API
                              ↓
                         src/retryer.js (token rotation)
                              ↓
                         src/render.js → HTML output
```

### Core Modules

| File | Purpose |
|------|---------|
| `api/index.js` | Vercel entry point, handles HTTP requests |
| `src/fetch.js` | GitHub GraphQL API queries, fetches user + repo data |
| `src/retryer.js` | Token rotation logic (PAT_1~PAT_8), handles rate limits |
| `src/render.js` | Handlebars template rendering, generates final HTML |
| `src/utils.js` | Shared utilities (request, logger, formatters) |

### Theming

Themes are CSS files in `assets/themes/`. Each theme defines CSS variables and overrides. The `auto.css` theme uses `prefers-color-scheme` media query.

### Token Configuration

Requires `PAT_1` environment variable (GitHub Personal Access Token). Supports PAT_1 through PAT_8 for rotation when rate limited.

## Testing

Tests use Jest with jsdom environment. Test files in `tests/` directory.

## Deployment

Deployed to Vercel. The `vercel.json` configures routing and caching headers.