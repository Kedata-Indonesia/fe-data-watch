import { Table } from '@/components/base/table';
import ExplorationSection from '@/components/shared/exploration-section';
import Tabs from '@/components/shared/tabs';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

const Chart = dynamic(() => import('@/components/base/chart').then(val => val.Chart), {
  ssr: false,
});

const TAB_ITEMS = /** @type {const} */ ({
  HEATMAP: 'heatmap',
  TABLE: 'table',
});

const Correlations = ({ id, title, data }) => {
  const [activeTab, setActiveTab] = useState(TAB_ITEMS.HEATMAP);

  const series = useMemo(() => {
    return data?.data ?? [];
  }, [data?.data]);

  const axisData = useMemo(() => {
    return {
      xAxis: data?.labels?.x || [],
      yAxis: [...data?.labels?.y].reverse() || [],
    };
  }, [data?.labels]);

  const tableColumns = useMemo(() => {
    const columns = data?.labels?.x?.map(column => ({
      label: column,
      renderCell: item => item[column],
    }));

    return [
      {
        label: '',
        renderCell: item => <div className="font-bold">{item?.firstRow}</div>,
        pinLeft: true,
      },
      ...(columns ?? []),
    ];
  }, [data?.labels?.x]);

  const tableData = useMemo(() => {
    const rows = data?.data?.map((rows, id) => {
      return rows?.reduce((acc, row, idx) => {
        const rowKey = data?.labels?.x?.[idx] ?? '';
        return { firstRow: data?.labels?.x?.[id], ...acc, [rowKey]: row };
      }, {});
    });

    return rows ?? [];
  }, [data?.data, data?.labels?.x]);

  console.log(tableData);

  return (
    <ExplorationSection id={id} title={title}>
      <div className="mt-5 p-5 border border-gray-300 rounded-md overflow-hidden">
        <div className="flex">
          <Tabs
            items={[
              { key: TAB_ITEMS.HEATMAP, label: 'Heatmap' },
              { key: TAB_ITEMS.TABLE, label: 'Table' },
            ]}
            itemClassName="capitalize w-auto p-[10px_32px]"
            activeItem={activeTab}
            onChange={item => setActiveTab(item.key)}
          />
        </div>
        <div className="mt-6 w-full flex justify-center items-center overflow-hidden">
          {activeTab === TAB_ITEMS.HEATMAP && (
            <Chart
              options={{
                grid: {
                  backgroundColor: '#F9F6F6',
                },
                tooltip: {
                  show: false,
                },
                yAxis: {
                  type: 'category',
                  data: axisData.yAxis,
                  splitLine: { show: false },
                  axisLine: { show: false },
                  axisTick: { show: false },
                  axisLabel: { show: true },
                },
                xAxis: {
                  type: 'category',
                  data: axisData.xAxis,
                  splitLine: { show: false },
                  axisLine: { show: false },
                  axisTick: { show: false },
                  axisLabel: {
                    show: true,
                    width: 100,
                    overflow: 'break', // or 'break' to continue in a new line
                    interval: 'auto',
                    rotate: -45,
                  },
                },
                gradientColor: ['#FFCCD6', '#FFB3C1', '#FF8098', '#FF4C6F'],
                visualMap: {
                  min: -1,
                  max: 1,
                  show: false,
                  calculable: true,
                  orient: 'horizontal',
                  left: 'center',
                  bottom: '15%',
                },
                series: [
                  {
                    name: 'Punch Card',
                    type: 'heatmap',
                    data: series,
                    label: {
                      show: true,
                    },
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                      },
                    },
                  },
                ],
              }}
            />
          )}
          {activeTab === TAB_ITEMS.TABLE && (
            <div className="h-[500px] !overflow-hidden">
              <Table data={tableData} columns={tableColumns} />
            </div>
          )}
        </div>
      </div>
    </ExplorationSection>
  );
};

export default Correlations;
