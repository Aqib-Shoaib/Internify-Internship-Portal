/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

function PostInternshipDrawer({
  setCreateDrawerOpen,
  createDrawerOpen,
  companyData,
  setInternships,
  internships,
  currentDate,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    expiryDate: "",
    duration: "",
  });
  const formRef = useRef(null);
  const handleCreate = () => {
    if (!formRef.current) return;

    const formData = {
      title: formRef.current.title.value,
      description: formRef.current.description.value,
      location: formRef.current.location.value,
      salary: parseFloat(formRef.current.salary.value),
      expiryDate: formRef.current.expiryDate.value,
      term: formRef.current.term.value,
      duration: parseInt(formRef.current.duration.value, 10),
      live: formRef.current.live.checked,
      sponsored: formRef.current.sponsored.checked,
      company: companyData._id,
    };

    const newErrors = {
      title: formData.title ? "" : "Title is required.",
      description: formData.description ? "" : "Description is required.",
      location: formData.location ? "" : "Location is required.",
      salary:
        formData.salary && formData.salary > 0
          ? ""
          : "Valid salary is required.",
      expiryDate: formData.expiryDate ? "" : "Expiry date is required.",
      duration:
        formData.duration && formData.duration > 0
          ? ""
          : "Valid duration is required.",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    setIsCreating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCreating(false);
          console.log("Create Internship:", {
            ...formData,
            slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
          });
          setCreateDrawerOpen(false);
          setErrors({
            title: "",
            description: "",
            location: "",
            salary: "",
            expiryDate: "",
            duration: "",
          });
          // Simulate adding to list
          setInternships([
            ...internships,
            {
              ...formData,
              _id: String(Date.now()),
              verified: false,
              applications: 0,
              live:
                formData.live && new Date(formData.expiryDate) > currentDate,
            },
          ]);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };
  return (
    <Drawer open={createDrawerOpen} onOpenChange={setCreateDrawerOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create Internship</DrawerTitle>
        </DrawerHeader>
        {isCreating ? (
          <div className='p-6 space-y-4'>
            <p className='text-muted-foreground'>Creating...</p>
            <Progress value={progress} />
          </div>
        ) : (
          <form
            ref={formRef}
            className='p-6 space-y-4 overflow-y-auto max-h-[80vh]'
          >
            <div>
              <label className='text-sm font-medium'>Title</label>
              <Input
                name='title'
                placeholder='e.g., Software Engineer Intern'
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className='text-sm text-red-500 mt-1'>{errors.title}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Description</label>
              <Textarea
                name='description'
                placeholder='e.g., Develop cutting-edge software...'
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className='text-sm text-red-500 mt-1'>
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Location</label>
              <Input
                name='location'
                placeholder='e.g., Remote'
                className={errors.location ? "border-red-500" : ""}
              />
              {errors.location && (
                <p className='text-sm text-red-500 mt-1'>{errors.location}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Salary ($/month)</label>
              <Input
                name='salary'
                type='number'
                placeholder='e.g., 2000'
                className={errors.salary ? "border-red-500" : ""}
              />
              {errors.salary && (
                <p className='text-sm text-red-500 mt-1'>{errors.salary}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Expiry Date</label>
              <Input
                name='expiryDate'
                type='date'
                min='2025-05-19'
                className={errors.expiryDate ? "border-red-500" : ""}
              />
              {errors.expiryDate && (
                <p className='text-sm text-red-500 mt-1'>{errors.expiryDate}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Term</label>
              <Select name='term' defaultValue='FULL-TIME'>
                <SelectTrigger>
                  <SelectValue placeholder='Select term' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='FULL-TIME'>Full-Time</SelectItem>
                  <SelectItem value='PART-TIME'>Part-Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className='text-sm font-medium'>Duration (months)</label>
              <Input
                name='duration'
                type='number'
                placeholder='e.g., 3'
                className={errors.duration ? "border-red-500" : ""}
              />
              {errors.duration && (
                <p className='text-sm text-red-500 mt-1'>{errors.duration}</p>
              )}
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox id='live' name='live' defaultChecked />
              <label htmlFor='live' className='text-sm font-medium'>
                Live
              </label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox id='sponsored' name='sponsored' />
              <label htmlFor='sponsored' className='text-sm font-medium'>
                Sponsored
              </label>
            </div>
          </form>
        )}
        <DrawerFooter>
          <div className='flex gap-1 items-center justify-end'>
            <Button
              variant='outline'
              onClick={() => {
                setCreateDrawerOpen(false);
                setErrors({
                  title: "",
                  description: "",
                  location: "",
                  salary: "",
                  expiryDate: "",
                  duration: "",
                });
                setIsCreating(false);
                setProgress(0);
                if (formRef.current) formRef.current.reset();
              }}
            >
              Cancel
            </Button>
            {!isCreating && <Button onClick={handleCreate}>Create</Button>}{" "}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default PostInternshipDrawer;
