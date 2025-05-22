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

const AdminCompanyVerificationTab = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [companyToVerify, setCompanyToVerify] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const mockData = [
        {
          _id: "company1",
          name: "Tech Corp",
          email: "techcorp@example.com",
          role: "COMPANY",
          verified: false,
          createdAt: "2025-05-01T09:00:00.000Z",
        },
        {
          _id: "company2",
          name: "Marketing Inc",
          email: "marketing@example.com",
          role: "COMPANY",
          verified: false,
          createdAt: "2025-05-10T14:00:00.000Z",
        },
      ];
      setCompanies(
        mockData.filter(
          (company) => company.role === "COMPANY" && !company.verified
        )
      );
      setLoading(false);
    };
    fetchCompanies();
  }, []);

  const handleVerify = (companyId) => {
    setIsUpdating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUpdating(false);
          setCompanies((prev) => prev.filter((c) => c._id !== companyId));
          console.log("Verify Company:", { _id: companyId });
          setShowConfirm(false);
          setCompanyToVerify(null);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  if (loading) {
    return <div className='p-0 md:p-6'>Loading...</div>;
  }

  return (
    <div className='p-0 md:p-6'>
      <h1 className='text-xl md:text-2xl font-bold mb-4 md:mb-6'>
        Company Verification
      </h1>
      {isUpdating && (
        <div className='mb-4'>
          <p className='text-muted-foreground'>Verifying...</p>
          <Progress value={progress} />
        </div>
      )}
      {companies.length > 0 ? (
        <Card data-aos='zoom-in'>
          <CardContent>
            <Table className='w-full md:w-3/5 mx-auto'>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((company) => (
                    <TableRow key={company._id}>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>
                        {new Date(company.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setCompanyToVerify(company);
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
          No companies awaiting verification.
        </p>
      )}
      {showConfirm && (
        <Alert variant='warning' className='mt-4'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Confirm Verification</AlertTitle>
          <AlertDescription>
            Verify company &quot;{companyToVerify?.name}&quot;? This action is
            irreversible.
            <div className='flex gap-2 mt-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setShowConfirm(false);
                  setCompanyToVerify(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant='default'
                size='sm'
                onClick={() => handleVerify(companyToVerify._id)}
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

export default AdminCompanyVerificationTab;
