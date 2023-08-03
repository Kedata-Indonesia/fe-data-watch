import ReactECharts from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, HeatmapChart } from 'echarts/charts';
import {
  GridSimpleComponent,
  GridComponent,
  SingleAxisComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  LegendPlainComponent,
  VisualMapComponent,
} from 'echarts/components';

echarts.use([
  LineChart,
  HeatmapChart,
  GridSimpleComponent,
  GridComponent,
  SingleAxisComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  LegendPlainComponent,
  VisualMapComponent,
  CanvasRenderer,
]);

const Chart = ({ options, height = '500px' }) => {
  return (
    <ReactECharts
      echarts={echarts}
      option={options}
      style={{
        width: '100%',
        height: height,
      }}
    />
  );
};

export default Chart;
