/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function UpdateStatusDrawer({
  drawerOpen,
  setDrawerOpen,
  selectedApplication,
  setApplications,
  setSelectedApplication,
  applications,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const formRef = useRef(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStatusChange = (newStatus) => {
    const updatedApplication = {
      ...selectedApplication,
      status: newStatus,
    };

    setIsUpdating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUpdating(false);
          console.log("Update Application Status:", {
            _id: updatedApplication._id,
            status: newStatus,
          });
          setApplications(
            applications.map((app) =>
              app._id === updatedApplication._id ? updatedApplication : app
            )
          );
          setSelectedApplication(updatedApplication);
          setDrawerOpen(false);
          setShowConfirm(false);
          setPendingStatus(null);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleConfirm = () => {
    if (pendingStatus) {
      handleStatusChange(pendingStatus);
    }
  };

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Application Details</DrawerTitle>
        </DrawerHeader>
        {isUpdating ? (
          <div className='p-6 space-y-4'>
            <p className='text-muted-foreground'>Updating...</p>
            <Progress value={progress} />
          </div>
        ) : (
          selectedApplication && (
            <>
              <form
                ref={formRef}
                className='p-6 space-y-6 overflow-y-auto max-h-[80vh]'
              >
                <div>
                  <h3 className='text-lg font-semibold'>Intern</h3>
                  <div className='flex items-center space-x-4 mt-2'>
                    {selectedApplication.intern.profileImage ? (
                      <img
                        src={selectedApplication.intern.profileImage}
                        alt={selectedApplication.intern.name}
                        className='w-12 h-12 rounded-full'
                      />
                    ) : (
                      <div className='w-12 h-12 rounded-full bg-blue-500/50 flex items-center justify-center text-white'>
                        {selectedApplication.intern.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p>{selectedApplication.intern.name}</p>
                      <p className='text-muted-foreground'>
                        {selectedApplication.intern.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold'>Internship</h3>
                  <p>Title: {selectedApplication.internship.title}</p>
                  <p>Location: {selectedApplication.internship.location}</p>
                  <p>Term: {selectedApplication.internship.term}</p>
                </div>
                <div>
                  <h3 className='text-lg font-semibold'>Application</h3>
                  <div className='space-y-4 mt-2'>
                    <div>
                      <label className='text-sm font-medium'>
                        Cover Letter
                      </label>
                      <Textarea
                        value={
                          selectedApplication.coverLetter ||
                          "No cover letter provided."
                        }
                        readOnly
                        className='mt-1'
                      />
                    </div>
                    <div>
                      <label className='text-sm font-medium'>Status</label>
                      <Badge
                        variant={
                          selectedApplication.status === "accepted"
                            ? "success"
                            : selectedApplication.status === "shortlisted"
                            ? "warning"
                            : selectedApplication.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                        className='mt-1'
                      >
                        {selectedApplication.status.charAt(0).toUpperCase() +
                          selectedApplication.status.slice(1)}
                      </Badge>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='reviewed'
                        name='reviewed'
                        checked={selectedApplication.reviewed}
                        disabled
                      />
                      <label htmlFor='reviewed' className='text-sm font-medium'>
                        Reviewed
                      </label>
                    </div>
                    <div>
                      <label className='text-sm font-medium'>Applied At</label>
                      <p className='mt-1'>
                        {new Date(
                          selectedApplication.appliedAt
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className='text-sm font-medium'>Resume</label>
                      <div className='mt-1'>
                        <Button variant='outline' asChild>
                          <a
                            href={selectedApplication.resumeLink}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            View Resume
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              {showConfirm && (
                <Alert variant='warning' className='mx-6 mb-4'>
                  <AlertCircle className='h-4 w-4' />
                  <AlertTitle>Confirm Action</AlertTitle>
                  <AlertDescription>
                    This action is irreversible. Confirm?
                    <div className='flex gap-2 mt-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          setShowConfirm(false);
                          setPendingStatus(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant='default'
                        size='sm'
                        onClick={handleConfirm}
                      >
                        Confirm
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </>
          )
        )}
        <DrawerFooter>
          <div className='flex gap-1 items-center justify-end'>
            <Button
              variant='outline'
              onClick={() => {
                setDrawerOpen(false);
                setIsUpdating(false);
                setProgress(0);
                setShowConfirm(false);
                setPendingStatus(null);
                if (formRef.current) formRef.current.reset();
              }}
            >
              Cancel
            </Button>
            {!isUpdating && (
              <>
                <Button
                  variant='outline'
                  onClick={() => {
                    const newStatus =
                      selectedApplication.status === "shortlisted"
                        ? "pending"
                        : "shortlisted";
                    handleStatusChange(newStatus);
                  }}
                  disabled={
                    selectedApplication?.status === "accepted" ||
                    selectedApplication?.status === "rejected"
                  }
                >
                  {selectedApplication?.status === "shortlisted"
                    ? "Remove Shortlist"
                    : "Shortlist"}
                </Button>
                <Button
                  variant='outline'
                  className='text-green-600 border-green-600 hover:bg-green-50'
                  onClick={() => {
                    setShowConfirm(true);
                    setPendingStatus("accepted");
                  }}
                  disabled={
                    selectedApplication?.status === "accepted" ||
                    selectedApplication?.status === "rejected"
                  }
                >
                  Hire
                </Button>
                <Button
                  variant='outline'
                  className='text-red-600 border-red-600 hover:bg-red-50'
                  onClick={() => {
                    setShowConfirm(true);
                    setPendingStatus("rejected");
                  }}
                  disabled={
                    selectedApplication?.status === "accepted" ||
                    selectedApplication?.status === "rejected"
                  }
                >
                  Decline
                </Button>
              </>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default UpdateStatusDrawer;
