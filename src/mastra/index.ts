import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { registerApiRoute } from '@mastra/core/server';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { workflowAgent } from './agents/workflow-agent';
import { runMockedWorkflow } from './run-mocked-workflow';
import { CamundaTranslator } from '../workflow-engine/tools/camunda-translator';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, workflowAgent },
  server: {
    apiRoutes: [
      registerApiRoute('/workflow/execute', {
        method: 'POST',
        handler: async (c) => {
          const requestData = await c.req.json();
          const result = await runMockedWorkflow(requestData);

          return c.json(result);
        },
      }),
      registerApiRoute('/workflow/translate', {
        method: 'POST',
        handler: async (c) => {
          const requestData = await c.req.json();
          const translator = new CamundaTranslator(requestData.processId, requestData.processName);

          const camundaProcess = translator.translate(requestData.workflow);
          const bpmn = translator.generateBPMN(camundaProcess);

          return c.json({ bpmn });
        },
      }),
    ],
  },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
