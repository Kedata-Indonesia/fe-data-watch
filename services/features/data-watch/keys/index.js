const dataWatchKeys = {
  all: ['eda'],
  explorations: () => [...dataWatchKeys.all, 'explorations'],
  tables: (params = null) =>
    params ? [...dataWatchKeys.all, 'tables', params] : [...dataWatchKeys.all, 'tables'],
};

export default dataWatchKeys;
