import ReactECharts from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, HeatmapChart, BarChart } from 'echarts/charts';
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
  BarChart,
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
  if (!options) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <h1 className="text-gray-400 italic">No Chart</h1>
      </div>
    );
  }
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
