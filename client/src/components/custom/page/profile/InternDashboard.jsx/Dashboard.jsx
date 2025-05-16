import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { applications } from "@/dummy/applications";

const Dashboard = () => {
  // Profile completion (hardcoded)
  const profileCompletion = 75;

  // Calculate stats
  const totalApplications = applications.length;
  const internshipsSecured = applications.filter(
    (app) => app.status === "accepted"
  ).length;
  const rejections = applications.filter(
    (app) => app.status === "rejected"
  ).length;
  const successRate = totalApplications
    ? ((internshipsSecured / totalApplications) * 100).toFixed(0)
    : 0;

  // Table sorting state
  const [sortOrder, setSortOrder] = useState("desc");

  // Sort applications by appliedAt
  const sortedApplications = [...applications].sort((a, b) => {
    const dateA = new Date(a.appliedAt);
    const dateB = new Date(b.appliedAt);
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

  // Status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "destructive";
      case "shortlisted":
        return "default";
      case "pending":
      default:
        return "secondary";
    }
  };

  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        {/* Profile Completion Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={profileCompletion} className='mb-2' />
            <p className='text-sm text-muted-foreground'>
              {profileCompletion}% Complete your profile to stand out!
            </p>
          </CardContent>
        </Card>

        {/* Quick Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-2xl font-bold'>{totalApplications}</p>
                <p className='text-sm text-muted-foreground'>
                  Total Applications
                </p>
              </div>
              <div>
                <p className='text-2xl font-bold'>{internshipsSecured}</p>
                <p className='text-sm text-muted-foreground'>
                  Internships Secured
                </p>
              </div>
              <div>
                <p className='text-2xl font-bold'>{rejections}</p>
                <p className='text-sm text-muted-foreground'>Rejections</p>
              </div>
              <div>
                <p className='text-2xl font-bold'>{successRate}%</p>
                <p className='text-sm text-muted-foreground'>Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='cursor-pointer' onClick={handleSort}>
                  Date Applied {sortOrder === "desc" ? "↓" : "↑"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedApplications.map((app, index) => (
                <TableRow key={index}>
                  <TableCell>{app.internship.title}</TableCell>
                  <TableCell>{app.internship.company.name}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(app.status)}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(app.appliedAt)}</TableCell>
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
