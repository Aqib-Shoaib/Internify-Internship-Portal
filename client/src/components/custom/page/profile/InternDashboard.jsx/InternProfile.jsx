import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { user } from "@/dummy/user";
import { Label } from "@/components/ui/label";

// const user = {
//   name: "Aqib Shoaib",
//   email: "aqib@example.com",
//   profileImage: "/placeholder.png",
//   bio: "Aspiring Software Engineer with a passion for building scalable and efficient web applications.",
//   headline: "Software Engineering Intern",
//   website: "http://localhost:5173/",
//   phoneNumber: "+923046164841",
//   skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
//   education: [
//     {
//       school: "UET Taxila",
//       degree: "BS Software Engineering",
//       year: "Senior (4th year)",
//     },
//   ],
//   isActive: true,
// };

const InternProfile = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center space-x-4 mb-4'>
              <img
                src={user.profileImage}
                alt='Profile'
                className='w-16 h-16 rounded-full object-cover'
              />
              <div>
                <h3 className='text-xl font-semibold'>{user.name}</h3>
                <p className='text-sm text-muted-foreground'>{user.headline}</p>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-sm'>
                <span className='font-medium'>Email:</span> {user.email}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>Phone:</span> {user.phoneNumber}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>Website:</span>{" "}
                <a
                  href={user.website}
                  className='text-blue-600 hover:underline'
                >
                  {user.website}
                </a>
              </p>
              <p className='text-sm'>{user.bio}</p>
              <Button className='mt-4' onClick={() => setIsDrawerOpen(true)}>
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Skills and Education Card */}
        <Card>
          <CardHeader>
            <CardTitle>Skills & Education</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='mb-6'>
              <h4 className='text-lg font-medium mb-2'>Skills</h4>
              <div className='flex flex-wrap gap-2'>
                {user.skills.map((skill, index) => (
                  <Badge key={index} variant='secondary'>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className='text-lg font-medium mb-2'>Education</h4>
              {user.education.map((edu, index) => (
                <div key={index} className='text-sm'>
                  <p className='font-medium'>{edu.degree}</p>
                  <p>{edu.school}</p>
                  <p className='text-muted-foreground'>{edu.year}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Drawer */}
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
              <Input defaultValue={user.skills.join(", ")} />
            </div>
            <div>
              <Label className='text-sm font-medium'>Education</Label>
              <p className='text-sm text-muted-foreground'>
                Education editing not supported in this view.
              </p>
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
    </div>
  );
};

export default InternProfile;
