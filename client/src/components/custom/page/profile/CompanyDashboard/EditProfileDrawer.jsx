/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

function EditProfileDrawer({ editDrawerOpen, setEditDrawerOpen, companyData }) {
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({ name: "", description: "" });
  const formRef = useRef(null);
  const handleSave = () => {
    if (!formRef.current) return;

    const formData = {
      name: formRef.current.name.value,
      description: formRef.current.description.value,
      website: formRef.current.website.value,
      industry: formRef.current.industry.value,
      location: formRef.current.location.value,
      contactEmail: formRef.current.contactEmail.value,
      size: formRef.current.size.value,
      foundedYear: formRef.current.foundedYear.value,
      headquarters: formRef.current.headquarters.value,
      phoneNumber: formRef.current.phoneNumber.value,
      socialLinks: formRef.current.socialLinks.value
        ? formRef.current.socialLinks.value
            .split(",")
            .map((link) => link.trim())
        : [],
      missionStatement: formRef.current.missionStatement.value,
    };

    const newErrors = {
      name: formData.name ? "" : "Name is required.",
      description: formData.description ? "" : "Description is required.",
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.description) return;

    setIsSaving(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSaving(false);
          console.log("Update Profile:", formData);
          setEditDrawerOpen(false);
          setErrors({ name: "", description: "" });
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };
  return (
    <Drawer open={editDrawerOpen} onOpenChange={setEditDrawerOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
        </DrawerHeader>
        {isSaving ? (
          <div className='p-6 space-y-4'>
            <p className='text-muted-foreground'>Saving...</p>
            <Progress value={progress} />
          </div>
        ) : (
          <form
            ref={formRef}
            className='p-6 space-y-4 overflow-y-auto max-h-[80vh]'
          >
            <div>
              <label className='text-sm font-medium'>Company Name</label>
              <Input
                name='name'
                defaultValue={companyData.name}
                placeholder='e.g., TechCorp Solutions'
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className='text-sm text-red-500 mt-1'>{errors.name}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Description</label>
              <Textarea
                name='description'
                defaultValue={companyData.description}
                placeholder='e.g., Innovative tech company...'
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className='text-sm text-red-500 mt-1'>
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Website</label>
              <Input
                name='website'
                defaultValue={companyData.website}
                placeholder='e.g., https://techcorp.com'
                type='url'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Industry</label>
              <Input
                name='industry'
                defaultValue={companyData.industry}
                placeholder='e.g., Technology'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Location</label>
              <Input
                name='location'
                defaultValue={companyData.location}
                placeholder='e.g., San Francisco, CA'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Contact Email</label>
              <Input
                name='contactEmail'
                defaultValue={companyData.contactEmail}
                placeholder='e.g., contact@techcorp.com'
                type='email'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Company Size</label>
              <Input
                name='size'
                defaultValue={companyData.size}
                placeholder='e.g., 500-1000 employees'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Founded Year</label>
              <Input
                name='foundedYear'
                defaultValue={companyData.foundedYear}
                placeholder='e.g., 2010'
                type='number'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Headquarters</label>
              <Input
                name='headquarters'
                defaultValue={companyData.headquarters}
                placeholder='e.g., 123 Tech Street, San Francisco, CA 94105'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Phone Number</label>
              <Input
                name='phoneNumber'
                defaultValue={companyData.phoneNumber}
                placeholder='e.g., +1-415-555-1234'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Social Links</label>
              <Input
                name='socialLinks'
                defaultValue={
                  companyData.socialLinks
                    ? companyData.socialLinks.join(", ")
                    : ""
                }
                placeholder='e.g., https://linkedin.com/company/techcorp, https://twitter.com/techcorp'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Mission Statement</label>
              <Textarea
                name='missionStatement'
                defaultValue={companyData.missionStatement}
                placeholder='e.g., Empowering the future through innovative technology...'
              />
            </div>
          </form>
        )}
        <DrawerFooter>
          <div className='flex items-center justify-end gap-2'>
            <Button
              variant='outline'
              onClick={() => {
                setEditDrawerOpen(false);
                setErrors({ name: "", description: "" });
                setIsSaving(false);
                setProgress(0);
                if (formRef.current) formRef.current.reset();
              }}
            >
              Cancel
            </Button>
            {!isSaving && <Button onClick={handleSave}>Save</Button>}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default EditProfileDrawer;
