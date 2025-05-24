import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getProfileCompletionProgress } from "@/services/intern";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ProfileCompletion() {
  const [progressData, setProgressData] = useState({});
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getProfileCompletionProgress(user._id);
      setProgressData(data);
      setLoading(false);
    }
    fetchData();
  }, [user._id]);

  return (
    <Card data-aos='zoom-in'>
      <CardHeader>
        <CardTitle>Profile Completion</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Loader2 className='h-6 w-6 animate-spin text-gray-900' />
        ) : (
          <>
            <p className='text-sm text-muted-foreground'>{progressData?.tip}</p>
            <div className='flex items-center gap-1 justify-between mt-2'>
              <Progress value={progressData?.completionPercentage || 50} />
              <p className='text-sm text-muted-foreground'>
                {progressData?.completionPercentage}%
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default ProfileCompletion;
