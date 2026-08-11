import { Button } from '@/components/base/button';
import { DropdownMenu } from '@/components/base/dropdown-menu';
import AddIcon from '@/components/icons/addIcon';
import ClipboardIcon from '@/components/icons/ClipboardIcon';
import MoreIcon from '@/components/icons/MoreIcon';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import useModal from '@/utils/hooks/use-modal';
import AddDataQualityModal from '../add-data-quality-modal';
import DataQualityContent from '../data-quality-content';
import { RULE_LABELS } from './constants';

const DataQuality = ({
  datasets = [],
  dataset = null,
  columns = [],
  onSelectDataset = () => {},
  ruleOptions = [],
  rules = [],
  report = null,
  reportStatus = null,
  reportLoading = false,
  reportError = null,
  issuesPayload = null,
  issueTruncation = {},
  issuePage = 1,
  issueMetric = '',
  issueDimension = '',
  issueMetricOptions = [],
  issueDimensionOptions = [],
  onIssuePageChange = () => {},
  onIssueFilterChange = () => {},
  onAddRule = () => {},
  onRerun = () => {},
  rerunning = false,
  onDownload = () => {},
  exporting = false,
}) => {
  const addDataQualityModal = useModal(false);
  const [modalData, setModalData] = useState(null);

  const rulesChangeHandler = menu => {
    if (!menu?.value) return;
    addDataQualityModal.open();
    setModalData(menu);
  };

  const datasetOptions = useMemo(
    () =>
      (datasets || []).map(item => ({
        label: `${item.filename} (${item.row_count || 0} rows)`,
        value: item.dataset_id,
      })),
    [datasets]
  );

  if (!dataset) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <div className="mb-5 rounded-full bg-gray-200 p-8">
          <ClipboardIcon />
        </div>
        <p className="text-gray-600">No dataset yet.</p>
        <p className="text-sm text-gray-400">Upload a file first to run data quality checks.</p>
        <Link href="/app/upload">
          <Button size="md" type="outline">
            Upload file
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <AddDataQualityModal
        isOpen={addDataQualityModal.isOpen}
        onClose={addDataQualityModal.close}
        data={modalData}
        columns={columns}
        onClick={payload => {
          onAddRule(payload);
          addDataQualityModal.close();
        }}
      />
      <div className="relative flex h-full">
        <div className="w-[355px] border-r border-gray-300 bg-[#F5F6FA] p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-gray-600">Data Quality Rule</p>
            <DropdownMenu
              menuWidth="230px"
              firstMenuClassName="!w-[230px]"
              menuChildWidth="auto"
              options={ruleOptions}
              placement="bottom-start"
              className="flex items-center"
              onChange={rulesChangeHandler}
              renderChild={({ containerRef, open, isOpen }) => (
                <button
                  ref={containerRef}
                  onClick={open}
                  className={isOpen ? 'rounded-[4px] bg-[#EBEDF5] text-c-red-600' : ''}
                >
                  <AddIcon />
                </button>
              )}
            />
          </div>

          {!rules?.length ? (
            <p className="text-center text-sm italic text-gray-400">No rule added yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {rules.map((rule, idx) => (
                <div
                  key={`${rule.rule_key}-${idx}`}
                  className="rounded-[4px] border border-gray-300 bg-white px-[14px] py-2.5"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-600">
                      {RULE_LABELS[rule.rule_key] || rule.rule_key}
                    </p>
                    <MoreIcon />
                  </div>
                  <div className="text-xs text-gray-400">
                    Column <span className="font-bold">{rule.columns?.join(', ') || '-'}</span> must
                    pass{' '}
                    <span className="font-bold">{RULE_LABELS[rule.rule_key] || rule.rule_key}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <Button
              size="md"
              type="outline"
              onClick={onRerun}
              isLoading={rerunning}
              className="w-full"
            >
              Run checks
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 top-0 flex w-[calc(100%_-_355px)] flex-col gap-5 overflow-auto p-6">
          <DataQualityContent
            report={report}
            reportStatus={reportStatus}
            reportLoading={reportLoading}
            reportError={reportError}
            issuesPayload={issuesPayload}
            issueTruncation={issueTruncation}
            issuePage={issuePage}
            issueMetric={issueMetric}
            issueDimension={issueDimension}
            issueMetricOptions={issueMetricOptions}
            issueDimensionOptions={issueDimensionOptions}
            onIssuePageChange={onIssuePageChange}
            onIssueFilterChange={onIssueFilterChange}
            onRerun={onRerun}
            rerunning={rerunning}
            onDownload={onDownload}
            exporting={exporting}
          />
        </div>
      </div>
    </>
  );
};

const formatNumber = value => {
  if (value == null) return '-';
  return Number(value).toLocaleString('id-ID');
};

export default DataQuality;
