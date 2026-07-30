import clsx from 'clsx';

const TableLite = ({ columns = [], data = [] }) => {
  return (
    <table className="table table-lite">
      <thead>
        <tr>
          {columns.map(column => (
            <th key={`heading-${column?.key}`} className={clsx(column?.headerClassName)}>
              {column?.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((val, idx) => {
          return (
            <tr key={`tbody-${idx}`}>
              {columns.map(column => (
                <td key={`val-${column?.key}`} className={clsx(column?.className)}>
                  {column?.render ? column?.render(val) : val[column?.key]}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableLite;
