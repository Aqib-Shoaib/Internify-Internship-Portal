import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { useMemo } from "react";
import { user as companyData } from "@/dummy/user";
import PostInternshipDrawer from "./PostInternshipDrawer";
import EditInternshipDrawer from "./EditInternshipDrawer";
import ToggleLiveInternshipDrawer from "./ToggleLiveInternshipDrawer";

const CompanyInternshipsTab = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [toggleLiveDrawerOpen, setToggleLiveDrawerOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  const currentDate = useMemo(() => new Date("2025-05-18T00:00:00.000Z"), []);
  useEffect(() => {
    const fetchInternships = async () => {
      const mockData = [
        {
          _id: "1",
          title: "Software Engineer Intern",
          description: "Develop cutting-edge software solutions.",
          location: "Remote",
          salary: 2000,
          term: "FULL-TIME",
          duration: 3,
          live: true,
          verified: true,
          expiryDate: "2025-06-30T23:59:59.999Z",
          company: companyData._id,
          applications: 5,
        },
        {
          _id: "2",
          title: "Marketing Intern",
          description: "Assist in marketing campaigns.",
          location: "New York",
          salary: 1500,
          term: "PART-TIME",
          duration: 6,
          live: true,
          verified: false,
          expiryDate: "2025-10-10T23:59:59.999Z",
          company: companyData._id,
          applications: 2,
        },
      ];
      // Filter by companyId and check expiryDate
      const filteredData = mockData
        .filter((internship) => internship.company === companyData._id)
        .map((internship) => ({
          ...internship,
          live:
            internship.live && new Date(internship.expiryDate) > currentDate,
        }));
      setInternships(filteredData);
      setLoading(false);
    };
    fetchInternships();
  }, [currentDate]);

  const handleUpdateInternship = (updatedInternship) => {
    setInternships(
      internships.map((internship) =>
        internship._id === updatedInternship._id
          ? {
              ...updatedInternship,
              live:
                updatedInternship.live &&
                new Date(updatedInternship.expiryDate) > currentDate,
            }
          : internship
      )
    );
  };

  const isEditable = (internship) => {
    return (
      !internship.verified &&
      new Date(internship.expiryDate) > currentDate &&
      internship.live
    );
  };

  if (!companyData.verified) {
    return (
      <div className='p-6 max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-6'>Your Internships</h1>
        <p className='text-muted-foreground'>
          Please verify your account to view or post internships.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className='p-6 max-w-4xl mx-auto'>Loading...</div>;
  }

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Your Internships</h1>
        <Button onClick={() => setCreateDrawerOpen(true)}>
          Create New Internship
        </Button>
      </div>
      <div className='flex items-center gap-1.5 flex-wrap justify-start'>
        {internships.length > 0 ? (
          internships.map((internship) => (
            <Card key={internship._id} className='w-fit'>
              <CardHeader>
                <CardTitle className='flex flex-col gap-1'>
                  <div className='flex items-center gap-1'>
                    <Briefcase className='h-5 w-5' />
                    <span className='whitespace-nowrap'>
                      {internship.title}
                    </span>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <Badge variant={internship.live ? "success" : "secondary"}>
                      {internship.live ? "Live" : "Inactive"}
                    </Badge>
                    <Badge
                      variant={internship.verified ? "success" : "secondary"}
                    >
                      {internship.verified ? "Verified" : "Not Verified"}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground text-sm'>
                  {internship.description}
                </p>
                <p className='text-sm'>Location: {internship.location}</p>
                <p className='text-sm'>Salary: ${internship.salary}/month</p>
                <p className='text-sm'>Term: {internship.term}</p>
                <p className='text-sm'>
                  Duration: {internship.duration} months
                </p>
                <p className='text-sm'>
                  Applications: {internship.applications}
                </p>
                <p className='text-sm'>
                  Expiry Date:{" "}
                  {new Date(internship.expiryDate).toLocaleDateString()}
                </p>
                <div className='mt-4 space-x-2'>
                  <Button
                    variant='outline'
                    disabled={!isEditable(internship)}
                    onClick={() => {
                      setSelectedInternship(internship);
                      setEditDrawerOpen(true);
                    }}
                    title={
                      !isEditable(internship)
                        ? "Cannot edit verified, expired, or inactive internships"
                        : ""
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant='outline'
                    onClick={() => {
                      setSelectedInternship(internship);
                      setToggleLiveDrawerOpen(true);
                    }}
                  >
                    Toggle Live
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className='text-muted-foreground'>No internships posted yet.</p>
        )}
      </div>

      {/* create internship drawer */}
      <PostInternshipDrawer
        setCreateDrawerOpen={setCreateDrawerOpen}
        createDrawerOpen={createDrawerOpen}
        companyData={companyData}
        setInternships={setInternships}
        currentDate={currentDate}
        internships={internships}
      />

      <EditInternshipDrawer
        open={editDrawerOpen}
        onOpenChange={setEditDrawerOpen}
        internship={selectedInternship}
        onUpdate={handleUpdateInternship}
      />
      <ToggleLiveInternshipDrawer
        open={toggleLiveDrawerOpen}
        onOpenChange={setToggleLiveDrawerOpen}
        internship={selectedInternship}
        onUpdate={handleUpdateInternship}
      />
    </div>
  );
};

export default CompanyInternshipsTab;
