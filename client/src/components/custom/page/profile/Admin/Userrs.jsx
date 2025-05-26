import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { getAllUsersForAdmin } from "@/services/admin";
import UsersTable from "./UsersTable";
import { AlertCircle } from "lucide-react";
import PaginationUsers from "./PaginationUsers";
import UserProfileDrawer from "./UserProfileDrawer";

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
      const res = await getAllUsersForAdmin();
      if (res.status === 200 || res.status === 304) {
        setUsers(res.data);
      }
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
        (!filters.role || user?.role === filters.role) &&
        (!filters.status ||
          (filters.status === "verified" ? user?.verified : !user?.verified))
      );
    });
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
          <UsersTable
            sort={sort}
            setSort={setSort}
            paginatedUsers={paginatedUsers}
            setSelectedUser={setSelectedUser}
            setDrawerOpen={setDrawerOpen}
            handleAction={handleAction}
            setUserToDelete={setUserToDelete}
            setShowDeleteConfirm={setShowDeleteConfirm}
          />
          <PaginationUsers
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <Card>
          <CardContent>
            <p className='text-muted-foreground'>No users found.</p>
          </CardContent>
        </Card>
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

      <UserProfileDrawer
        drawerOpen={drawerOpen}
        selectedUser={selectedUser}
        setDrawerOpen={setDrawerOpen}
      />
    </div>
  );
};

export default AdminUsersTab;
