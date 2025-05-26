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
import { updateUserData } from "@/stateActions/userActions";
import { useState } from "react";
import { useDispatch } from "react-redux";

function EditProfileDrawer({ editDrawerOpen, setEditDrawerOpen, companyData }) {
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({ name: "", bio: "" });
  const [formData, setFormData] = useState({
    name: companyData?.name || "",
    bio: companyData?.bio || "",
    headline: companyData?.headline || "",
    website: companyData?.website || "",
    industry: companyData?.industry || "",
    location: companyData?.location || "",
    phoneNumber: companyData?.phoneNumber || "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSave = () => {
    const newErrors = {
      name: formData.name ? "" : "Name is required.",
      bio: formData.bio ? "" : "bio is required.",
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.bio) return;

    setIsSaving(true);
    setProgress(0);

    const processedData = {
      ...formData,
    };

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSaving(false);

          dispatch(updateUserData(processedData));
          setEditDrawerOpen(false);
          setErrors({ name: "", bio: "" });
          return 0;
        }
        return prev + 10;
      });
    }, 0);
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
          <div className='p-6 space-y-4 overflow-y-auto max-h-[80vh]'>
            <div>
              <label className='text-sm font-medium'>Company Name</label>
              <Input
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                placeholder='e.g., TechCorp Solutions'
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className='text-sm text-red-500 mt-1'>{errors.name}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Bio</label>
              <Textarea
                name='bio'
                value={formData.bio}
                onChange={handleInputChange}
                placeholder='e.g., Innovative tech company...'
                className={errors.bio ? "border-red-500" : ""}
              />
              {errors.bio && (
                <p className='text-sm text-red-500 mt-1'>{errors.bio}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Headline</label>
              <Input
                name='headline'
                value={formData.headline}
                onChange={handleInputChange}
                type='text'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Website</label>
              <Input
                name='website'
                value={formData.website}
                onChange={handleInputChange}
                placeholder='e.g., https://techcorp.com'
                type='url'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Industry</label>
              <Input
                name='industry'
                value={formData.industry}
                onChange={handleInputChange}
                placeholder='e.g., Technology'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Location</label>
              <Input
                name='location'
                value={formData.location}
                onChange={handleInputChange}
                placeholder='e.g., San Francisco, CA'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Phone Number</label>
              <Input
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder='e.g., +1-415-555-1234'
              />
            </div>
          </div>
        )}
        <DrawerFooter>
          <div className='flex items-center justify-end gap-2'>
            <Button
              variant='outline'
              onClick={() => {
                setEditDrawerOpen(false);
                setErrors({ name: "", bio: "" });
                setIsSaving(false);
                setProgress(0);
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
