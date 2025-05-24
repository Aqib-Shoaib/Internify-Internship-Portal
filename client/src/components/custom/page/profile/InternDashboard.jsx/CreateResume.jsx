/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { jsPDF } from "jspdf";

const CreateResumeDrawer = ({ open, onOpenChange, userData }) => {
  const [pdfBlob, setPdfBlob] = useState(null);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({ title: "", name: "", email: "" });
  const formRef = useRef(null);

  const generatePDF = (formData) => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(formData.title, 105, y, { align: "center" });
    y += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${formData.name}`, 20, y);
    y += 8;
    doc.text(`Email: ${formData.email}`, 20, y);
    y += 8;
    if (formData.phoneNumber) {
      doc.text(`Phone: ${formData.phoneNumber}`, 20, y);
      y += 8;
    }

    if (formData.skills) {
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Skills", 20, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.text(formData.skills, 20, y, { maxWidth: 170 });
      y += doc.splitTextToSize(formData.skills, 170).length * 8;
    }

    if (formData.education) {
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Education", 20, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.text(formData.education, 20, y, { maxWidth: 170 });
      y += doc.splitTextToSize(formData.education, 170).length * 8;
    }

    if (formData.summary) {
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Summary", 20, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.text(formData.summary, 20, y, { maxWidth: 170 });
      y += doc.splitTextToSize(formData.summary, 170).length * 8;
    }

    if (formData.workExperience) {
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Work Experience", 20, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.text(formData.workExperience, 20, y, { maxWidth: 170 });
      y += doc.splitTextToSize(formData.workExperience, 170).length * 8;
    }

    if (formData.projects) {
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Projects", 20, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.text(formData.projects, 20, y, { maxWidth: 170 });
      y += doc.splitTextToSize(formData.projects, 170).length * 8;
    }

    const pdfBlob = doc.output("blob");
    const fileName = `${formData.title.replace(/\s+/g, "_")}.pdf`;
    return { pdfBlob, fileName };
  };

  const handleGenerate = () => {
    if (!formRef.current) return;

    const formData = {
      title: formRef.current.title.value,
      name: formRef.current.name.value,
      email: formRef.current.email.value,
      phoneNumber: formRef.current.phoneNumber.value,
      skills: formRef.current.skills.value,
      education: formRef.current.education.value,
      summary: formRef.current.summary.value,
      workExperience: formRef.current.workExperience.value,
      projects: formRef.current.projects.value,
    };

    const newErrors = {
      title: formData.title ? "" : "Title is required.",
      name: formData.name ? "" : "Name is required.",
      email: formData.email ? "" : "Email is required.",
    };
    setErrors(newErrors);

    if (newErrors.title || newErrors.name || newErrors.email) {
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          const { pdfBlob, fileName } = generatePDF(formData);
          if (previewUrl) URL.revokeObjectURL(previewUrl);
          const newPreviewUrl = URL.createObjectURL(pdfBlob);
          setPdfBlob(pdfBlob);
          setFileName(fileName);
          setPreviewUrl(newPreviewUrl);
          console.log("PDF generated:", {
            title: formData.title,
            file: { name: fileName, size: pdfBlob.size },
          });
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handlePreview = () => {
    if (previewUrl) window.open(previewUrl, "_blank");
  };

  const handleUpload = () => {
    if (!formRef.current || !pdfBlob) return;

    const formData = {
      title: formRef.current.title.value,
    };

    setIsUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          console.log("Create Resume:", {
            title: formData.title,
            file: { name: fileName, size: pdfBlob.size },
          });
          if (previewUrl) URL.revokeObjectURL(previewUrl);
          setPdfBlob(null);
          setFileName("");
          setPreviewUrl(null);
          setErrors({ title: "", name: "", email: "" });
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
        if (!isOpen) {
          if (previewUrl) URL.revokeObjectURL(previewUrl);
          setPdfBlob(null);
          setFileName("");
          setPreviewUrl(null);
          setErrors({ title: "", name: "", email: "" });
          setIsGenerating(false);
          setIsUploading(false);
          setProgress(0);
          if (formRef.current) formRef.current.reset();
        }
        onOpenChange(isOpen);
      }}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create Resume</DrawerTitle>
        </DrawerHeader>
        {isGenerating ? (
          <div className='p-6 space-y-4'>
            <p className='text-muted-foreground'>Generating...</p>
            <Progress value={progress} />
          </div>
        ) : isUploading ? (
          <div className='p-6 space-y-4'>
            <p className='text-muted-foreground'>Uploading...</p>
            <Progress value={progress} />
          </div>
        ) : (
          <form
            ref={formRef}
            className='p-6 space-y-4 overflow-y-auto max-h-[80vh]'
          >
            <div>
              <label className='text-sm font-medium'>Resume Title</label>
              <Input
                name='title'
                placeholder='e.g., AI Internship Resume'
                className={errors.title ? "border-red-500" : ""}
                required
              />
              {errors.title && (
                <p className='text-sm text-red-500 mt-1'>{errors.title}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Name</label>
              <Input
                name='name'
                defaultValue={userData.name}
                className={errors.name ? "border-red-500" : ""}
                required
              />
              {errors.name && (
                <p className='text-sm text-red-500 mt-1'>{errors.name}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Email</label>
              <Input
                name='email'
                type='email'
                defaultValue={userData.email}
                className={errors.email ? "border-red-500" : ""}
                required
              />
              {errors.email && (
                <p className='text-sm text-red-500 mt-1'>{errors.email}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Phone Number</label>
              <Input name='phoneNumber' defaultValue={userData.phoneNumber} />
            </div>
            <div>
              <label className='text-sm font-medium'>Skills</label>
              <Input name='skills' defaultValue={userData.skills.join(", ")} />
            </div>
            <div>
              <label className='text-sm font-medium'>Education</label>
              <Textarea
                name='education'
                // defaultValue={userData.education
                //   .map((e) => `${e.degree}, ${e.school}, ${e.year}`)
                //   .join("\n")}
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Summary</label>
              <Textarea name='summary' defaultValue={userData.bio} />
            </div>
            <div>
              <label className='text-sm font-medium'>Work Experience</label>
              <Textarea
                name='workExperience'
                placeholder='Describe your work experience'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Projects</label>
              <Textarea name='projects' placeholder='Describe your projects' />
            </div>
            <div className='flex gap-4'>
              <Button type='button' onClick={handleGenerate}>
                Generate PDF
              </Button>
              <Button
                type='button'
                onClick={handlePreview}
                disabled={!pdfBlob}
                variant='secondary'
              >
                Preview PDF
              </Button>
            </div>
          </form>
        )}
        <DrawerFooter>
          <Button
            variant='outline'
            onClick={() => {
              if (previewUrl) URL.revokeObjectURL(previewUrl);
              setPdfBlob(null);
              setFileName("");
              setPreviewUrl(null);
              setErrors({ title: "", name: "", email: "" });
              setIsGenerating(false);
              setIsUploading(false);
              setProgress(0);
              if (formRef.current) formRef.current.reset();
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          {!isGenerating && !isUploading && (
            <Button type='button' onClick={handleUpload} disabled={!pdfBlob}>
              Upload Resume
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateResumeDrawer;
