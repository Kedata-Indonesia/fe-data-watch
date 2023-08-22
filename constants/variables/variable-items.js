import percentage from '@/utils/percentage';

const VARIABLE_ITEMS = [
  { label: 'Distinct', key: 'n_distinct' },
  { label: 'Distinct Percentage', key: 'p_distinct', render: val => percentage(val) },
  { label: 'Missing', key: 'n_missing' },
  { label: 'Missing Percentage', key: 'p_missing', render: val => percentage(val) },
  { label: 'Infinite', key: 'n_infinite' },
  { label: 'Infinite Percentage', key: 'p_infinite', render: val => percentage(val) },
  { label: 'Mean', key: 'mean' },
  { label: 'Minimum', key: 'minimum' },
  { label: 'Maximum', key: 'maximum' },
  { label: 'Zeros', key: 'n_zeros' },
  { label: 'Zeros Percentage', key: 'p_zeros', render: val => percentage(val) },
  { label: 'Negative', key: 'n_negative' },
  { label: 'Negative Percentage', key: 'p_negative', render: val => percentage(val) },
  { label: 'Memory Size', key: 'memory_size' },
];

export default VARIABLE_ITEMS;
