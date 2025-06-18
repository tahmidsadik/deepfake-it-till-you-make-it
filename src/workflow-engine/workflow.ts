import { WorkflowNode } from './nodes/node';
import { WorkflowEdge } from './edges/edge';

export type Workflow = {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
};

export function topologicalSort(nodes: WorkflowNode[], edges: WorkflowEdge[]): WorkflowNode[] {
  const inDegree: Record<string, number> = {};
  const graph: Record<string, string[]> = {};
  nodes.forEach(node => {
    inDegree[node.id] = 0;
    graph[node.id] = [];
  });
  edges.forEach(edge => {
    inDegree[edge.target]++;
    graph[edge.source].push(edge.target);
  });
  const queue = nodes.filter(n => inDegree[n.id] === 0).map(n => n.id);
  const sorted: WorkflowNode[] = [];
  while (queue.length) {
    const id = queue.shift()!;
    const node = nodes.find(n => n.id === id)!;
    sorted.push(node);
    for (const neighbor of graph[id]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  if (sorted.length !== nodes.length) throw new Error('Cycle detected in workflow');
  return sorted;
} 