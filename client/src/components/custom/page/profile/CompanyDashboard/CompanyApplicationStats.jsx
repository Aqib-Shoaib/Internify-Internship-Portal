import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCompanyStats } from "@/services/company";
import { useEffect, useState } from "react";

function CompanyApplicationStats() {
  const [stats, setStats] = useState({});

  useEffect(function () {
    const fetchStats = async () => {
      const data = await getCompanyStats();
      if (data.status === 200) {
        setStats(data.data);
      }
    };
    fetchStats();
  }, []);

  return (
    <Card data-aos='zoom-in'>
      <CardHeader>
        <CardTitle>Applications Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-0.5'>
          <div className='flex items-center gap-1'>
            <p className='text-2xl font-bold'>{stats.totalJobPostings}</p>
            <p className='text-sm text-muted-foreground'>Total Job Postings</p>
          </div>
          <div className='flex items-center gap-1'>
            <p className='text-2xl font-bold'>{stats.applicationsReceived}</p>
            <p className='text-sm text-muted-foreground'>
              Applications Received
            </p>
          </div>
          <div className='flex items-center gap-1'>
            <p className='text-2xl font-bold'>{stats.openPositions}</p>
            <p className='text-sm text-muted-foreground'>Open Positions</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CompanyApplicationStats;
