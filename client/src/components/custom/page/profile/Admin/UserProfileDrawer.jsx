/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CircleX } from "lucide-react";

function UserProfileDrawer({ selectedUser, drawerOpen, setDrawerOpen }) {
  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <div className='flex items-center justify-between'>
              <h1>User Details</h1>
              <span
                className='text-muted-foreground hover:text-primary cursor-pointer'
                onClick={() => setDrawerOpen(false)}
              >
                <CircleX />
              </span>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        {selectedUser && (
          <div className='p-6 space-y-6'>
            <div>
              <h3 className='text-lg font-semibold'>General Information</h3>
              <div className='mt-2 space-y-2'>
                <p>
                  <strong>Name:</strong> {selectedUser?.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser?.email}
                </p>
                <p>
                  <strong>Role:</strong> {selectedUser?.role}
                </p>
                <p>
                  <strong>Active:</strong>{" "}
                  <Badge
                    variant={selectedUser?.isActive ? "success" : "secondary"}
                  >
                    {selectedUser?.isActive ? "Active" : "Inactive"}
                  </Badge>
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedUser?.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            {selectedUser?.role === "INTERN" && (
              <div>
                <h3 className='text-lg font-semibold'>Intern Details</h3>
                <div className='mt-2 space-y-2'>
                  <p>
                    <strong>Applications Submitted:</strong> 3
                  </p>
                  <p className='flex gap-2 items-center'>
                    <strong>Resume:</strong>
                    {selectedUser?.resume.map((res, idx) => (
                      <a
                        key={idx}
                        href={res?.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:underline block'
                      >
                        Resume {idx + 1}
                      </a>
                    ))}
                  </p>
                </div>
              </div>
            )}
            {selectedUser?.role === "COMPANY" && (
              <div>
                <h3 className='text-lg font-semibold'>Company Details</h3>
                <div className='mt-2 space-y-2'>
                  <p>
                    <strong>Internships Posted:</strong> 5
                  </p>
                  <p>
                    <strong>Verification Status:</strong>{" "}
                    <Badge
                      variant={selectedUser?.verified ? "success" : "secondary"}
                    >
                      {selectedUser?.verified ? "Verified" : "Unverified"}
                    </Badge>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default UserProfileDrawer;
