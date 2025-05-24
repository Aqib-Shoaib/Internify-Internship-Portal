import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditProfileDrawer from "./EditProfileDrawer";
import { useSelector } from "react-redux";

const InternProfile = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  return (
    <div className='p-0 md:p-6'>
      <div className='flex flex-col gap-6'>
        {/* Profile Card */}
        <Card data-aos='zoom-in'>
          <CardHeader>
            <CardTitle className='hidden md:block'>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center space-x-4 mb-2 md:mb-4'>
              <img
                src={user.profileImage || "/user.png"}
                alt='Profile'
                className='w-10 md:w-16 h-10 md:h-16 rounded-full object-cover'
              />
              <div>
                <h3 className='text-lg md:text-xl font-semibold'>
                  {user.name}
                </h3>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  {user.headline}
                </p>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-xs md:text-sm'>
                <span className='font-medium'>Email:</span> {user.email}
              </p>
              {user.phoneNumber && (
                <p className='text-xs md:text-sm'>
                  <span className='font-medium'>Phone:</span> {user.phoneNumber}
                </p>
              )}
              {user.website && (
                <p className='text-xs md:text-sm'>
                  <span className='font-medium'>Website:</span>{" "}
                  <a
                    href={user.website}
                    className='text-blue-600 hover:underline'
                  >
                    {user.website}
                  </a>
                </p>
              )}
              {user.bio && (
                <p className='text-xs md:text-sm'>
                  <span className='font-medium'>Bio:</span> {user.bio}
                </p>
              )}
              <Button
                className='mt-2 md:mt-4'
                onClick={() => setIsDrawerOpen(true)}
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Skills and Education Card */}
        <Card data-aos='zoom-in'>
          <CardHeader>
            <CardTitle className='hidden md:block'>
              Skills & Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='mb-3 md:mb-6'>
              <h4 className='text-base md:text-lg font-medium mb-2'>Skills</h4>
              <div className='flex flex-wrap gap-2'>
                {user.skills.length === 0 ? (
                  <div>
                    <p className='text-muted-foreground'>
                      Start Adding your skills by editing the profile
                    </p>
                  </div>
                ) : (
                  user.skills.map((skill, index) => (
                    <Badge key={index} variant='secondary'>
                      {skill}
                    </Badge>
                  ))
                )}
              </div>
            </div>
            <div>
              <h4 className='text-base md:text-lg font-medium mb-2'>
                Education
              </h4>

              <div className='text-xs md:text-sm'>
                <p className='font-medium'>
                  {user.education.major} - {user.education.degree} -{" "}
                  {user.education.currentYear}
                </p>
                <div className='flex items-center gap-1'>
                  <p>{user.education.university}</p>
                  <p className='text-muted-foreground'>{user.education.year}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Drawer */}
      <EditProfileDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        user={user}
      />
    </div>
  );
};

export default InternProfile;
