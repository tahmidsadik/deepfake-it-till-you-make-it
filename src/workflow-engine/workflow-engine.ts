import { Worker } from './workers/worker';
import { Workflow, topologicalSort } from './workflow';

export class WorkflowEngine {
  private workflow: Workflow;
  private workers: Map<string, Worker>;

  constructor(workflow: Workflow, workers: Worker[] = []) {
    this.workflow = workflow;
    this.workers = new Map(workers.map(w => [w.id, w]));
  }

  registerWorker(nodeId: string, worker: Worker) {
    this.workers.set(nodeId, worker);
  }

  async execute(initialInput: any): Promise<Record<string, any>> {
    const { nodes, edges } = this.workflow;
    const sortedNodes = topologicalSort(nodes, edges);
    const sharedState: Record<string, any> = { ...initialInput };
    
    for (const node of sortedNodes) {
      const worker = this.workers.get(node.id);
      if (!worker) throw new Error(`No worker registered for node ${node.id}`);
      
      const nodeResult = await worker.execute(sharedState);
      
      Object.assign(sharedState, nodeResult);
    }

    return sharedState;
  }
} 