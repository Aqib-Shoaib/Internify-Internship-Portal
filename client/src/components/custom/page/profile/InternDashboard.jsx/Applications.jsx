import { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, XCircle } from "lucide-react";
import { applications } from "@/dummy/applications";

const Applications = () => {
  const [sortKey, setSortKey] = useState("appliedAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Sort applications
  const sortedApplications = [...applications].sort((a, b) => {
    if (sortKey === "appliedAt") {
      const dateA = new Date(a.appliedAt);
      const dateB = new Date(b.appliedAt);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    } else if (sortKey === "status") {
      return sortOrder === "desc"
        ? b.status.localeCompare(a.status)
        : a.status.localeCompare(b.status);
    }
    return 0;
  });

  // Handle sort selection
  const handleSort = (key, order) => {
    setSortKey(key);
    setSortOrder(order);
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
    <div className='p-0 md:p-6'>
      {/* Heading */}
      <h1 className='text-xl md:text-2xl font-bold mb-2'>My Applications</h1>

      {/* Paragraph */}
      <p className='text-xs md:text-sm text-muted-foreground mb-6'>
        View all your internship applications and their current status. Click
        the internship link to learn more or track your progress.
      </p>

      {/* Sorting Options */}
      <div className='flex justify-center md:justify-end mb-4'>
        <DropdownMenu>
          <DropdownMenuTrigger>Sort By</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleSort("appliedAt", "desc")}>
              Date Applied (Newest First)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("appliedAt", "asc")}>
              Date Applied (Oldest First)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("status", "asc")}>
              Status (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("status", "desc")}>
              Status (Z-A)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reviewed</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Internship Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedApplications.map((app) => (
                <TableRow key={app.internship._id}>
                  <TableCell>{app.internship.title}</TableCell>
                  <TableCell>{app.internship.company.name}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(app.status)}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {app.reviewed ? (
                      <CheckCircle className='h-5 w-5 text-green-500' />
                    ) : (
                      <XCircle className='h-5 w-5 text-red-500' />
                    )}
                  </TableCell>
                  <TableCell>{formatDate(app.appliedAt)}</TableCell>
                  <TableCell>
                    <a
                      href={app.internshipLink}
                      className='text-blue-600 hover:underline'
                    >
                      View Internship
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Applications;
