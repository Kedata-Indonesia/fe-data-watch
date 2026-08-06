/**
 * Statuses that must NEVER render as 0% or pass.
 */
export const NOT_SCORED_STATUSES = [
  'not_applicable',
  'unknown',
  'unable_to_assess',
  'history_required',
  'unsupported',
];

export const STATUS_LABELS = {
  pass: 'Pass',
  warn: 'Warn',
  fail: 'Fail',
  not_applicable: 'Not assessed',
  unknown: 'Not assessed',
  unable_to_assess: 'Not assessed',
  history_required: 'Requires history',
  unsupported: 'Not supported',
};

/**
 * Registry parameter names that map to the rule's top-level `columns` array.
 */
export const COLUMN_PARAM_NAMES = [
  'column',
  'columns',
  'key_columns',
  'required_columns',
  'date_column',
];

/**
 * User-facing labels. Regex/range/allowed-set are "Conformity to rules",
 * never a business-accuracy claim.
 */
export const RULE_LABELS = {
  regex_match_rate: 'Conformity to rules (regex)',
  range_compliance_rate: 'Conformity to rules (range)',
  allowed_value_violation_rate: 'Conformity to rules (allowed values)',
  required_column_presence: 'Required columns',
  duplicate_key_rate: 'Unique key',
  custom_sentinel_rate: 'Custom missing values',
  cross_field_constraint_rate: 'Cross-field constraint',
  stale_value_rate: 'Freshness (max age)',
};

export const DIMENSION_LABELS = {
  technical_integrity: 'Technical integrity',
  completeness: 'Completeness',
  uniqueness: 'Uniqueness',
  validity: 'Validity',
  consistency: 'Consistency',
  timeliness: 'Timeliness',
  conformity: 'Conformity',
  accuracy: 'Accuracy',
  operational: 'Operational',
};
