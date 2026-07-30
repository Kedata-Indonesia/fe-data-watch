const dataWatchKeys = {
  all: ['eda'],
  explorations: () => [...dataWatchKeys.all, 'explorations'],
  tables: (params = null) =>
    params ? [...dataWatchKeys.all, 'tables', params] : [...dataWatchKeys.all, 'tables'],
  dqRules: () => [...dataWatchKeys.all, 'dq-rules'],
  dqReport: () => [...dataWatchKeys.all, 'dq-report'],
};

export default dataWatchKeys;
