import DataSummaryTable from '@/components/shared/data-summary-table';
import { useMemo } from 'react';

const VariableOverview = ({ data = null }) => {
  const length = useMemo(() => {
    return [
      {
        key: 'max_length',
        label: 'Max Length',
        value: data?.length?.max_length,
      },
      {
        key: 'mean_length',
        label: 'Mean Length',
        value: data?.length?.mean_length,
      },
      {
        key: 'median_length',
        label: 'Median Length',
        value: data?.length?.median_length,
      },
      {
        key: 'min_length',
        label: 'Min Length',
        value: data?.length?.min_length,
      },
    ];
  }, [data]);

  const characters = useMemo(() => {
    return [
      {
        key: 'n_characters',
        label: 'Total Characters',
        value: data?.characters?.n_characters,
      },
      {
        key: 'n_characters_distinct',
        label: 'Distinct characters',
        value: data?.characters?.n_characters_distinct,
      },
      {
        key: 'n_category',
        label: 'Distinct categories',
        value: data?.characters?.n_category,
      },
      {
        key: 'n_scripts',
        label: 'Distinct scripts',
        value: data?.characters?.n_scripts,
      },
      {
        key: 'n_block_alias',
        label: 'Distinct blocks',
        value: data?.characters?.n_block_alias,
      },
    ];
  }, [data]);

  const unique = useMemo(() => {
    return [
      {
        key: 'n_unique',
        label: 'Unique',
        value: data?.unique?.n_unique,
      },
      {
        key: 'p_unique',
        label: 'Unique (%)',
        value: data?.unique?.p_unique,
      },
    ];
  }, [data]);

  const sample = useMemo(() => {
    if (!data?.sample) return [];
    const sampleData = Object.values(data?.sample) ?? [];

    return sampleData.map((item, idx) => ({
      key: `sample_${idx}`,
      label: (idx === 0 ? `${idx + 1}st` : idx === 1 ? `${idx + 1}nd` : `${idx + 1}th`) + ' row',
      value: item,
    }));
  }, [data]);

  return (
    <div className="grid grid-cols-4 gap-6">
      <div>
        <h5 className="text-heading-5 font-semibold mb-4">Length</h5>
        <DataSummaryTable data={length} />
      </div>
      <div>
        <h5 className="text-heading-5 font-semibold mb-4">Characters and Unicode</h5>
        <DataSummaryTable data={characters} />
      </div>
      <div>
        <h5 className="text-heading-5 font-semibold mb-4">Unique</h5>
        <DataSummaryTable data={unique} />
      </div>
      <div>
        <h5 className="text-heading-5 font-semibold mb-4">Sample</h5>
        <DataSummaryTable data={sample} />
      </div>
    </div>
  );
};

export default VariableOverview;
