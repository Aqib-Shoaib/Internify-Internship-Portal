import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import CreateResumeDrawer from "./CreateResume";
import UploadResumeDrawer from "./UploadResume";

const userData = {
  name: "Aqib Shoaib",
  email: "aqib@example.com",
  phoneNumber: "+923046164841",
  bio: "Aspiring Software Engineer with a passion for building scalable web applications.",
  headline: "Software Engineering Intern",
  website: "http://localhost:5173/",
  skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
  education: [
    {
      school: "UET Taxila",
      degree: "BS Software Engineering",
      year: "Senior (4th year)",
    },
  ],
  resumes: [
    {
      title: "My Tech Resume",
      link: "/resumes/intern_123_tech_resume.pdf",
      createdAt: "2025-05-01T09:00:00.000Z",
    },
    {
      title: "AI Internship Resume",
      link: "/resumes/intern_123_ai_resume.pdf",
      createdAt: "2025-05-10T12:00:00.000Z",
    },
  ],
};

// Random background colors with opacity
const colors = [
  "bg-blue-500/50",
  "bg-green-500/50",
  "bg-purple-500/50",
  "bg-red-500/50",
];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const Resumes = () => {
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [uploadDrawerOpen, setUploadDrawerOpen] = useState(false);

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      {/* Heading */}
      <div className='flex items-center justify-between w-full mb-6'>
        <h1 className='text-2xl font-bold'>My Resumes</h1>
        {/* Create and Upload Resume Buttons */}
        <div className='flex justify-center gap-4'>
          <Button onClick={() => setCreateDrawerOpen(true)}>
            Create Resume
          </Button>
          <Button onClick={() => setUploadDrawerOpen(true)}>
            Upload Resume
          </Button>
        </div>
      </div>

      {/* Resume Cards or No Resume Message */}
      {userData.resumes.length > 0 ? (
        <div className='flex items-center gap-2 flex-wrap'>
          {userData.resumes.map((resume, index) => (
            <Card key={index} className='w-fit'>
              <CardHeader>
                <CardTitle>{resume.title}</CardTitle>
              </CardHeader>
              <CardContent className='flex items-end gap-1'>
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-md ${getRandomColor()}`}
                >
                  <FileText className='h-9 w-9 text-white' />
                </div>
                <div>
                  <Button asChild size='sm'>
                    <a
                      href={resume.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View Resume
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className='w-full md:w-3/5 mx-auto'>
          <CardContent className='pt-6 text-center'>
            <p className='text-muted-foreground'>
              No resumes uploaded or created.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Create Resume Drawer */}
      <CreateResumeDrawer
        open={createDrawerOpen}
        onOpenChange={setCreateDrawerOpen}
        userData={userData}
      />

      {/* Upload Resume Drawer */}
      <UploadResumeDrawer
        open={uploadDrawerOpen}
        onOpenChange={setUploadDrawerOpen}
        userData={userData}
      />
    </div>
  );
};

export default Resumes;
