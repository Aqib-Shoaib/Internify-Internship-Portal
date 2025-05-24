import ProfileCompletion from "./ProfileCompletion";
import QuickStats from "./QuickStats";
import LatestApplications from "./LatestApplications";

const Dashboard = () => {
  return (
    <div className='p-0 md:p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        <ProfileCompletion />
        <QuickStats />
      </div>

      {/* Latest Applications Table */}
      <LatestApplications />
    </div>
  );
};

export default Dashboard;
