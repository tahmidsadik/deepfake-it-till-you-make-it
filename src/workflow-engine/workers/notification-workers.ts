import { Worker } from "./worker";

export const sendEmailWorker: Worker = {
  id: 'send-email',
  async execute(input) {
    console.log('Sending email', input);
  }
}