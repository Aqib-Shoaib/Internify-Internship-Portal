import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import InternshipApplication from "./InternshipApplication";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL, manageError } from "@/constants";
import { useSelector } from "react-redux";

function Detail() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { internship } = useParams();
  const [internshipDetail, setInternshipDetails] = useState({});
  const [error, setError] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(
    function () {
      const fetchInternshipBySlug = async () => {
        try {
          const res = await axios.get(
            `${BACKEND_URL}/api/internships/all/${internship}`
          );
          if (res.status === 200 || res.status === 304) {
            setInternshipDetails(res.data.internship);
          } else {
            throw new Error("Internship Not Found");
          }
        } catch (err) {
          const msg = manageError(err);
          setError(msg);
        }
      };
      fetchInternshipBySlug();
    },
    [internship]
  );

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Status logic
  const getStatus = () => {
    return internshipDetail?.live &&
      new Date(internshipDetail?.expiryDate) > new Date()
      ? "Open"
      : "Closed";
  };

  return (
    <div className='p-3 md:p-6 max-w-4xl mx-auto mt-28'>
      {/* Header Section */}
      <div className='mb-6'>
        <h1 className='text-2xl md:text-3xl font-bold mb-2'>
          {internshipDetail?.title}
        </h1>
        <p className='text-base md:text-lg text-muted-foreground mb-2'>
          {internshipDetail?.company?.name} • {internshipDetail?.location}
        </p>
        <div className='flex gap-2'>
          {internshipDetail?.sponsored && <Badge>Sponsored</Badge>}
          <Badge>{internshipDetail?.term?.replace("-", " ")}</Badge>
          <Badge>{getStatus()}</Badge>
        </div>
      </div>

      {/* Details Section */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Internship Details</CardTitle>
        </CardHeader>
        {error ? (
          <CardContent>
            <p>{error}</p>
          </CardContent>
        ) : (
          <CardContent className='space-y-4'>
            <div>
              <h3 className='text-lg font-medium'>Description</h3>
              <p className='text-muted-foreground'>
                {internshipDetail?.description}
              </p>
            </div>
            <div>
              <h3 className='text-lg font-medium'>Salary</h3>
              <p className='text-muted-foreground'>
                ${internshipDetail?.salary}/month
              </p>
            </div>
            <div>
              <h3 className='text-lg font-medium'>Duration</h3>
              <p className='text-muted-foreground'>
                {internshipDetail?.duration} months
              </p>
            </div>
            <div>
              <h3 className='text-lg font-medium'>Posted Date</h3>
              <p className='text-muted-foreground'>
                {formatDate(internshipDetail?.createdAt)}
              </p>
            </div>
            <div>
              <h3 className='text-lg font-medium'>Expiry Date</h3>
              <p className='text-muted-foreground'>
                {formatDate(internshipDetail?.expiryDate)}
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Apply Button Section */}
      {user?.role === "INTERN" && (
        <div className='flex justify-between items-center'>
          {isAuthenticated ? (
            <Button onClick={() => setIsDrawerOpen(true)}>Apply Now</Button>
          ) : (
            <Button asChild>
              <a href='/login'>Login to Apply</a>
            </Button>
          )}
          <Button variant='outline' size='icon' title='Save Internship'>
            <Bookmark className='h-5 w-5' />
          </Button>
        </div>
      )}

      {/* Apply Form Drawer */}
      <InternshipApplication
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        title={internshipDetail?.title}
        id={internshipDetail?._id}
      />
    </div>
  );
}

export default Detail;
