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
import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Eye, CheckCircle2, Circle } from "lucide-react";
import UpdateStatusDrawer from "./UpdateStatusDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCandidates } from "@/services/company";
import { useSelector } from "react-redux";

const CompanyCandidatesTab = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    dateStart: "",
    dateEnd: "",
  });
  const [sort, setSort] = useState({ column: "appliedAt", direction: "desc" });
  const { user: companyData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await getAllCandidates();
      if (res.status === 200 || res.status === 304) {
        setApplications(res.data.applications);
      }
      setLoading(false);
    };
    fetchApplications();
  }, []);
  console.log(applications);

  useEffect(() => {
    if (drawerOpen && selectedApplication && !selectedApplication.reviewed) {
      const updatedApplication = { ...selectedApplication, reviewed: true };
      setApplications(
        applications?.map((app) =>
          app._id === selectedApplication._id ? updatedApplication : app
        )
      );
      setSelectedApplication(updatedApplication);
      console.log("Mark Application Reviewed:", {
        _id: selectedApplication._id,
        reviewed: true,
      });
    }
  }, [applications, drawerOpen, selectedApplication]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = (apps) => {
    return apps.filter((app) => {
      const appliedAt = new Date(app.appliedAt);
      const dateStart = filters.dateStart ? new Date(filters.dateStart) : null;
      const dateEnd = filters.dateEnd ? new Date(filters.dateEnd) : null;
      return (
        (!filters.status || app.status === filters.status) &&
        (!dateStart || appliedAt >= dateStart) &&
        (!dateEnd || appliedAt <= dateEnd)
      );
    });
  };

  const handleSort = (column) => {
    setSort((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortApplications = (apps) => {
    return [...apps].sort((a, b) => {
      const aValue = sort.column === "name" ? a.intern.name : a.appliedAt;
      const bValue = sort.column === "name" ? b.intern.name : b.appliedAt;
      const direction = sort.direction === "asc" ? 1 : -1;
      return aValue > bValue ? direction : -direction;
    });
  };

  const filteredApplications = applyFilters(applications);
  const sortedApplications = sortApplications(filteredApplications);

  if (!companyData.verified) {
    return (
      <Card data-aos='zoom-in'>
        <CardContent className='p-0 md:p-6'>
          <h1 className='text-xl md:text-2xl font-bold mb-6'>Candidates</h1>
          <p className='text-muted-foreground'>
            Please verify your account to view applications.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return <div className='p-0 md:p-6'>Loading...</div>;
  }

  return (
    <div className='p-0 md:p-6'>
      <h1 className='text-xl md:text-2xl font-bold mb-4 md:mb-6'>Candidates</h1>
      <div className='flex flex-col md:flex-row gap-2 md:gap-4 mb-6'>
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <SelectTrigger className='w-full md:w-1/4'>
            <SelectValue placeholder='Filter by status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Statuses</SelectItem>
            <SelectItem value='pending'>Pending</SelectItem>
            <SelectItem value='shortlisted'>Shortlisted</SelectItem>
            <SelectItem value='accepted'>Accepted</SelectItem>
            <SelectItem value='rejected'>Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type='date'
          placeholder='Start Date'
          value={filters.dateStart}
          onChange={(e) => handleFilterChange("dateStart", e.target.value)}
          className='w-full md:w-1/4'
        />
        <Input
          type='date'
          placeholder='End Date'
          value={filters.dateEnd}
          onChange={(e) => handleFilterChange("dateEnd", e.target.value)}
          className='w-full md:w-1/4'
        />
        <div className='flex gap-2'>
          <Button
            onClick={() =>
              setFilters({ status: "", dateStart: "", dateEnd: "" })
            }
            variant='outline'
          >
            Clear Filters
          </Button>
        </div>
      </div>
      <Card data-aos='zoom-in'>
        {sortedApplications.length > 0 ? (
          <CardContent>
            <Table className='w-full md:w-3/5 mx-auto'>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead
                    className='cursor-pointer'
                    onClick={() => handleSort("name")}
                  >
                    Name{" "}
                    {sort.column === "name" &&
                      (sort.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Internship</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead
                    className='cursor-pointer'
                    onClick={() => handleSort("appliedAt")}
                  >
                    Applied At{" "}
                    {sort.column === "appliedAt" &&
                      (sort.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead>Reviewed</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedApplications.map((app) => (
                  <TableRow
                    key={app._id}
                    className='cursor-pointer'
                    onClick={(e) => {
                      if (e.target.closest(".actions")) return;
                      setSelectedApplication(app);
                      setDrawerOpen(true);
                    }}
                  >
                    <TableCell>
                      {app?.intern?.profileImage ? (
                        <img
                          src={app?.intern?.profileImage || "/user.png"}
                          alt={app?.intern?.name}
                          className='w-10 h-10 rounded-full'
                        />
                      ) : (
                        <div className='w-10 h-10 rounded-full bg-blue-500/50 flex items-center justify-center text-white'>
                          {app?.intern?.name?.charAt(0)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{app?.intern?.name}</TableCell>
                    <TableCell>{app?.intern?.mail}</TableCell>
                    <TableCell>{app?.internship?.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          app?.status === "accepted"
                            ? "success"
                            : app?.status === "shortlisted"
                            ? "warning"
                            : app?.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {app?.status.charAt(0).toUpperCase() +
                          app?.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(app?.appliedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {app?.reviewed ? (
                        <CheckCircle2 className='h-5 w-5 text-green-500' />
                      ) : (
                        <Circle className='h-5 w-5 text-gray-400' />
                      )}
                    </TableCell>
                    <TableCell className='actions'>
                      <div className='flex items-center space-x-2'>
                        <Star
                          className={`h-5 w-5 ${
                            app.status === "shortlisted"
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setSelectedApplication(app);
                            setDrawerOpen(true);
                          }}
                        >
                          <Eye className='h-4 w-4 mr-1' /> View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        ) : (
          <CardContent>
            <p className='text-muted-foreground'>No applications found.</p>
          </CardContent>
        )}
      </Card>

      {/* update status drawer */}
      <UpdateStatusDrawer
        applications={applications}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        selectedApplication={selectedApplication}
        setApplications={setApplications}
        setSelectedApplication={setSelectedApplication}
      />
    </div>
  );
};

export default CompanyCandidatesTab;
