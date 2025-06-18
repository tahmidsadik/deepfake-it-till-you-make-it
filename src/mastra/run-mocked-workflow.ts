import { WorkflowEngine } from "../workflow-engine";
import { availableWorkers } from "./config/workers";

export async function runMockedWorkflow(input: any = {}) {
  const { workflow, initialInput } = input;
  
  const engine = new WorkflowEngine(workflow, []);
  
  availableWorkers.forEach(worker => {
    engine.registerWorker(worker.id, worker.implementation);
  });

  try {
    const results = await engine.execute(initialInput);
    
    const globalResponse = {
      success: true,
      data: {
        metadata: {
          workflowExecutionId: `wf_${Date.now()}`,
          executionTime: new Date().toISOString(),
          input: initialInput
        },
        result: results
      }
    };

    return globalResponse;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      metadata: {
        workflowExecutionId: `wf_${Date.now()}`,
        executionTime: new Date().toISOString(),
        input: initialInput
      },
    };
  }
}