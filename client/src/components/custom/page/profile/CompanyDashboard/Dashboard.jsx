import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import CompanyApplicationStats from "./CompanyApplicationStats";
import LatestJobPostings from "./LatestJobPostings";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className='p-0 md:p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        {/* Company Profile Card */}
        <Card data-aos='zoom-in'>
          <CardHeader>
            <CardTitle className='hidden md:block'>Company Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center space-x-4'>
              <img
                src={user?.profileImage || "/user.png"}
                alt='Company Logo'
                className='w-10 h-10 rounded-full object-cover'
              />
              <div>
                <h3 className='text-base md:text-lg font-semibold'>
                  {user?.name}
                </h3>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  {user?.industry}
                </p>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  {user?.location}
                </p>
                <Badge variant={user.verified ? "success" : "secondary"}>
                  {user?.verified ? "Verified" : "Pending"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Overview Card */}
        <CompanyApplicationStats />
      </div>

      {/* Job Postings Table */}
      <LatestJobPostings />
    </div>
  );
};

export default Dashboard;
