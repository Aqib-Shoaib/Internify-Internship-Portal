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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function EditProfileDrawer({ isDrawerOpen, setIsDrawerOpen, user }) {
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
        </DrawerHeader>
        <div className='p-6 space-y-4 overflow-y-auto max-h-[80vh]'>
          <div>
            <Label className='text-sm font-medium'>Name</Label>
            <Input defaultValue={user.name} />
          </div>
          <div>
            <Label className='text-sm font-medium'>Headline</Label>
            <Input defaultValue={user.headline} />
          </div>
          <div>
            <Label className='text-sm font-medium'>Bio</Label>
            <Textarea defaultValue={user.bio} />
          </div>
          <div>
            <Label className='text-sm font-medium'>Phone Number</Label>
            <Input defaultValue={user.phoneNumber} />
          </div>
          <div>
            <Label className='text-sm font-medium'>Website</Label>
            <Input defaultValue={user.website} />
          </div>
          <div>
            <Label className='text-sm font-medium'>
              Skills (comma-separated)
            </Label>
            <Textarea defaultValue={user.skills.join(", ")} />
          </div>
          <div>
            <Label className='text-sm font-medium'>Education</Label>
            <div className='grid grid-cols-2 gap-1'>
              <Input defaultValue={user.degree} placeholder='BS, MS etc' />
              <Input defaultValue={user.year} placeholder='2025' />
              <Input
                defaultValue={user.school}
                placeholder='Your Uni...'
                className='col-span-2'
              />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <div className='flex items-center gap-2 justify-end'>
            <Button variant='outline' onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default EditProfileDrawer;
