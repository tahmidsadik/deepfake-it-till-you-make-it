import { Worker, createAccountWorker, createPolicyWorker, fetchAccountWorker, fetchPolicyWorker } from '../../workflow-engine';

export interface WorkerConfig {
  id: string;
  description: string;
  type: 'fetch' | 'create';
  resource: string;
  implementation: Worker;
}

export const availableWorkers: WorkerConfig[] = [
  {
    id: 'fetch-account',
    description: 'Retrieves account information',
    type: 'fetch',
    resource: 'account',
    implementation: fetchAccountWorker
  },
  {
    id: 'create-account',
    description: 'Creates a new account',
    type: 'create',
    resource: 'account',
    implementation: createAccountWorker
  },
  {
    id: 'fetch-policy',
    description: 'Retrieves policy information',
    type: 'fetch',
    resource: 'policy',
    implementation: fetchPolicyWorker
  },
  {
    id: 'create-policy',
    description: 'Creates a new policy',
    type: 'create',
    resource: 'policy',
    implementation: createPolicyWorker
  }
]; 