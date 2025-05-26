import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getActivitySummary } from "@/services/admin";
import { useEffect, useState } from "react";

function ActivitySummary() {
  const [stats, setStats] = useState();
  useEffect(function () {
    const fetchStats = async () => {
      const res = await getActivitySummary();
      if (res.status === 200 || res.status === 304) setStats(res.data);
    };
    fetchStats();
  }, []);

  return (
    <Card data-aos='zoom-in'>
      <CardHeader>
        <CardTitle>Activity Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <p className='text-2xl font-bold'>
              {stats?.internshipsPendingVerification}
            </p>
            <p className='text-sm text-muted-foreground'>
              Internships Pending Verification
            </p>
          </div>
          <div>
            <p className='text-2xl font-bold'>{stats?.verifiedInternships}</p>
            <p className='text-sm text-muted-foreground'>
              Verified Internships
            </p>
          </div>
          <div>
            <p className='text-2xl font-bold'>{stats?.verifiedCompanies}</p>
            <p className='text-sm text-muted-foreground'>Verified Companies</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ActivitySummary;
