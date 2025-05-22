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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import { user as adminData } from "@/dummy/user";
import { Card, CardContent } from "@/components/ui/card";

const AdminUsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({ role: "", status: "" });
  const [sort, setSort] = useState({ column: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      const mockData = [
        {
          _id: "user1",
          name: "Aqib Shoaib",
          email: "aqib@example.com",
          role: "INTERN",
          verified: true,
          active: true,
          createdAt: "2025-01-01T09:00:00.000Z",
          resume: "/resumes/aqib.pdf",
        },
        {
          _id: "user2",
          name: "Tech Corp",
          email: "techcorp@example.com",
          role: "COMPANY",
          verified: false,
          active: true,
          createdAt: "2025-02-01T10:00:00.000Z",
        },
        {
          _id: "user3",
          name: "Admin User",
          email: "admin@example.com",
          role: "ADMIN",
          verified: true,
          active: true,
          createdAt: "2025-03-01T11:00:00.000Z",
        },
      ];
      setUsers(mockData);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const applyFilters = (users) => {
    return users.filter((user) => {
      return (
        (!filters.role || user.role === filters.role) &&
        (!filters.status ||
          (filters.status === "verified" ? user.verified : !user.verified))
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

  const sortUsers = (users) => {
    return [...users].sort((a, b) => {
      const aValue = a[sort.column];
      const bValue = b[sort.column];
      const direction = sort.direction === "asc" ? 1 : -1;
      return aValue > bValue ? direction : -direction;
    });
  };

  const handleAction = (e, userId, action) => {
    e.stopPropagation();
    setIsUpdating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUpdating(false);
          let updatedUsers = [...users];
          if (action === "delete") {
            updatedUsers = updatedUsers.filter((u) => u._id !== userId);
            console.log("Delete User:", { _id: userId });
            setShowDeleteConfirm(false);
            setUserToDelete(null);
          } else {
            updatedUsers = updatedUsers.map((u) =>
              u._id === userId
                ? {
                    ...u,
                    verified:
                      action === "verify"
                        ? true
                        : action === "unverify"
                        ? false
                        : u.verified,
                    active:
                      action === "activate"
                        ? true
                        : action === "deactivate"
                        ? false
                        : u.active,
                  }
                : u
            );
            console.log(`Action ${action} on User:`, { _id: userId });
          }
          setUsers(updatedUsers);
          if (selectedUser?._id === userId) {
            setSelectedUser(updatedUsers.find((u) => u._id === userId) || null);
          }
          return 0;
        }
        return prev + 10;
      });
    }, 200);

    if (action === "viewApplications" || action === "viewInternships") {
      clearInterval(interval);
      setIsUpdating(false);
      console.log(`View ${action} for User:`, { _id: userId });
    }
  };

  const filteredUsers = applyFilters(users);
  const sortedUsers = sortUsers(filteredUsers);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  if (loading) {
    return <div className='p-0 md:p-6'>Loading...</div>;
  }

  return (
    <div className='p-0 md:p-6'>
      <h1 className='text-xl md:text-2xl font-bold mb-4 md:mb-6'>Users</h1>
      <div className='flex flex-col md:flex-row gap-2 md:gap-4 mb-6'>
        <Select
          value={filters.role}
          onValueChange={(value) => handleFilterChange("role", value)}
        >
          <SelectTrigger className='w-full md:w-1/4'>
            <SelectValue placeholder='Filter by role' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Roles</SelectItem>
            <SelectItem value='INTERN'>Intern</SelectItem>
            <SelectItem value='COMPANY'>Company</SelectItem>
            <SelectItem value='ADMIN'>Admin</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <SelectTrigger className='w-full md:w-1/4'>
            <SelectValue placeholder='Filter by status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Statuses</SelectItem>
            <SelectItem value='verified'>Verified</SelectItem>
            <SelectItem value='unverified'>Unverified</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            setFilters({ role: "", status: "" });
            setCurrentPage(1);
          }}
          variant='outline'
        >
          Clear Filters
        </Button>
      </div>
      {isUpdating && (
        <div className='mb-4'>
          <p className='text-muted-foreground'>Updating...</p>
          <Progress value={progress} />
        </div>
      )}
      {paginatedUsers.length > 0 ? (
        <>
          <Card>
            <CardContent>
              <Table className='w-full md:w-3/5 mx-auto'>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className='cursor-pointer'
                      onClick={() => handleSort("name")}
                    >
                      Name{" "}
                      {sort.column === "name" &&
                        (sort.direction === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead
                      className='cursor-pointer'
                      onClick={() => handleSort("email")}
                    >
                      Email{" "}
                      {sort.column === "email" &&
                        (sort.direction === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow
                      key={user._id}
                      className='cursor-pointer'
                      onClick={(e) => {
                        if (e.target.closest(".actions")) return;
                        setSelectedUser(user);
                        setDrawerOpen(true);
                      }}
                    >
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.verified ? "success" : "secondary"}
                        >
                          {user.verified ? "Verified" : "Unverified"}
                        </Badge>
                      </TableCell>
                      <TableCell className='actions'>
                        <DropdownMenu>
                          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {user.active ? (
                              <DropdownMenuItem
                                onClick={(e) =>
                                  handleAction(e, user._id, "deactivate")
                                }
                                disabled={user._id === adminData._id}
                              >
                                <XCircle className='mr-2 h-4 w-4' />
                                Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={(e) =>
                                  handleAction(e, e, user._id, "activate")
                                }
                                disabled={user._id === adminData._id}
                              >
                                <CheckCircle2 className='mr-2 h-4 w-4' />
                                Activate
                              </DropdownMenuItem>
                            )}
                            {user.role === "COMPANY" && (
                              <>
                                {user.verified ? (
                                  <DropdownMenuItem
                                    onClick={(e) =>
                                      handleAction(e, user._id, "unverify")
                                    }
                                  >
                                    <XCircle className='mr-2 h-4 w-4' />
                                    Unverify
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem
                                    onClick={(e) =>
                                      handleAction(e, user._id, "verify")
                                    }
                                  >
                                    <CheckCircle2 className='mr-2 h-4 w-4' />
                                    Verify
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={(e) =>
                                    handleAction(e, user._id, "viewInternships")
                                  }
                                >
                                  <Briefcase className='mr-2 h-4 w-4' />
                                  View Internships
                                </DropdownMenuItem>
                              </>
                            )}
                            {user.role === "INTERN" && (
                              <DropdownMenuItem
                                onClick={(e) =>
                                  handleAction(e, user._id, "viewApplications")
                                }
                              >
                                <Eye className='mr-2 h-4 w-4' />
                                View Applications
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => {
                                setUserToDelete(user);
                                setShowDeleteConfirm(true);
                              }}
                              disabled={user._id === adminData._id}
                            >
                              <Trash2 className='mr-2 h-4 w-4' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Pagination className='mt-4'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <p className='text-muted-foreground'>No users found.</p>
      )}
      {showDeleteConfirm && (
        <Alert variant='destructive' className='mt-4'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Confirm Delete</AlertTitle>
          <AlertDescription>
            Are you sure you want to delete {userToDelete?.name}? This action is
            irreversible.
            <div className='flex gap-2 mt-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setUserToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant='destructive'
                size='sm'
                onClick={() => handleAction(userToDelete._id, "delete")}
              >
                Delete
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>User Details</DrawerTitle>
          </DrawerHeader>
          {selectedUser && (
            <div className='p-6 space-y-6'>
              <div>
                <h3 className='text-lg font-semibold'>General Information</h3>
                <div className='mt-2 space-y-2'>
                  <p>
                    <strong>Name:</strong> {selectedUser.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedUser.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {selectedUser.role}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <Badge
                      variant={selectedUser.verified ? "success" : "secondary"}
                    >
                      {selectedUser.verified ? "Verified" : "Unverified"}
                    </Badge>
                  </p>
                  <p>
                    <strong>Active:</strong>{" "}
                    <Badge
                      variant={selectedUser.active ? "success" : "secondary"}
                    >
                      {selectedUser.active ? "Active" : "Inactive"}
                    </Badge>
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(selectedUser.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {selectedUser.role === "INTERN" && (
                <div>
                  <h3 className='text-lg font-semibold'>Intern Details</h3>
                  <div className='mt-2 space-y-2'>
                    <p>
                      <strong>Applications Submitted:</strong> 3
                    </p>
                    <p>
                      <strong>Resume:</strong>{" "}
                      {selectedUser.resume ? (
                        <a
                          href={selectedUser.resume}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-600 hover:underline'
                        >
                          View Resume
                        </a>
                      ) : (
                        "None"
                      )}
                    </p>
                  </div>
                </div>
              )}
              {selectedUser.role === "COMPANY" && (
                <div>
                  <h3 className='text-lg font-semibold'>Company Details</h3>
                  <div className='mt-2 space-y-2'>
                    <p>
                      <strong>Internships Posted:</strong> 5
                    </p>
                    <p>
                      <strong>Verification Status:</strong>{" "}
                      <Badge
                        variant={
                          selectedUser.verified ? "success" : "secondary"
                        }
                      >
                        {selectedUser.verified ? "Verified" : "Unverified"}
                      </Badge>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AdminUsersTab;
