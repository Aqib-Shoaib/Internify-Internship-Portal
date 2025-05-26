import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  internshipsPendingVerification,
  verifyInternship,
} from "@/services/admin";

const AdminInternshipVerificationTab = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [internshipToVerify, setInternshipToVerify] = useState(null);

  useEffect(() => {
    const fetchInternships = async () => {
      const res = await internshipsPendingVerification();
      if (res.status === 200 || res.status === 304) {
        setInternships(res.data);
      }
      setLoading(false);
    };
    fetchInternships();
  }, []);

  const handleVerify = (internshipId) => {
    setIsUpdating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUpdating(false);
          setInternships((prev) => prev.filter((i) => i._id !== internshipId));

          verifyInternship(internshipId);
          setShowConfirm(false);
          setInternshipToVerify(null);
          return 0;
        }
        return prev + 10;
      });
    }, 0);
  };

  if (loading) {
    return <div className='p-0 md:p-6'>Loading...</div>;
  }

  return (
    <div className='p-0 md:p-6'>
      <h1 className='text-xl md:text-2xl font-bold mb-4 md:mb-6'>
        Internship Verification
      </h1>
      {isUpdating && (
        <div className='mb-4'>
          <p className='text-muted-foreground'>Verifying...</p>
          <Progress value={progress} />
        </div>
      )}
      {internships.length > 0 ? (
        <Card data-aos='zoom-in'>
          <CardContent>
            <Table className='w-full md:w-3/5 mx-auto'>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {internships
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((internship) => (
                    <TableRow key={internship._id}>
                      <TableCell>{internship?.company?.name}</TableCell>
                      <TableCell>{internship?.title}</TableCell>
                      <TableCell>{internship?.location}</TableCell>
                      <TableCell>{internship?.term}</TableCell>
                      <TableCell>
                        {new Date(internship?.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setInternshipToVerify(internship);
                            setShowConfirm(true);
                          }}
                        >
                          <CheckCircle2 className='h-4 w-4 mr-1' />
                          Verify
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <p className='text-muted-foreground'>
          No internships awaiting verification.
        </p>
      )}
      {showConfirm && (
        <Alert variant='warning' className='mt-4'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Confirm Verification</AlertTitle>
          <AlertDescription>
            Verify internship &quot;{internshipToVerify?.title}&quot; by{" "}
            {internshipToVerify?.company.name}?
            <div className='flex gap-2 mt-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setShowConfirm(false);
                  setInternshipToVerify(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant='default'
                size='sm'
                onClick={() => handleVerify(internshipToVerify._id)}
              >
                Confirm
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AdminInternshipVerificationTab;
