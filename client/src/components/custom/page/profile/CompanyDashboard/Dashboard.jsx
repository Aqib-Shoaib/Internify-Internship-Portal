import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { internships } from "@/dummy/latestInternships";
import { user } from "@/dummy/user";

const Dashboard = () => {
  // Calculate stats
  const totalPostings = internships.length;
  const totalApplications = internships.reduce(
    (sum, job) => sum + job.applications,
    0
  );
  const openPositions = internships.filter(
    (job) => job.live && new Date(job.expiryDate) > new Date()
  ).length;

  // Table sorting state
  const [sortOrder, setSortOrder] = useState("desc");

  // Sort job postings by createdAt
  const sortedPostings = [...internships].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  // Toggle sort order
  const handleSort = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Status logic
  const getStatus = (job) => {
    return job.live && new Date(job.expiryDate) > new Date()
      ? "Open"
      : "Closed";
  };

  // Status badge variant
  const getStatusVariant = (status) => {
    return status === "Open" ? "success" : "destructive";
  };

  return (
    <div className='p-0 md:p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        {/* Company Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className='hidden md:block'>Company Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center space-x-4'>
              <img
                src={user.profileImage}
                alt='Company Logo'
                className='w-10 h-10 rounded-full object-cover'
              />
              <div>
                <h3 className='text-base md:text-lg font-semibold'>
                  {user.name}
                </h3>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  {user.industry}
                </p>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  {user.location}
                </p>
                <Badge variant={user.verified ? "success" : "secondary"}>
                  {user.verified ? "Verified" : "Pending"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Applications Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-3 gap-4'>
              <div>
                <p className='text-2xl font-bold'>{totalPostings}</p>
                <p className='text-sm text-muted-foreground'>
                  Total Job Postings
                </p>
              </div>
              <div>
                <p className='text-2xl font-bold'>{totalApplications}</p>
                <p className='text-sm text-muted-foreground'>
                  Applications Received
                </p>
              </div>
              <div>
                <p className='text-2xl font-bold'>{openPositions}</p>
                <p className='text-sm text-muted-foreground'>Open Positions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Postings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Job Postings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead className='cursor-pointer' onClick={handleSort}>
                  Posted Date {sortOrder === "desc" ? "↓" : "↑"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPostings.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(getStatus(job))}>
                      {getStatus(job)}
                    </Badge>
                  </TableCell>
                  <TableCell>{job.applications}</TableCell>
                  <TableCell>{formatDate(job.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
