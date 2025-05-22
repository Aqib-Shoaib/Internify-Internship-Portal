import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import InternshipApplication from "./InternshipApplication";

const internshipData = {
  _id: "internship_001",
  title: "Software Engineer Intern",
  slug: "software-engineer-intern",
  description:
    "Join our team to build scalable web applications using React and Node.js...",
  company: {
    _id: "company_123",
    name: "Tech Corp",
  },
  location: "Islamabad",
  salary: 500,
  live: true,
  expiryDate: "2025-06-30T23:59:59.000Z",
  sponsored: false,
  verified: true,
  term: "FULL-TIME",
  duration: 6,
  createdAt: "2025-05-01T09:00:00.000Z",
  isLoggedIn: true,
  user: {
    resumes: [
      {
        title: "My Tech Resume",
        link: "/resumes/intern_123_tech_resume.pdf",
        createdAt: "2025-05-01T09:00:00.000Z",
      },
      {
        title: "AI Internship Resume",
        link: "/resumes/intern_123_ai_resume.pdf",
        createdAt: "2025-05-10T12:00:00.000Z",
      },
    ],
  },
};

function Detail() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    return internshipData.live &&
      new Date(internshipData.expiryDate) > new Date()
      ? "Open"
      : "Closed";
  };

  return (
    <div className='p-3 md:p-6 max-w-4xl mx-auto mt-28'>
      {/* Header Section */}
      <div className='mb-6'>
        <h1 className='text-2xl md:text-3xl font-bold mb-2'>
          {internshipData.title}
        </h1>
        <p className='text-base md:text-lg text-muted-foreground mb-2'>
          {internshipData.company.name} • {internshipData.location}
        </p>
        <div className='flex gap-2'>
          <Badge variant={internshipData.verified ? "success" : "secondary"}>
            {internshipData.verified ? "Verified" : "Not Verified"}
          </Badge>
          {internshipData.sponsored && <Badge>Sponsored</Badge>}
          <Badge>{internshipData.term.replace("-", " ")}</Badge>
          <Badge>{getStatus()}</Badge>
        </div>
      </div>

      {/* Details Section */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Internship Details</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <h3 className='text-lg font-medium'>Description</h3>
            <p className='text-muted-foreground'>
              {internshipData.description}
            </p>
          </div>
          <div>
            <h3 className='text-lg font-medium'>Salary</h3>
            <p className='text-muted-foreground'>
              ${internshipData.salary}/month
            </p>
          </div>
          <div>
            <h3 className='text-lg font-medium'>Duration</h3>
            <p className='text-muted-foreground'>
              {internshipData.duration} months
            </p>
          </div>
          <div>
            <h3 className='text-lg font-medium'>Posted Date</h3>
            <p className='text-muted-foreground'>
              {formatDate(internshipData.createdAt)}
            </p>
          </div>
          <div>
            <h3 className='text-lg font-medium'>Expiry Date</h3>
            <p className='text-muted-foreground'>
              {formatDate(internshipData.expiryDate)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Apply Button Section */}
      <div className='flex justify-between items-center'>
        {internshipData.isLoggedIn ? (
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

      {/* Apply Form Drawer */}
      <InternshipApplication
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        internshipData={internshipData}
      />
    </div>
  );
}

export default Detail;
