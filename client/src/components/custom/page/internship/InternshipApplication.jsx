/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function InternshipApplication({
  setIsDrawerOpen,
  isDrawerOpen,
  internshipData,
}) {
  const [selectedResume, setSelectedResume] = useState(
    internshipData.user.resumes[0]?.link || ""
  );

  const handleApply = (e) => {
    e.preventDefault();
    console.log("Application submitted:", {
      coverLetter: e.target.coverLetter.value,
      resumeLink: selectedResume,
    });
    setIsDrawerOpen(false);
  };
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Apply for {internshipData.title}</DrawerTitle>
        </DrawerHeader>
        {internshipData.user.resumes.length > 0 ? (
          <form
            id='apply-form'
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
              <label className='text-sm font-medium'>Select Resume</label>
              <Select
                value={selectedResume}
                onValueChange={setSelectedResume}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a resume' />
                </SelectTrigger>
                <SelectContent>
                  {internshipData.user.resumes.map((resume, index) => (
                    <SelectItem key={index} value={resume.link}>
                      {resume.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </form>
        ) : (
          <div className='p-6'>
            <p className='text-muted-foreground'>
              No resumes found. Please add a resume in the Resume tab.
            </p>
          </div>
        )}
        <DrawerFooter>
          <div className='flex gap-2 items-center justify-end'>
            <Button variant='outline' onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            <Button
              type='submit'
              form='apply-form'
              disabled={internshipData.user.resumes.length === 0}
            >
              Submit Application
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default InternshipApplication;
