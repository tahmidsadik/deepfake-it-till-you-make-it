import { Worker } from './worker';

const mockAccountData = {
  account: {
    policies: [],
    id: 26164,
    code: "acc_CBRglPSJQSc6MrWS_gNOP",
    accountNumber: "ACC000465",
    firstName: "Alfred",
    lastName: "Eisberg",
    email: "olga+test052724001@emil.de",
    gender: "male",
    street: "Hu",
    houseNumber: "3",
    zipCode: "42581",
    city: "Bonn",
    birthDate: "1999-11-11T00:00:00.000Z",
    version: 1,
    createdAt: "2024-05-27T11:08:18.373Z",
    updatedAt: "2024-05-27T11:08:18.373Z",
    type: "person",
    ern: "garantiemax-test",
    phone: "+491438518410",
    createdBy: "Emil System",
    updatedBy: "Emil System"
  }
};

export const createAccountWorker: Worker = {
  id: 'createAccount',
  async execute(input) {
    return mockAccountData;
  }
};

export const fetchAccountWorker: Worker = {
  id: 'fetchAccount',
  async execute(input) {
    if (input.accountNumber !== mockAccountData.account.accountNumber) {
      throw new Error('Account not found');
    }
    return mockAccountData;
  }
}; 