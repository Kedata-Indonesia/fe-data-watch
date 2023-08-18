import VARIABLE_TYPES from '@/constants/variables/variable-types';
import { produce } from 'immer';

const chartDefaultOptions = options => {
  return produce(options, draft => {
    draft.tooltip = {
      trigger: 'axis',
    };
    draft.grid = {
      top: '3%', // Padding atas
    };
    draft.series = [
      {
        itemStyle: {
          color: 'red', // Ganti warna batang menjadi biru untuk seluruh batang
        },
        label: {
          show: true,
          position: 'inside',
        },
      },
    ];
  });
};

const variableChartOptions = {
  [VARIABLE_TYPES.CATEGORICAL]: payload => {
    return produce(chartDefaultOptions(payload), draft => {
      const yAxisData = Object.keys(draft.word_counts);
      const xAxisData = Object.values(draft.word_counts);

      draft.xAxis = {
        type: 'value',
        axisLabel: {
          show: false,
        },
      };
      draft.yAxis = {
        type: 'category',
        data: yAxisData,
        axisLabel: {
          show: true,
        },
      };
      draft.series[0].name = 'Word Counts';
      draft.series[0].barCategoryGap = '10';
      draft.series[0].type = 'bar';
      draft.series[0].data = xAxisData;
    });
  },
  [VARIABLE_TYPES.NUMERIC]: payload => {
    return produce({ ...chartDefaultOptions(payload) }, draft => {
      const xAxisData = draft.bins.map(item => item.bin_start);
      const yAxisData = draft.bins.map(item => item.count);

      draft.xAxis = {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          show: true,
        },
      };
      draft.yAxis = {
        type: 'value',
        max: 'dataMax',
        axisLabel: {
          show: true,
        },
      };
      draft.series[0].name = 'Histogram';
      draft.series[0].type = 'bar';
      draft.series[0].barCategoryGap = '0';
      draft.series[0].data = yAxisData;
      draft.series[0].label.show = false;
    });
  },
  [VARIABLE_TYPES.TEXT]: payload => {
    return produce(payload, draft => {
      const dataWords = Object.keys(draft.word_counts)
        .slice(0, 200)
        .map(key => {
          return {
            name: key,
            value: draft.word_counts[key],
          };
        });

      draft.yAxis = {
        axisLabel: {
          show: false,
        },
        axisLine: { show: false },
        axisTick: { show: false },
      };
      draft.xAxis = {
        axisLabel: {
          show: false,
        },
        axisLine: { show: false },
        axisTick: { show: false },
      };
      draft.series = [
        {
          keepAspect: true,
          top: null,
          bottom: null,
          width: '100%',
          height: '100%',
          left: null,
          type: 'wordCloud',
          shape: 'square',
          sizeRange: [12, 80],
          data: dataWords,
        },
      ];
    });
  },
  [VARIABLE_TYPES.DATE]: payload => {},
};

const variableChartKeys = {
  [VARIABLE_TYPES.NUMERIC]: 'histogram',
  [VARIABLE_TYPES.TEXT]: 'words',
  [VARIABLE_TYPES.CATEGORICAL]: 'categories',
};

export { variableChartOptions, variableChartKeys };
