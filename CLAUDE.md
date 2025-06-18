# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Mastra-based weather application that provides weather information and activity planning through agents and workflows. The project uses TypeScript with ES modules and integrates with the Open-Meteo API for weather data.

## Commands

### Development
- `npm run dev` - Start the Mastra development server
- `npm run build` - Build the Mastra project
- `npm run start` - Start the production server

### Testing
No test command is currently configured. Tests would need to be added.

## Architecture

### Core Components

1. **Mastra Configuration** (`src/mastra/index.ts`)
   - Central configuration hub that initializes the Mastra instance
   - Configures workflows, agents, storage (LibSQL), and logging (Pino)
   - Currently uses in-memory storage (`:memory:`), can be changed to persistent storage

2. **Weather Agent** (`src/mastra/agents/weather-agent.ts`)
   - AI-powered assistant using OpenAI's gpt-4o-mini model
   - Handles weather queries with location translation and interpretation
   - Connected to weather tool and uses persistent memory storage

3. **Weather Tool** (`src/mastra/tools/weather-tool.ts`)
   - Fetches real-time weather data from Open-Meteo API
   - Performs geocoding to convert city names to coordinates
   - Returns structured weather data including temperature, humidity, wind conditions

4. **Weather Workflow** (`src/mastra/workflows/weather-workflow.ts`)
   - Two-step workflow: fetch weather → plan activities
   - Uses a dedicated agent for activity planning based on weather conditions
   - Provides structured activity recommendations with time-specific suggestions

### Key Dependencies
- `@mastra/core` - Core framework for agents, tools, and workflows
- `@ai-sdk/openai` - OpenAI integration for LLM capabilities
- `zod` - Schema validation for tool inputs/outputs
- Node.js >= 20.9.0 required

### API Integrations
- **Open-Meteo Geocoding API**: Converts location names to coordinates
- **Open-Meteo Weather API**: Provides weather forecasts and current conditions
- No API keys required for Open-Meteo services