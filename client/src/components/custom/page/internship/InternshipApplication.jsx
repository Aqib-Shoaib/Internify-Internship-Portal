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
import { Textarea } from "@/components/ui/textarea";

function InternshipApplication({ setIsDrawerOpen, isDrawerOpen, title }) {
  const handleApply = (e) => {
    e.preventDefault();
    console.log("Application submitted:", {
      coverLetter: e.target.coverLetter.value,
      resumeLink: e.target.resumeLink.value,
    });
    setIsDrawerOpen(false);
  };
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Apply for {title}</DrawerTitle>
        </DrawerHeader>
        <form
          onSubmit={handleApply}
          className='p-6 space-y-4 overflow-y-auto max-h-[80vh]'
        >
          <div>
            <label className='text-sm font-medium'>Cover Letter</label>
            <Textarea
              name='coverLetter'
              placeholder='Write your cover letter here...'
              required
            />
          </div>
          <div>
            <label className='text-sm font-medium'>Resume Link</label>
            <Input
              name='resumeLink'
              type='url'
              placeholder='Enter resume URL (e.g., cloud storage link)'
              required
            />
          </div>
        </form>
        <DrawerFooter>
          <div className='flex gap-2 items-center justify-end'>
            <Button variant='outline' onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            <Button type='submit' form='apply-form'>
              Submit Application
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default InternshipApplication;
