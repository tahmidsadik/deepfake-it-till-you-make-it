import { Workflow } from '../../workflow-engine';
import { availableWorkers } from '../../workflow-engine/workers/worker';

interface ZeebeTask {
  id: string;
  name: string;
  type: string;
  taskDefinition: string;
  inputs: Array<{ source: string; target: string }>;
  outputs: Array<{ source: string; target: string }>;
}

interface ZeebeFlow {
  id: string;
  sourceRef: string;
  targetRef: string;
  conditionExpression?: string;
}

interface ZeebeProcess {
  id: string;
  name: string;
  tasks: ZeebeTask[];
  flows: ZeebeFlow[];
  startEvent: { id: string; name: string };
  endEvent: { id: string; name: string };
}

export class CamundaTranslator {
  private processId: string;
  private processName: string;

  constructor(processId: string, processName: string) {
    this.processId = processId;
    this.processName = processName;
  }

  private generateTaskDefinition(workerId: string): string {
    // Map worker IDs to Zeebe task types
    const taskTypeMap: Record<string, string> = {
      'fetch-account': 'account:fetch',
      'create-account': 'account:create',
      'fetch-policy': 'policy:fetch',
      'create-policy': 'policy:create',
      'send-email': 'email:send'
    };
    
    return taskTypeMap[workerId] || `${workerId}:execute`;
  }

  private generateInputMappings(workerId: string): Array<{ source: string; target: string }> {
    // Generate input mappings based on worker type
    const baseInputs = [
      { source: '=payload', target: 'input' }
    ];

    // Add specific inputs based on worker type
    if (workerId.includes('fetch')) {
      baseInputs.push(
        { source: `="${workerId}"`, target: 'workerTask' }
      );
    } else if (workerId.includes('create')) {
      baseInputs.push(
        { source: `="${workerId}"`, target: 'workerTask' }
      );
    }

    return baseInputs;
  }

  private generateOutputMappings(workerId: string): Array<{ source: string; target: string }> {
    // Generate output mappings
    return [
      { source: '=result', target: 'output' },
      { source: '=result', target: `${workerId}Result` }
    ];
  }

  translate(workflow: Workflow): ZeebeProcess {
    const { nodes, edges } = workflow;
    
    // Create start and end events
    const startEvent = {
      id: 'StartEvent_1',
      name: 'Start'
    };
    
    const endEvent = {
      id: 'EndEvent_1',
      name: 'End'
    };

    // Translate nodes to Zeebe tasks
    const tasks: ZeebeTask[] = [];

    nodes.forEach(node => {
      const worker = availableWorkers.find(w => w.id === node.type);
      
      if (worker) {
        const task: ZeebeTask = {
          id: `Activity_${node.id}`,
          name: node.data.label || worker.description,
          type: this.generateTaskDefinition(worker.id),
          taskDefinition: this.generateTaskDefinition(worker.id),
          inputs: this.generateInputMappings(worker.id),
          outputs: this.generateOutputMappings(worker.id)
        };
        tasks.push(task);
      } else {
        // Create a generic task for non-worker nodes
        const task: ZeebeTask = {
          id: `Activity_${node.id}`,
          name: node.data.label || 'Generic Task',
          type: 'generic:execute',
          taskDefinition: 'generic:execute',
          inputs: [
            { source: '=payload', target: 'input' }
          ],
          outputs: [
            { source: '=result', target: 'output' }
          ]
        };
        tasks.push(task);
      }
    });

    // Translate edges to Zeebe flows
    const flows: ZeebeFlow[] = [];
    
    // Add flows from start to first nodes (nodes with no incoming edges)
    const nodesWithIncomingEdges = new Set(edges.map(e => e.target));
    const startNodes = nodes.filter(node => !nodesWithIncomingEdges.has(node.id));
    
    startNodes.forEach((node, index) => {
      flows.push({
        id: `Flow_start_to_${node.id}`,
        sourceRef: startEvent.id,
        targetRef: `Activity_${node.id}`
      });
    });

    // Add flows from nodes to end (nodes with no outgoing edges)
    const nodesWithOutgoingEdges = new Set(edges.map(e => e.source));
    const endNodes = nodes.filter(node => !nodesWithOutgoingEdges.has(node.id));
    
    endNodes.forEach(node => {
      flows.push({
        id: `Flow_${node.id}_to_end`,
        sourceRef: `Activity_${node.id}`,
        targetRef: endEvent.id
      });
    });

    // Add flows from edges
    edges.forEach(edge => {
      flows.push({
        id: `Flow_${edge.id}`,
        sourceRef: `Activity_${edge.source}`,
        targetRef: `Activity_${edge.target}`
      });
    });

    return {
      id: this.processId,
      name: this.processName,
      startEvent,
      endEvent,
      tasks,
      flows
    };
  }

  generateBPMN(zeebeProcess: ZeebeProcess): string {
    const { id, name, startEvent, endEvent, tasks, flows } = zeebeProcess;

    const taskElements = tasks.map(task => {
      const inputElements = task.inputs.map(input => 
        `          <zeebe:input source="${input.source}" target="${input.target}" />`
      ).join('\n');
      
      const outputElements = task.outputs.map(output => 
        `          <zeebe:output source="${output.source}" target="${output.target}" />`
      ).join('\n');

      return `    <bpmn:serviceTask id="${task.id}" name="${task.name}">
      <bpmn:extensionElements>
        <zeebe:taskDefinition type="${task.taskDefinition}" />
        <zeebe:ioMapping>
${inputElements}
${outputElements}
        </zeebe:ioMapping>
      </bpmn:extensionElements>
      <bpmn:incoming>${flows.find(f => f.targetRef === task.id)?.id || ''}</bpmn:incoming>
      <bpmn:outgoing>${flows.find(f => f.sourceRef === task.id)?.id || ''}</bpmn:outgoing>
    </bpmn:serviceTask>`;
    }).join('\n');

    const flowElements = flows.map(flow => {
      if (flow.conditionExpression) {
        return `    <bpmn:sequenceFlow id="${flow.id}" sourceRef="${flow.sourceRef}" targetRef="${flow.targetRef}">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${flow.conditionExpression}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>`;
      } else {
        return `    <bpmn:sequenceFlow id="${flow.id}" sourceRef="${flow.sourceRef}" targetRef="${flow.targetRef}" />`;
      }
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="${id}" name="${name}" isExecutable="true">
    <bpmn:startEvent id="${startEvent.id}" name="${startEvent.name}" />
${taskElements}
    <bpmn:endEvent id="${endEvent.id}" name="${endEvent.name}" />
${flowElements}
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${id}">
      <bpmndi:BPMNShape id="${startEvent.id}_di" bpmnElement="${startEvent.id}">
        <dc:Bounds x="152" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="158" y="145" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
${tasks.map((task, index) => `
      <bpmndi:BPMNShape id="${task.id}_di" bpmnElement="${task.id}">
        <dc:Bounds x="${240 + index * 200}" y="${80 + index * 50}" width="100" height="80" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="${240 + index * 200}" y="${170 + index * 50}" width="100" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>`).join('')}
      <bpmndi:BPMNShape id="${endEvent.id}_di" bpmnElement="${endEvent.id}">
        <dc:Bounds x="${240 + tasks.length * 200}" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="${240 + tasks.length * 200}" y="145" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
${flows.map((flow, index) => `
      <bpmndi:BPMNEdge id="${flow.id}_di" bpmnElement="${flow.id}">
        <di:waypoint x="${188 + index * 50}" y="120" />
        <di:waypoint x="${240 + index * 50}" y="120" />
      </bpmndi:BPMNEdge>`).join('')}
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
  }
}