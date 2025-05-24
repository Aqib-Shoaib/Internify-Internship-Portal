import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApplicationStats } from "@/services/intern";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function QuickStats() {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(
    function () {
      setLoading(true);
      const fetchStats = async () => {
        const res = await getApplicationStats(user._id);
        setStats(res);
      };
      fetchStats();
      setLoading(false);
    },
    [user._id]
  );

  return (
    <Card data-aos='zoom-in'>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Loader2 className='h-6 w-6 animate-spin text-gray-900' />
        ) : (
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-2xl font-bold'>{stats?.totalApplications}</p>
              <p className='text-sm text-muted-foreground'>
                Total Applications
              </p>
            </div>
            <div>
              <p className='text-2xl font-bold'>
                {stats?.acceptedApplications}
              </p>
              <p className='text-sm text-muted-foreground'>
                Internships Secured
              </p>
            </div>
            <div>
              <p className='text-2xl font-bold'>
                {stats?.rejectedApplications}
              </p>
              <p className='text-sm text-muted-foreground'>Rejections</p>
            </div>
            <div>
              <p className='text-2xl font-bold'>{stats?.successRate}%</p>
              <p className='text-sm text-muted-foreground'>Success Rate</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default QuickStats;
