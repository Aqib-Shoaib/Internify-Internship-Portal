import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSystemStats } from "@/services/admin";
import { useEffect, useState } from "react";

function SystemOverview() {
  const [stats, setStats] = useState();

  useEffect(function () {
    const fetchStats = async () => {
      const response = await getSystemStats();
      if (response.status === 200 || response.status === 304) {
        setStats(response.data);
      }
    };
    fetchStats();
  }, []);

  return (
    <Card data-aos='zoom-in'>
      <CardHeader>
        <CardTitle>System Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <p className='text-2xl font-bold'>{stats?.totalUsers}</p>
            <p className='text-sm text-muted-foreground'>Total Users</p>
          </div>
          <div>
            <p className='text-2xl font-bold'>{stats?.activeUsers}</p>
            <p className='text-sm text-muted-foreground'>Active Users</p>
          </div>
          <div>
            <p className='text-2xl font-bold'>
              {stats?.companiesPendingVerification}
            </p>
            <p className='text-sm text-muted-foreground'>
              Companies Pending Verification
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SystemOverview;
