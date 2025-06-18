# Deepfake It Till You Make It - Weather Assistant

A Mastra-based weather application that provides real-time weather information and activity planning through AI-powered agents and workflows.

## Features

- 🌤️ **Real-time Weather Data**: Fetches current weather information using the Open-Meteo API
- 🤖 **AI Weather Agent**: Intelligent assistant that interprets weather queries and provides detailed responses
- 📅 **Activity Planning**: Automated workflow that suggests location-specific activities based on weather conditions
- 🌍 **Global Coverage**: Works with any location worldwide through geocoding

## Prerequisites

- Node.js >= 20.9.0
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tahmidsadik/deepfake-it-till-you-make-it.git
cd deepfake-it-till-you-make-it
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Start the Mastra development server:
```bash
npm run dev
```

This will launch the Mastra dashboard where you can:
- Test the weather agent with natural language queries
- Execute the weather workflow for activity planning
- Monitor agent conversations and workflow executions

### Production Mode

Build and start the production server:
```bash
npm run build
npm run start
```

## Usage

### Weather Agent

The weather agent can handle various types of queries:
- "What's the weather in New York?"
- "Is it raining in Tokyo?"
- "Tell me about the weather conditions in Paris"

The agent will:
- Ask for a location if not provided
- Translate non-English location names
- Provide detailed weather information including temperature, humidity, wind conditions

### Weather Workflow

The workflow provides activity planning based on weather forecasts:
1. Input a city name
2. Receives weather forecast data
3. Generates time-specific activity recommendations
4. Suggests both outdoor and indoor alternatives

## Project Structure

```
src/mastra/
├── index.ts              # Mastra configuration
├── agents/
│   └── weather-agent.ts  # AI weather assistant
├── tools/
│   └── weather-tool.ts   # Weather data fetching tool
└── workflows/
    └── weather-workflow.ts # Activity planning workflow
```

## Configuration

The application uses:
- **Storage**: In-memory LibSQL (can be changed to persistent storage in `src/mastra/index.ts`)
- **LLM Model**: OpenAI GPT-4o-mini
- **Weather API**: Open-Meteo (no API key required)

## Development

The project uses TypeScript with ES modules. Key configuration files:
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts

## License

ISC