import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { user as companyData } from "@/dummy/user";
import EditProfileDrawer from "./EditProfileDrawer";

const CompanyProfile = () => {
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);

  return (
    <div className='p-0 md:p-6'>
      <h1 className='text-2xl font-bold hidden md:block mb-6'>
        {companyData.name}
      </h1>
      {companyData.name ? (
        <Card className='w-full'>
          <CardContent className='flex flex-col md:flex-row gap-1.5 md:gap-0 items-start space-x-4'>
            <div
              className={`w-20 h-20 flex items-center justify-center rounded-full`}
            >
              <img
                src={companyData.profileImage}
                alt=''
                className='rounded-full'
              />
            </div>
            <div className='space-y-2'>
              <p className='text-muted-foreground text-sm md:text-base'>
                {companyData.bio || "Not provided"}
              </p>
              <p className='text-sm md:text-base'>
                Website:{" "}
                {companyData.website ? (
                  <a
                    href={companyData.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 hover:underline'
                  >
                    {companyData.website}
                  </a>
                ) : (
                  "Not provided"
                )}
              </p>
              <p className='text-sm md:text-base'>
                Industry: {companyData.industry || "Not provided"}
              </p>
              <p className='text-sm md:text-base'>
                Location: {companyData.location || "Not provided"}
              </p>
              <p className='text-sm md:text-base'>
                Phone: {companyData.phoneNumber || "Not provided"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className='w-full md:w-3/5 mx-auto'>
          <CardContent className='pt-6 text-center'>
            <p className='text-muted-foreground'>No profile created.</p>
          </CardContent>
        </Card>
      )}
      <div className='flex justify-center mt-6'>
        <Button onClick={() => setEditDrawerOpen(true)}>Edit Profile</Button>
      </div>
      <EditProfileDrawer
        editDrawerOpen={editDrawerOpen}
        setEditDrawerOpen={setEditDrawerOpen}
        companyData={companyData}
      />
    </div>
  );
};

export default CompanyProfile;
