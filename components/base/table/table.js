import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

const Table = ({ columns, data }) => {
  const tableData = { nodes: data };

  const theme = useTheme([
    getTheme(),
    {
      Table: `--data-table-library_grid-template-columns: repeat(${columns.length}, minmax(150px, auto))`,
    },
  ]);

  return (
    <div>
      <CompactTable
        data={tableData}
        columns={columns}
        theme={theme}
        layout={{ custom: true, fixedHeader: true }}
      />
    </div>
  );
};

export default Table;
