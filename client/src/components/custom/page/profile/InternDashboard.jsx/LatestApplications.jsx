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
import { getLatestApplications } from "@/services/intern";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

function LatestApplications() {
  const [latestApplications, setLatestApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(function () {
    setLoading(true);
    const fetchLatestApplications = async () => {
      const data = await getLatestApplications();
      setLatestApplications(data);
    };
    fetchLatestApplications();
    setLoading(false);
  }, []);

  // Sort applications by appliedAt
  const sortedApplications = [...latestApplications].sort((a, b) => {
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
    <Card data-aos='zoom-in'>
      <CardHeader>
        <CardTitle>Latest Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Loader2 className='h-6 w-6 animate-spin text-gray-900' />
        ) : (
          <>
            {sortedApplications.length !== 0 ? (
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
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(app.appliedAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <CardContent>
                No Applications found. Start Applying right away!
              </CardContent>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default LatestApplications;
