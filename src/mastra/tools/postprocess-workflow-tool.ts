import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const nodeSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  position: z.object({ x: z.number(), y: z.number() }),
  data: z.object({ label: z.string() }),
});

const edgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.string().optional(),
});

const workflowOutputSchema = z.object({
  nodes: z.array(nodeSchema),
  edges: z.array(edgeSchema),
});

const workflowInputSchema = z.object({
  currentNodes: z.array(nodeSchema).nonempty().describe('Current nodes array, if editing an existing workflow'),
  currentEdges: z.array(edgeSchema).nonempty().describe('Current edges array, if editing an existing workflow'),
});

export const postprocessWorkflowTool = createTool({
  id: 'postprocess-workflow',
  description: 'Postprocess the workflow to make it compatible with React Flow. And check if the workflow is valid.',
  inputSchema: workflowInputSchema,
  outputSchema: workflowOutputSchema,
  execute: async ({ context }) => {
    // TODO: Check if the workflow is valid

    return { nodes: context.currentNodes, edges: context.currentEdges };
  },
}); 