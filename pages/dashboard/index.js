import { DashboardLayout } from '@/components/layouts';

const DashboardPage = () => {
  return <div>Page</div>;
};

DashboardPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardPage;
