---
name: workspace-context
description: Provides context and conventions for the Soc Ops bingo game workspace
---

# Soc Ops Workspace Instructions

## Mandatory Development Checklist
- [ ] `npm run lint` - Code style and static analysis
- [ ] `npm run build` - Production build verification
- [ ] `npm run test` - Unit tests pass

## Project Overview
React-based social bingo game for in-person mixers. Players find people matching questions to complete bingo lines.

## Technology Stack
- **Frontend**: React 19 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint

## Key Files
- `src/App.tsx` - Main app orchestrator
- `src/components/` - UI screens (StartScreen, GameScreen, BingoBoard, etc.)
- `src/hooks/useBingoGame.ts` - Game state management
- `src/utils/bingoLogic.ts` - Core bingo rules and board generation
- `src/data/questions.ts` - Icebreaker questions
- `workshop/` - Multi-agent development guides

## Development Conventions
- Functional components with hooks
- Custom hooks for stateful logic
- Pure utility functions for business logic
- Comprehensive unit tests for core logic
- Strict TypeScript usage
- React best practices and accessibility

## Game Rules
- 5x5 board with center "free" square
- Click squares when finding matching people
- Win with 5-in-a-row (any direction)
- Randomized questions per session

## Common Tasks
- Add new bingo questions
- Implement game features (scoring, timers)
- Improve UI/UX with animations
- Create custom agents
- Refactor for maintainability

## Commands
- `npm install` - Dependencies
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run lint` - Code style check