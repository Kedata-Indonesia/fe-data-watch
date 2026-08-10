const dataWatchKeys = {
  all: ['eda'],
  explorations: () => [...dataWatchKeys.all, 'explorations'],
  tables: (params = null) =>
    params ? [...dataWatchKeys.all, 'tables', params] : [...dataWatchKeys.all, 'tables'],
  dqRules: () => [...dataWatchKeys.all, 'dq-rules'],
  dqReport: () => [...dataWatchKeys.all, 'dq-report'],
  dqCapabilities: () => [...dataWatchKeys.all, 'dq-capabilities'],
  dqDatasets: () => [...dataWatchKeys.all, 'dq-datasets'],
  dqDatasetRules: datasetId => [...dataWatchKeys.all, 'dq-datasets', datasetId, 'rules'],
  dqDatasetReport: datasetId => [...dataWatchKeys.all, 'dq-datasets', datasetId, 'report'],
  dqDatasetIssues: (datasetId, params = null) =>
    params
      ? [...dataWatchKeys.all, 'dq-datasets', datasetId, 'issues', params]
      : [...dataWatchKeys.all, 'dq-datasets', datasetId, 'issues'],
};

export default dataWatchKeys;
