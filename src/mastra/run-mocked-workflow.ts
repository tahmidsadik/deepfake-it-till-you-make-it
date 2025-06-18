import { Workflow, WorkflowEngine, createAccountWorker, createPolicyWorker, fetchAccountWorker, fetchPolicyWorker } from "../workflow-engine";

export async function runMockedWorkflow(input: any = {}) {
  const { workflow, initialInput } = input;
  
  const engine = new WorkflowEngine(workflow, []);
  engine.registerWorker('create-policy', createPolicyWorker);
  engine.registerWorker('fetch-account', fetchAccountWorker);
  engine.registerWorker('create-account', createAccountWorker);
  engine.registerWorker('fetch-policy', fetchPolicyWorker);

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