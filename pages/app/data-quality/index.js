import { DashboardLayout } from '@/components/layouts';
import serverProps from '@/services/servers/server-props';
import withAuth from '@/services/servers/with-auth';
import withSession from '@/services/servers/with-session';

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

export const getServerSideProps = serverProps(withAuth(), withSession());

export default DataQualityPage;
