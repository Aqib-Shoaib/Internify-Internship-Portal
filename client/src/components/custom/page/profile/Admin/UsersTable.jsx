/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Trash2, XCircle } from "lucide-react";
import { useSelector } from "react-redux";

function UsersTable({
  setSort,
  sort,
  paginatedUsers,
  setSelectedUser,
  setDrawerOpen,
  handleAction,
  setUserToDelete,
  setShowDeleteConfirm,
}) {
  const { user: adminData } = useSelector((state) => state.user);
  const handleSort = (column) => {
    setSort((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };
  return (
    <Card data-aos='zoom-in'>
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
                key={user?._id}
                className='cursor-pointer'
                onClick={(e) => {
                  if (e.target.closest(".actions")) return;
                  setSelectedUser(user);
                  setDrawerOpen(true);
                }}
              >
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user?.role !== "COMPANY"
                        ? "outline"
                        : user?.verified
                        ? "success"
                        : "secondary"
                    }
                  >
                    {user?.role !== "COMPANY"
                      ? "Not Needed"
                      : user?.verified
                      ? "Verified"
                      : "Unverified"}
                  </Badge>
                </TableCell>
                <TableCell className='actions'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {user?.isActive ? (
                        <DropdownMenuItem
                          onClick={(e) =>
                            handleAction(e, user?._id, "deactivate")
                          }
                          disabled={user?._id === adminData._id}
                        >
                          <XCircle className='mr-2 h-4 w-4' />
                          Deactivate
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={(e) =>
                            handleAction(e, e, user?._id, "activate")
                          }
                          disabled={user?._id === adminData._id}
                        >
                          <CheckCircle2 className='mr-2 h-4 w-4' />
                          Activate
                        </DropdownMenuItem>
                      )}
                      {user?.role === "COMPANY" && (
                        <>
                          {user?.verified ? (
                            <DropdownMenuItem
                              onClick={(e) =>
                                handleAction(e, user?._id, "unverify")
                              }
                            >
                              <XCircle className='mr-2 h-4 w-4' />
                              Unverify
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={(e) =>
                                handleAction(e, user?._id, "verify")
                              }
                            >
                              <CheckCircle2 className='mr-2 h-4 w-4' />
                              Verify
                            </DropdownMenuItem>
                          )}
                        </>
                      )}

                      <DropdownMenuItem
                        onClick={() => {
                          setUserToDelete(user);
                          setShowDeleteConfirm(true);
                        }}
                        disabled={user?._id === adminData._id}
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
  );
}

export default UsersTable;
