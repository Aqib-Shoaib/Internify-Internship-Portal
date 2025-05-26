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
import { applyForInternship } from "@/services/intern";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function InternshipApplication({ setIsDrawerOpen, isDrawerOpen, title, id }) {
  const { user } = useSelector((state) => state.user);
  const [selectedResume, setSelectedResume] = useState(
    user?.resume[0]?.link || ""
  );
  const [loading, setLoading] = useState(false);

  // { internship: internshipId, coverLetter, resumeLink }
  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      coverLetter: e.target.coverLetter.value,
      resumeLink: selectedResume,
      internship: id,
    };
    const res = await applyForInternship(data);
    if (res.status === 201) {
      toast.success("Application Submitted");
    } else {
      toast.error("Application Submission Failed");
    }
    setIsDrawerOpen(false);
    setLoading(false);
  };
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Apply for {title}</DrawerTitle>
        </DrawerHeader>
        {user?.resume?.length > 0 ? (
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
                defaultValue={selectedResume}
                onValueChange={setSelectedResume}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a resume' />
                </SelectTrigger>
                <SelectContent>
                  {user?.resume?.map((resume, index) => (
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
              disabled={user?.resumes?.length === 0 || loading}
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
