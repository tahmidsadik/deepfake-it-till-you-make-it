export interface Worker {
  id: string;
  execute: (input: any) => Promise<any>;
}
