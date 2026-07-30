import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { memo } from 'react';

const Table = ({ columns = [], data = [] }) => {
  const tableData = { nodes: data };

  const theme = useTheme([
    getTheme(),
    {
      Table: `--data-table-library_grid-template-columns: repeat(${columns.length}, minmax(min-content, max-content))`,
      Row: `
        & [data-table-library_td] {
          min-width: 150px;
        }
        &:nth-of-type(odd) {
          background-color: #F5F6FA;
        }
      `,
    },
  ]);

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
      />
    </div>
  );
};

export default memo(Table);
