import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getLatestJobPostings } from "@/services/company";

function LatestJobPostings() {
  const [internships, setinternships] = useState([]);

  useEffect(function () {
    const getinternships = async () => {
      const data = await getLatestJobPostings();
      if (data.status === 200) {
        setinternships(data.data);
      }
    };
    getinternships();
  }, []);

  // Table sorting state
  const [sortOrder, setSortOrder] = useState("desc");

  // Sort job postings by createdAt
  const sortedPostings = [...internships].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

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
    <Card data-aos='zoom-in'>
      <CardHeader>
        <CardTitle>Lates Internship Postings</CardTitle>
      </CardHeader>

      {sortedPostings.length === 0 ? (
        <CardContent>
          <p>No Internships Posted yet!</p>
        </CardContent>
      ) : (
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
      )}
    </Card>
  );
}

export default LatestJobPostings;
