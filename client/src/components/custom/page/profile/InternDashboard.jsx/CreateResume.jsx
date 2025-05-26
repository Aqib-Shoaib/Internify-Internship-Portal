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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { jsPDF } from "jspdf";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadResumeFile } from "@/services/intern";
import KeywordsInput from "@/components/custom/utils/KeywordsInput";

const CreateResumeDrawer = ({ open, onOpenChange, userData }) => {
  const [formData, setFormData] = useState({
    title: "",
    name: userData.name || "",
    email: userData.email || "",
    phoneNumber: userData.phoneNumber || "",
    skills: userData.skills,
    education: {
      degree: userData.education?.degree || "",
      major: userData.education?.major || "",
      currentYear: userData.education?.currentYear || "",
      year: userData.education?.year || "",
      university: userData.education?.university || "",
    },
    summary: userData.bio || "",
    workExperience: "",
    projects: "",
  });
  const [pdfBlob, setPdfBlob] = useState(null);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({ title: "", name: "", email: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSkillsKeywordsChange = (keywords) => {
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, ...keywords] }));
  };

  const handleEducationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: { ...prev.education, [field]: value },
    }));
  };

  const generatePDF = (formData) => {
    const doc = new jsPDF();
    let y = 20;

    // Add title (Resume title or user's designation)
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(formData.title, 105, y, { align: "center" });
    y += 10;

    // Add personal details centered
    doc.setFontSize(12);
    if (formData.name) {
      doc.setFont("helvetica", "bold");
      doc.text(formData.name, 105, y, { align: "center" });
      y += 6;
    }

    doc.setFont("helvetica", "normal");
    if (formData.email) {
      doc.text(formData.email, 105, y, { align: "center" });
      y += 6;
    }

    if (formData.phoneNumber) {
      doc.text(formData.phoneNumber, 105, y, { align: "center" });
      y += 6;
    }

    // === Summary section next ===
    if (formData.summary) {
      y += 6;
      doc.setFont("helvetica", "bold");
      doc.text("Summary", 20, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      const summaryLines = doc.splitTextToSize(formData.summary, 170);
      doc.text(summaryLines, 20, y);
      y += summaryLines.length * 8;
    }

    // Skills
    if (formData.skills) {
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Skills", 20, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      const skillsArray = formData.skills.map((skill) => skill.trim());
      const skillsLine = skillsArray.join(" | ");
      const skillLines = doc.splitTextToSize(skillsLine, 170);
      doc.text(skillLines, 20, y);
      y += skillLines.length * 8;
    }

    // Education
    if (formData.education) {
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Education", 20, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      const educationText = `${formData.education.degree}, ${formData.education.major}, ${formData.education.university} (${formData.education.currentYear}, ${formData.education.year})`;
      const eduLines = doc.splitTextToSize(educationText, 170);
      doc.text(eduLines, 20, y);
      y += eduLines.length * 8;
    }

    // Work experience
    if (formData.workExperience) {
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Work Experience", 20, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      const workLines = doc.splitTextToSize(formData.workExperience, 170);
      doc.text(workLines, 20, y);
      y += workLines.length * 8;
    }

    // Projects
    if (formData.projects) {
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Projects", 20, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      const projectLines = doc.splitTextToSize(formData.projects, 170);
      doc.text(projectLines, 20, y);
      y += projectLines.length * 8;
    }

    // Generate PDF Blob and filename
    const pdfBlob = doc.output("blob");
    const fileName = `${formData.title.replace(/\s+/g, "_")}.pdf`;
    return { pdfBlob, fileName };
  };

  const handleGenerate = () => {
    // Validate required fields
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

    // Simulate PDF generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          // Generate PDF and store in state
          const { pdfBlob, fileName } = generatePDF(formData);
          if (previewUrl) URL.revokeObjectURL(previewUrl);
          const newPreviewUrl = URL.createObjectURL(pdfBlob);
          setPdfBlob(pdfBlob);
          setFileName(fileName);
          setPreviewUrl(newPreviewUrl);
          console.log("PDF generated:", {
            title: formData.title,
            file: pdfBlob,
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
    if (!pdfBlob) return;

    setIsUploading(true);
    setProgress(0);

    // Create FormData object for backend
    const uploadFormData = new FormData();
    uploadFormData.append("resume", pdfBlob); // File field for req.file
    uploadFormData.append("title", formData.title); // Title field

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          console.log("Uploading Resume:", {
            title: formData.title,
            file: { name: fileName, size: pdfBlob.size },
          });

          // Send FormData to backend
          uploadResumeFile(uploadFormData);
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
          setFormData({
            title: "",
            name: userData.name || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            skills: userData.skills?.join(", ") || "",
            education: {
              degree: userData.education?.degree || "",
              major: userData.education?.major || "",
              currentYear: userData.education?.currentYear || "",
              year: userData.education?.year || "",
              university: userData.education?.university || "",
            },
            summary: userData.bio || "",
            workExperience: "",
            projects: "",
          });
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
          <form className='p-6 space-y-4 overflow-y-auto max-h-[80vh]'>
            <div>
              <label className='text-sm font-medium'>Resume Title</label>
              <Input
                name='title'
                value={formData.title}
                onChange={handleInputChange}
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
                value={formData.name}
                onChange={handleInputChange}
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
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "border-red-500" : ""}
                required
              />
              {errors.email && (
                <p className='text-sm text-red-500 mt-1'>{errors.email}</p>
              )}
            </div>
            <div>
              <label className='text-sm font-medium'>Phone Number</label>
              <Input
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Skills</label>
              <KeywordsInput
                oldKeywords={formData.skills}
                onKeywordsChange={handleSkillsKeywordsChange}
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Education</label>
              <div className='grid grid-cols-3 gap-1'>
                <Input
                  value={formData.education.degree}
                  onChange={(e) =>
                    handleEducationChange("degree", e.target.value)
                  }
                  placeholder='BS, MS etc'
                  name='degree'
                />
                <Select
                  value={formData.education.major}
                  onValueChange={(value) =>
                    handleEducationChange("major", value)
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
                  value={formData.education.currentYear}
                  onValueChange={(value) =>
                    handleEducationChange("currentYear", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select year' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='freshman'>
                      Freshman (1st year)
                    </SelectItem>
                    <SelectItem value='sophomore'>
                      Sophomore (2nd year)
                    </SelectItem>
                    <SelectItem value='junior'>Junior (3rd year)</SelectItem>
                    <SelectItem value='senior'>Senior (4th year)</SelectItem>
                    <SelectItem value='graduate'>Graduate</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={formData.education.year}
                  onChange={(e) =>
                    handleEducationChange("year", e.target.value)
                  }
                  placeholder='Last Year'
                  name='year'
                />
                <Input
                  value={formData.education.university}
                  onChange={(e) =>
                    handleEducationChange("university", e.target.value)
                  }
                  placeholder='Your Uni...'
                  className='col-span-2'
                  name='university'
                />
              </div>
            </div>
            <div>
              <label className='text-sm font-medium'>Summary</label>
              <Textarea
                name='summary'
                value={formData.summary}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Work Experience</label>
              <Textarea
                name='workExperience'
                value={formData.workExperience}
                onChange={handleInputChange}
                placeholder='Describe your work experience'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Projects</label>
              <Textarea
                name='projects'
                value={formData.projects}
                onChange={handleInputChange}
                placeholder='Describe your projects'
              />
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
          <div className='flex items-center gap-1 justify-end'>
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
                setFormData({
                  title: "",
                  name: userData.name || "",
                  email: userData.email || "",
                  phoneNumber: userData.phoneNumber || "",
                  skills: userData.skills?.join(", ") || "",
                  education: {
                    degree: userData.education?.degree || "",
                    major: userData.education?.major || "",
                    currentYear: userData.education?.currentYear || "",
                    year: userData.education?.year || "",
                    university: userData.education?.university || "",
                  },
                  summary: userData.bio || "",
                  workExperience: "",
                  projects: "",
                });
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
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateResumeDrawer;
