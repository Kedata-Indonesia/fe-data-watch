import { DashboardLayout } from '@/components/layouts';

const DataQualityPage = () => {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 flex justify-center items-center">
        <h1 className="text-heading-4 italic text-gray-400">Releasing soon...</h1>
      </div>
    </div>
  );
};

DataQualityPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default DataQualityPage;
