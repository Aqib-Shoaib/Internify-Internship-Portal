/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

const ToggleLiveInternshipDrawer = ({
  open,
  onOpenChange,
  internship,
  onUpdate,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({ expiryDate: "" });
  const formRef = useRef(null);

  useEffect(() => {
    if (open && internship && formRef.current) {
      formRef.current.reset();
      setErrors({ expiryDate: "" });
    }
  }, [open, internship]);

  const handleUpdate = () => {
    if (!formRef.current) return;

    const formData = {
      _id: internship._id,
      live: formRef.current.live.checked,
      expiryDate: formRef.current.expiryDate.value || internship.expiryDate,
      title: internship.title,
      description: internship.description,
      location: internship.location,
      salary: internship.salary,
      term: internship.term,
      duration: internship.duration,
      sponsored: internship.sponsored,
      company: internship.company,
      verified: internship.verified,
      applications: internship.applications,
    };

    const newErrors = {
      expiryDate: formData.expiryDate ? "" : "Expiry date is required.",
    };
    setErrors(newErrors);

    if (newErrors.expiryDate) return;

    setIsUpdating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUpdating(false);
          console.log("Update Internship Live Status:", {
            _id: formData._id,
            live: formData.live,
            expiryDate: formData.expiryDate,
            slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
          });
          onUpdate(formData);
          onOpenChange(false);
          setErrors({ expiryDate: "" });
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Toggle Live Status</DrawerTitle>
        </DrawerHeader>
        {isUpdating ? (
          <div className='p-6 space-y-4'>
            <p className='text-muted-foreground'>Updating...</p>
            <Progress value={progress} />
          </div>
        ) : (
          <form
            ref={formRef}
            className='p-6 space-y-4 overflow-y-auto max-h-[80vh]'
          >
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='live'
                name='live'
                defaultChecked={internship?.live}
              />
              <label htmlFor='live' className='text-sm font-medium'>
                Live
              </label>
            </div>
            <div>
              <label className='text-sm font-medium'>Expiry Date</label>
              <Input
                name='expiryDate'
                type='date'
                defaultValue={
                  internship?.expiryDate
                    ? new Date(internship.expiryDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                min='2025-05-19'
                className={errors.expiryDate ? "border-red-500" : ""}
              />
              {errors.expiryDate && (
                <p className='text-sm text-red-500 mt-1'>{errors.expiryDate}</p>
              )}
            </div>
          </form>
        )}
        <DrawerFooter>
          <div className='flex gap-1 items-center justify-end'>
            <Button
              variant='outline'
              onClick={() => {
                onOpenChange(false);
                setErrors({ expiryDate: "" });
                setIsUpdating(false);
                setProgress(0);
                if (formRef.current) formRef.current.reset();
              }}
            >
              Cancel
            </Button>
            {!isUpdating && <Button onClick={handleUpdate}>Update</Button>}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ToggleLiveInternshipDrawer;
