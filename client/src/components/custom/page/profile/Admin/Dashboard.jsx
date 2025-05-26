import ActivitySummary from "./ActivitySummary";
import SystemOverview from "./SystemOverview";

const Dashboard = () => {
  return (
    <div className='p-0 md:p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* System Overview Card */}
        <SystemOverview />
        {/* Activity Summary Card */}
        <ActivitySummary />
      </div>
    </div>
  );
};

export default Dashboard;
