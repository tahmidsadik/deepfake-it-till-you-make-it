import { Worker } from './worker';

const mockPolicyData = {
  policy: {
    versions: [
      {
        timeline: [
          {
            policyObjects: [
              {
                insuredObjectId: 1999,
                insuredObjectName: "mobileDevice1",
                summary: "{\"deviceId\":\"ABC123123123123\",\"deviceType\":\"1\",\"purchaseDate\":\"2023-02-01T13:20:01.000Z\",\"deviceDetails\":\"Notebook\",\"purchasePrice\":0,\"extendedCoverage\":\"1\",\"purchaseInvoicePath\":\"[n/a]\"}",
                code: "pol_o_HHieHAWD1DgM",
                data: {
                  deviceId: "ABC123123123123",
                  deviceType: "1",
                  purchaseDate: "2023-02-01T13:20:01.000Z",
                  deviceDetails: "Notebook",
                  purchasePrice: 0,
                  extendedCoverage: "1",
                  purchaseInvoicePath: "[n/a]"
                },
                createdAt: "2025-06-18T09:13:14.255Z",
                updatedAt: "2025-06-18T09:13:14.255Z",
                insuredObjectLabel: "Mobiles Gerät 1",
                isMultiInsuredObject: false,
                createdBy: "b84db4d7-34c7-4711-966d-f3755a159f8a",
                updatedBy: "b84db4d7-34c7-4711-966d-f3755a159f8a"
              },
              {
                insuredObjectId: 2011,
                insuredObjectName: "default",
                summary: "{\"brokerID\":null,\"policyStatus\":\"TERMINATED\",\"billingMethod\":\"policyStartDate\",\"addOnFamilyOne\":\"0\",\"addOnFamilyTwo\":\"0\",\"optInNewsletter\":false,\"policyStartDate\":\"2023-04-30T00:00:00.000Z\",\"addOnFamilyThree\":\"0\",\"isRecurringBilling\":true,\"policyDurationUnit\":\"year\",\"extendedCoverageOne\":\"0\",\"extendedCoverageTwo\":\"0\",\"policyDurationValue\":1,\"recurringBillingDay\":2,\"recurringPaymentDay\":2,\"billingFrequencyUnit\":\"year\",\"extendedCoverageFour\":\"0\",\"isAcceptedBrokerInfo\":true,\"billingFrequencyValue\":1,\"extendedCoverageThree\":\"0\",\"policyRenewalFrequency\":-1,\"isAcceptedPrivacyPolicy\":true,\"isAcceptedTermsAndConditions\":true}",
                code: "pol_o_-JPtODs-_WF4",
                data: {
                  brokerID: null,
                  policyStatus: "TERMINATED",
                  billingMethod: "policyStartDate",
                  addOnFamilyOne: "0",
                  addOnFamilyTwo: "0",
                  optInNewsletter: false,
                  policyStartDate: "2023-04-30T00:00:00.000Z",
                  addOnFamilyThree: "0",
                  isRecurringBilling: true,
                  policyDurationUnit: "year",
                  extendedCoverageOne: "0",
                  extendedCoverageTwo: "0",
                  policyDurationValue: 1,
                  recurringBillingDay: 2,
                  recurringPaymentDay: 2,
                  billingFrequencyUnit: "year",
                  extendedCoverageFour: "0",
                  isAcceptedBrokerInfo: true,
                  billingFrequencyValue: 1,
                  extendedCoverageThree: "0",
                  policyRenewalFrequency: -1,
                  isAcceptedPrivacyPolicy: true,
                  isAcceptedTermsAndConditions: true
                },
                createdAt: "2025-06-18T09:13:14.255Z",
                updatedAt: "2025-06-18T09:13:14.255Z",
                insuredObjectLabel: "Default",
                isMultiInsuredObject: false,
                createdBy: "b84db4d7-34c7-4711-966d-f3755a159f8a",
                updatedBy: "b84db4d7-34c7-4711-966d-f3755a159f8a"
              }
            ],
            id: 56727,
            from: "2023-04-30T00:00:00.000Z",
            to: null,
            createdAt: "2025-06-18T09:13:14.255Z",
            updatedAt: "2025-06-18T09:13:14.255Z",
            premium: {
              premiumItems: [
                {
                  premiumFormulaId: 825,
                  total: 83.194,
                  createdAt: "2025-06-18T09:12:10.492Z",
                  updatedAt: "2025-06-18T09:12:10.492Z",
                  premiumFormula: {
                    id: 825,
                    productVersionId: 785,
                    group: "XCARE+",
                    name: "XCARE+",
                    expression: "83.194 + default.addOnFamilyOne + default.addOnFamilyTwo + default.addOnFamilyThree + default.extendedCoverageOne  + default.extendedCoverageTwo + default.extendedCoverageThree  + default.extendedCoverageFour",
                    type: "time",
                    unit: "year",
                    createdAt: "2023-04-25T13:12:08.451Z",
                    updatedAt: "2023-04-25T13:12:08.451Z",
                    itemType: "other",
                    visibility: "public",
                    order: 10,
                    createdBy: "Emil System",
                    updatedBy: "Emil System"
                  },
                  isOverride: false,
                  createdBy: "b84db4d7-34c7-4711-966d-f3755a159f8a",
                  updatedBy: "b84db4d7-34c7-4711-966d-f3755a159f8a"
                }
              ],
              grandTotal: 83.194,
              createdAt: "2025-06-18T09:12:10.492Z",
              updatedAt: "2025-06-18T09:12:10.492Z",
              currency: "EUR",
              createdBy: "b84db4d7-34c7-4711-966d-f3755a159f8a",
              updatedBy: "b84db4d7-34c7-4711-966d-f3755a159f8a"
            },
            createdBy: "b84db4d7-34c7-4711-966d-f3755a159f8a",
            updatedBy: "b84db4d7-34c7-4711-966d-f3755a159f8a"
          }
        ],
        id: 47735,
        isCurrent: true,
        metadata: {
          updateData: "[{\"createdBy\":\"b84db4d7-34c7-4711-966d-f3755a159f8a\",\"updatedBy\":\"b84db4d7-34c7-4711-966d-f3755a159f8a\",\"id\":328863,\"code\":\"pol_o_-JPtODs-_WF4\",\"owner\":\"garantiemax-test\",\"timesliceId\":56726,\"data\":{\"addOnFamilyThree\":\"0\",\"policyDurationValue\":1,\"addOnFamilyOne\":\"0\",\"extendedCoverageOne\":\"0\",\"extendedCoverageTwo\":\"0\",\"extendedCoverageThree\":\"0\",\"billingFrequencyValue\":1,\"recurringBillingDay\":2,\"billingFrequencyUnit\":\"year\",\"policyStartDate\":\"2023-04-30T00:00:00.000Z\",\"addOnFamilyTwo\":\"0\",\"extendedCoverageFour\":\"0\",\"isRecurringBilling\":true,\"policyDurationUnit\":\"year\",\"recurringPaymentDay\":2,\"policyRenewalFrequency\":-1,\"policyStatus\":\"TERMINATED\",\"billingMethod\":\"policyStartDate\",\"brokerID\":null,\"optInNewsletter\":false,\"isAcceptedBrokerInfo\":true,\"isAcceptedPrivacyPolicy\":true,\"isAcceptedTermsAndConditions\":true},\"insuredObjectId\":2011,\"createdAt\":\"2025-06-18T09:12:10.492Z\",\"updatedAt\":\"2025-06-18T09:12:10.492Z\",\"deletedAt\":null,\"tenantHierarchy\":\"garantiemax-test\",\"insuredObject\":{\"createdBy\":\"Emil System\",\"updatedBy\":\"Emil System\",\"id\":2011,\"owner\":\"garantiemax-test\",\"productVersionId\":785,\"name\":\"default\",\"label\":\"Default\",\"insuredObjectTypeId\":12,\"isMultiInsuredObject\":false,\"minInsuredObjectsCount\":null,\"maxInsuredObjectsCount\":null,\"createdAt\":\"2023-04-25T13:12:07.388Z\",\"updatedAt\":\"2023-04-25T13:12:07.388Z\",\"deletedAt\":null},\"summary\":\"{\\\"brokerID\\\":null,\\\"policyStatus\\\":\\\"ACTIVE\\\",\\\"billingMethod\\\":\\\"policyStartDate\\\",\\\"addOnFamilyOne\\\":\\\"0\\\",\\\"addOnFamilyTwo\\\":\\\"0\\\",\\\"optInNewsletter\\\":false,\\\"policyStartDate\\\":\\\"2023-04-30T00:00:00.000Z\\\",\\\"addOnFamilyThree\\\":\\\"0\\\",\\\"isRecurringBilling\\\":true,\\\"policyDurationUnit\\\":\\\"year\\\",\\\"extendedCoverageOne\\\":\\\"0\\\",\\\"extendedCoverageTwo\\\":\\\"0\\\",\\\"policyDurationValue\\\":1,\\\"recurringBillingDay\\\":2,\\\"recurringPaymentDay\\\":2,\\\"billingFrequencyUnit\\\":\\\"year\\\",\\\"extendedCoverageFour\\\":\\\"0\\\",\\\"isAcceptedBrokerInfo\\\":true,\\\"billingFrequencyValue\\\":1,\\\"extendedCoverageThree\\\":\\\"0\\\",\\\"policyRenewalFrequency\\\":-1,\\\"isAcceptedPrivacyPolicy\\\":true,\\\"isAcceptedTermsAndConditions\\\":true}\",\"insuredObjectName\":\"default\",\"insuredObjectLabel\":\"Default\",\"isMultiInsuredObject\":false},{\"createdBy\":\"b84db4d7-34c7-4711-966d-f3755a159f8a\",\"updatedBy\":\"b84db4d7-34c7-4711-966d-f3755a159f8a\",\"id\":328862,\"code\":\"pol_o_HHieHAWD1DgM\",\"owner\":\"garantiemax-test\",\"timesliceId\":56726,\"data\":{\"deviceId\":\"ABC123123123123\",\"purchaseDate\":\"2023-02-01T13:20:01.000Z\",\"deviceDetails\":\"Notebook\",\"extendedCoverage\":\"1\",\"purchaseInvoicePath\":\"[n/a]\",\"deviceType\":\"1\",\"purchasePrice\":0},\"insuredObjectId\":1999,\"createdAt\":\"2025-06-18T09:12:10.492Z\",\"updatedAt\":\"2025-06-18T09:12:10.492Z\",\"deletedAt\":null,\"tenantHierarchy\":\"garantiemax-test\",\"insuredObject\":{\"createdBy\":\"Emil System\",\"updatedBy\":\"Emil System\",\"id\":1999,\"owner\":\"garantiemax-test\",\"productVersionId\":785,\"name\":\"mobileDevice1\",\"label\":\"Mobiles Gerät 1\",\"insuredObjectTypeId\":3,\"isMultiInsuredObject\":false,\"minInsuredObjectsCount\":null,\"maxInsuredObjectsCount\":null,\"createdAt\":\"2023-04-25T13:12:07.231Z\",\"updatedAt\":\"2023-04-25T13:12:07.231Z\",\"deletedAt\":null},\"summary\":\"{\\\"deviceId\\\":\\\"ABC123123123123\\\",\\\"deviceType\\\":\\\"1\\\",\\\"purchaseDate\\\":\\\"2023-02-01T13:20:01.000Z\\\",\\\"deviceDetails\\\":\\\"Notebook\\\",\\\"purchasePrice\\\":0,\\\"extendedCoverage\\\":\\\"1\\\",\\\"purchaseInvoicePath\\\":\\\"[n/a]\\\"}\",\"insuredObjectName\":\"mobileDevice1\",\"insuredObjectLabel\":\"Mobiles Gerät 1\",\"isMultiInsuredObject\":false}]"
        },
        createdAt: "2025-06-18T09:13:14.255Z",
        updatedAt: "2025-06-18T09:13:14.255Z",
        isDraft: false,
        createdBy: "b84db4d7-34c7-4711-966d-f3755a159f8a",
        updatedBy: "b84db4d7-34c7-4711-966d-f3755a159f8a"
      }
    ],
    partnerLinks: [],
    id: 38640,
    code: "pol_rVg7xI9QcVU0ZV",
    policyNumber: "5901000691",
    productVersionId: 785,
    productId: 825,
    accountCode: "acc_DSieOvBqs4z8v2ZBpYWyH",
    status: "TERMINATED",
    createdAt: "2025-06-18T09:12:10.492Z",
    updatedAt: "2025-06-18T09:13:14.255Z",
    product: {
      insuredObjectTypes: [],
      versions: [],
      id: 825,
      code: "prod_zxq7jNvwGbXpML3kuBDRQ",
      name: "XCARE+",
      contractDurationDays: 365,
      createdAt: "2023-04-25T13:12:02.446Z",
      updatedAt: "2023-04-25T13:12:02.446Z",
      slug: "xcare+",
      defaultLanguage: "German",
      createdBy: "Emil System",
      updatedBy: "Emil System"
    },
    policyStartDate: "2023-04-30T00:00:00.000Z",
    internalPolicyNumber: "5901000691",
    holder: "Lany Young",
    leadCode: "lea_VcBUWqIwqsiXmUW1eihCv",
    ern: "garantiemax-test",
    productName: "XCARE+",
    productSlug: "xcare+",
    createdBy: "b84db4d7-34c7-4711-966d-f3755a159f8a",
    updatedBy: "b84db4d7-34c7-4711-966d-f3755a159f8a"
  }
};

export const createPolicyWorker: Worker = {
  id: 'createPolicy',
  async execute(input) {
    const newPolicy = {
      ...mockPolicyData,
      policy: {
        ...mockPolicyData.policy,
        id: Math.floor(Math.random() * 100000),
        code: `pol_${Math.random().toString(36).substring(2, 15)}`,
        policyNumber: `${Math.floor(Math.random() * 10000000000)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        holder: input.holder || "New Policy Holder",
        status: "ACTIVE"
      }
    };
    return newPolicy;
  }
};

export const fetchPolicyWorker: Worker = {
  id: 'fetchPolicy',
  async execute(input) {
    if (input.policyNumber !== mockPolicyData.policy.policyNumber) {
      throw new Error('Policy not found');
    }

    return mockPolicyData;
  }
}; 