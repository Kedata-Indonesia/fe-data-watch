import ExplorationSection from '@/components/shared/exploration-section';
import clsx from 'clsx';

const AiMetadata = ({ id, title, data }) => {
  const columns = data || [];

  if (!columns.length) {
    return (
      <ExplorationSection id={id} title={title}>
        <p className="py-4 text-center text-sm italic text-gray-400">
          AI metadata is not available. Make sure AI_ENABLED=true and an API key is configured.
        </p>
      </ExplorationSection>
    );
  }

  return (
    <ExplorationSection id={id} title={title}>
      <div className="flex flex-col gap-3">
        {columns.map(col => (
          <div
            key={col.name}
            className="rounded border border-gray-200 bg-white p-4"
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-gray-700">{col.name}</span>
              <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
                {col.inferred_type || 'unknown'}
              </span>
            </div>
            {col.description && (
              <p className="mb-2 text-sm text-gray-600">{col.description}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {col.tags?.map(tag => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            {col.suggested_dq_rules?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="text-xs text-gray-400">Suggested rules:</span>
                {col.suggested_dq_rules.map(rule => (
                  <span
                    key={rule}
                    className={clsx(
                      'rounded px-1.5 py-0.5 text-xs font-medium',
                      rule === 'not_null' || rule === 'unique'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-amber-50 text-amber-600'
                    )}
                  >
                    {rule}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </ExplorationSection>
  );
};

export default AiMetadata;
