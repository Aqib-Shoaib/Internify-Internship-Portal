/* eslint-disable react/prop-types */
import KeywordsInput from "@/components/custom/utils/KeywordsInput";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateUserData } from "@/stateActions/userActions";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function EditProfileDrawer({ isDrawerOpen, setIsDrawerOpen, user }) {
  const [updateData, setUpdateData] = useState({});
  const [educationData, setEducationData] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  }
  function handleEducationInputChange(e) {
    const { name, value } = e.target;
    setEducationData((prev) => ({ ...prev, [name]: value }));
  }
  const handleSkillsKeywordsChange = (keywords) => {
    setUpdateData((prev) => ({ ...prev, skills: [...user.skills, keywords] }));
  };

  async function saveUser() {
    const data = {
      ...updateData,
      education: { ...educationData },
    };
    try {
      await dispatch(updateUserData(data)).unwrap();
      toast.success("Successfully Updated");
      setIsDrawerOpen(false);
    } catch (err) {
      toast.error(err || "Update Failed");
    }
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
        </DrawerHeader>
        <div className='p-6 space-y-4 overflow-y-auto max-h-[80vh]'>
          <div>
            <Label className='text-sm font-medium'>Name</Label>
            <Input
              defaultValue={user.name}
              name='name'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <Label className='text-sm font-medium'>Headline</Label>
            <Input
              defaultValue={user.headline}
              name='headline'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <Label className='text-sm font-medium'>Bio</Label>
            <Textarea
              defaultValue={user.bio}
              name='bio'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <Label className='text-sm font-medium'>Phone Number</Label>
            <Input
              defaultValue={user.phoneNumber}
              name='phoneNumber'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <Label className='text-sm font-medium'>Website</Label>
            <Input
              defaultValue={user.website}
              name='website'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <Label className='text-sm font-medium'>Skills</Label>
            <KeywordsInput
              oldKeywords={user.skills}
              placeholder='Add more...'
              onKeywordsChange={handleSkillsKeywordsChange}
            />
          </div>
          <div>
            <Label className='text-sm font-medium'>Education</Label>
            <div className='grid grid-cols-3 gap-1'>
              <Input
                defaultValue={user.education.degree}
                placeholder='BS, MS etc'
                name='degree'
                onChange={(e) => handleEducationInputChange(e)}
              />
              <Select
                defaultValue={user.education.major}
                onValueChange={(e) =>
                  setEducationData((prev) => ({ ...prev, major: e }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select your Major' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>major</SelectLabel>
                    <SelectItem value='BS'>BS</SelectItem>
                    <SelectItem value='MS'>MS</SelectItem>
                    <SelectItem value='BSc'>BSc</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                defaultValue={user.education.currentYear}
                onValueChange={(e) =>
                  setEducationData((prev) => ({ ...prev, currentYear: e }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select year' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='freshman'>Freshman (1st year)</SelectItem>
                  <SelectItem value='sophomore'>
                    Sophomore (2nd year)
                  </SelectItem>
                  <SelectItem value='junior'>Junior (3rd year)</SelectItem>
                  <SelectItem value='senior'>Senior (4th year)</SelectItem>
                  <SelectItem value='graduate'>Graduate</SelectItem>
                </SelectContent>
              </Select>
              <Input
                defaultValue={user.education.year}
                placeholder='Last Year'
                name='year'
                onChange={(e) => handleEducationInputChange(e)}
              />

              <Input
                defaultValue={user.education.university}
                placeholder='Your Uni...'
                className='col-span-2'
                name='university'
                onChange={(e) => handleEducationInputChange(e)}
              />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <div className='flex items-center gap-2 justify-end'>
            <Button
              variant='outline'
              disabled={loading}
              onClick={() => setIsDrawerOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveUser} disabled={loading}>
              {loading ? "Saving" : "Save"}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default EditProfileDrawer;
