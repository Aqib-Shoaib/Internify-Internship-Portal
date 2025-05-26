import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Trash2 } from "lucide-react";
import CreateResumeDrawer from "./CreateResume";
import UploadResumeDrawer from "./UploadResume";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/stateActions/userActions";
import { deleteResumeFile } from "@/services/intern";

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
  const [refetchUser, setRefetchUser] = useState(false);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(
    function () {
      if (refetchUser) {
        dispatch(fetchUser(true));
        setRefetchUser(false);
      }
    },
    [dispatch, refetchUser]
  );

  function deleteResume(id) {
    deleteResumeFile(id);
    setRefetchUser();
  }

  if (refetchUser)
    return (
      <div className='h-full w-full flex items-center justify-center'>
        <Loader2 />
      </div>
    );

  return (
    <div className='p-0 md:p-6'>
      {/* Heading */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-1.5 w-full'>
        <h1 className='text-xl md:text-2xl font-bold'>My Resumes</h1>
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
      <div className=' mb-4 md:mb-6 mt-2'>
        <p className='text-xs text-muted-foreground'>
          It is recommended to reload page after uploading or creating a resume!
        </p>
      </div>

      {/* Resume Cards or No Resume Message */}
      {user.resume.length > 0 ? (
        <div
          className='flex flex-col md:flex-row items-center gap-2 md:flex-wrap'
          data-aos='zoom-in'
        >
          {user.resume.map((resume, index) => (
            <Card key={index} className='w-fit'>
              <CardHeader>
                <CardTitle>
                  <div className='flex items-center justify-between'>
                    <span>{resume.title}</span>
                    <span onClick={() => deleteResume(resume._id)}>
                      <Trash2 className='text-muted-foreground hover:text-destructive cursor-pointer' />
                    </span>
                  </div>
                </CardTitle>
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
        userData={user}
        setRefetchUser={setRefetchUser}
      />

      {/* Upload Resume Drawer */}
      <UploadResumeDrawer
        open={uploadDrawerOpen}
        onOpenChange={setUploadDrawerOpen}
        setRefetchUser={setRefetchUser}
      />
    </div>
  );
};

export default Resumes;
