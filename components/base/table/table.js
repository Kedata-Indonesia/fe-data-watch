import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

const Table = ({ columns = [], data = [], loading = false }) => {
  const tableData = { nodes: data };

  const theme = useTheme([
    getTheme(),
    {
      Table: `--data-table-library_grid-template-columns: repeat(${columns.length}, minmax(min-content, max-content))`,
      Row: `
        & [data-table-library_td] {
          min-width: 150px;
        }
        &:nth-child(odd) {
          background-color: #F5F6FA;
        }
      `,
    },
  ]);

  if (loading) {
    return <Table.Skeleton />;
  }

  return (
    <div className="h-full w-full">
      <CompactTable
        data={tableData}
        columns={columns}
        theme={theme}
        layout={{
          custom: true,
          fixedHeader: true,
          horizontalScroll: true,
        }}
        resize={true}
      />
    </div>
  );
};

Table.Skeleton = () => {
  return (
    <div className="h-full w-full overflow-auto">
      <div className="grid w-[70%] grid-cols-6 bg-white">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={`tbl-skl-${idx}`} className="border-b border-r border-gray-300 bg-gray-100 p-3">
            <div className="h-[20px] w-full animate-pulse rounded-sm bg-gray-300" />
          </div>
        ))}
      </div>
      <div className="grid w-[70%] grid-cols-6 bg-white">
        {Array.from({ length: 102 }).map((_, idx) => (
          <div key={`tbl-sklr-${idx}`} className="border-b border-r border-gray-300 p-3">
            <div className="h-[20px] w-full animate-pulse rounded-sm bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

Table.Skeleton.displayName = 'TableSkeleton';

export default Table;
