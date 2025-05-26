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
import { createInternship } from "@/services/company";
import { useState } from "react";

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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    expiryDate: "",
    term: "FULL-TIME",
    duration: "",
    live: true,
    sponsored: false,
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    expiryDate: "",
    duration: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target ?? {};
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTermChange = (value) => {
    setFormData((prev) => ({ ...prev, term: value }));
  };

  const handleCreate = () => {
    const newErrors = {
      title: formData?.title ? "" : "Title is required.",
      description: formData?.description ? "" : "Description is required.",
      location: formData?.location ? "" : "Location is required.",
      salary:
        formData?.salary && parseFloat(formData?.salary) > 0
          ? ""
          : "Valid salary is required.",
      expiryDate: formData?.expiryDate ? "" : "Expiry date is required.",
      duration:
        formData?.duration && parseInt(formData?.duration, 10) > 0
          ? ""
          : "Valid duration is required.",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    setIsCreating(true);
    setProgress(0);

    const interval = setInterval(() =>
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCreating(false);

          createInternship(formData);
          setCreateDrawerOpen?.(false);
          setErrors({
            title: "",
            description: "",
            location: "",
            salary: "",
            expiryDate: "",
            duration: "",
          });
          setFormData({
            title: "",
            description: "",
            location: "",
            salary: "",
            expiryDate: "",
            term: "FULL-TIME",
            duration: "",
            live: true,
            sponsored: false,
          });
          setInternships?.([
            ...(internships ?? []),
            {
              ...formData,
              _id: String(Date.now()),
              verified: false,
              applications: 0,
              live:
                formData?.live &&
                new Date(formData?.expiryDate) > (currentDate ?? new Date()),
              company: companyData?._id,
            },
          ]);
          return 0;
        }
        return prev + 10;
      }, 0)
    );
  };

  const handleCancel = () => {
    setCreateDrawerOpen?.(false);
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
    setFormData({
      title: "",
      description: "",
      location: "",
      salary: "",
      expiryDate: "",
      term: "FULL-TIME",
      duration: "",
      live: true,
      sponsored: false,
    });
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
          <form className='p-6 space-y-4 overflow-y-auto max-h-[80vh]'>
            <div>
              <label className='text-sm font-medium'>Title</label>
              <Input
                name='title'
                value={formData?.title}
                onChange={handleInputChange}
                placeholder='e.g., Software Engineer Intern'
                className={errors?.title ? "border-red-500" : ""}
              />
              {errors?.title && (
                <p className='text-sm text-red-500 mt-1'>{errors.title}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Description</label>
              <Textarea
                name='description'
                value={formData?.description}
                onChange={handleInputChange}
                placeholder='e.g., Develop cutting-edge software...'
                className={errors?.description ? "border-red-500" : ""}
              />
              {errors?.description && (
                <p className='text-sm text-red-500 mt-1'>
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Location</label>
              <Input
                name='location'
                value={formData?.location}
                onChange={handleInputChange}
                placeholder='e.g., Remote'
                className={errors?.location ? "border-red-500" : ""}
              />
              {errors?.location && (
                <p className='text-sm text-red-500 mt-1'>{errors.location}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Salary ($/month)</label>
              <Input
                name='salary'
                type='number'
                value={formData?.salary}
                onChange={handleInputChange}
                placeholder='e.g., 2000'
                className={errors?.salary ? "border-red-500" : ""}
              />
              {errors?.salary && (
                <p className='text-sm text-red-500 mt-1'>{errors.salary}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Expiry Date</label>
              <Input
                name='expiryDate'
                type='date'
                value={formData?.expiryDate}
                onChange={handleInputChange}
                min='2025-05-19'
                className={errors?.expiryDate ? "border-red-500" : ""}
              />
              {errors?.expiryDate && (
                <p className='text-sm text-red-500 mt-1'>{errors.expiryDate}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Term</label>
              <Select
                name='term'
                value={formData?.term}
                onValueChange={handleTermChange}
              >
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
                value={formData?.duration}
                onChange={handleInputChange}
                placeholder='e.g., 3'
                className={errors?.duration ? "border-red-500" : ""}
              />
              {errors?.duration && (
                <p className='text-sm text-red-500 mt-1'>{errors.duration}</p>
              )}
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='live'
                name='live'
                checked={formData?.live}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, live: checked }))
                }
              />
              <label htmlFor='live' className='text-sm font-medium'>
                Live
              </label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='sponsored'
                name='sponsored'
                checked={formData?.sponsored}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, sponsored: checked }))
                }
              />
              <label htmlFor='sponsored' className='text-sm font-medium'>
                Sponsored
              </label>
            </div>
          </form>
        )}
        <DrawerFooter>
          <div className='flex gap-1 items-center justify-end'>
            <Button variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
            {!isCreating && <Button onClick={handleCreate}>Create</Button>}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default PostInternshipDrawer;
