/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const UploadResumeDrawer = ({ open, onOpenChange }) => {
  const [uploadError, setUploadError] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const file = e.target.file.files[0];

    if (!file) {
      setUploadError("Please select a file.");
      return;
    }
    if (file.type !== "application/pdf") {
      setUploadError("Only PDFs are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size must be less than 5 MB.");
      return;
    }
    if (!title) {
      setUploadError("Please enter a title.");
      return;
    }

    setUploadError("");
    setIsUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setSelectedFile(null);
          setUploadPreviewUrl(null);
          if (uploadPreviewUrl) URL.revokeObjectURL(uploadPreviewUrl);
          console.log("Upload Resume:", {
            title,
            file: { name: file.name, size: file.size },
          });
          e.target.reset();
          onOpenChange(false);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && uploadPreviewUrl) {
          URL.revokeObjectURL(uploadPreviewUrl);
          setUploadPreviewUrl(null);
        }
        setIsUploading(false);
        setProgress(0);
        setUploadError("");
        setSelectedFile(null);
        onOpenChange(isOpen);
      }}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Upload Resume</DrawerTitle>
        </DrawerHeader>
        {!isUploading ? (
          <form
            id='upload-resume-form'
            onSubmit={handleUpload}
            className='p-6 space-y-4 overflow-y-auto max-h-[80vh]'
          >
            <div>
              <label className='text-sm font-medium'>Resume Title</label>
              <Input name='title' placeholder='e.g., My Tech Resume' required />
            </div>
            <div>
              <label className='text-sm font-medium'>
                Resume File (PDF, max 5 MB)
              </label>
              <Input
                name='file'
                type='file'
                accept='application/pdf'
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedFile(file);
                  if (file) {
                    const previewUrl = URL.createObjectURL(file);
                    setUploadPreviewUrl(previewUrl);
                  } else {
                    setUploadPreviewUrl(null);
                  }
                  if (!file) {
                    setUploadError("Please select a file.");
                  } else if (file.type !== "application/pdf") {
                    setUploadError("Only PDFs are allowed.");
                  } else if (file.size > 5 * 1024 * 1024) {
                    setUploadError("File size must be less than 5 MB.");
                  } else {
                    setUploadError("");
                  }
                }}
              />
              {uploadError && (
                <p className='text-sm text-red-500 mt-1'>{uploadError}</p>
              )}
              {selectedFile && !uploadError && (
                <p className='text-sm text-muted-foreground mt-1'>
                  Selected: {selectedFile.name}
                </p>
              )}
              {uploadPreviewUrl && (
                <iframe
                  src={uploadPreviewUrl}
                  className='w-full h-64 mt-4 border rounded-md'
                  title='Uploaded Resume Preview'
                />
              )}
            </div>
          </form>
        ) : (
          <div className='p-6 space-y-4'>
            <p className='text-muted-foreground'>Uploading...</p>
            <Progress value={progress} />
          </div>
        )}
        <DrawerFooter>
          <div className='flex items-center gap-1 justify-end'>
            <Button
              variant='outline'
              onClick={() => {
                if (uploadPreviewUrl) {
                  URL.revokeObjectURL(uploadPreviewUrl);
                  setUploadPreviewUrl(null);
                }
                setIsUploading(false);
                setProgress(0);
                setUploadError("");
                setSelectedFile(null);
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            {!isUploading && (
              <Button type='submit' form='upload-resume-form'>
                Upload
              </Button>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UploadResumeDrawer;
