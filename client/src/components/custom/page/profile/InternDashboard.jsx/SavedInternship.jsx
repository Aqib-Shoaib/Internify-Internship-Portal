import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bookmark, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const InternSavedInternshipsTab = () => {
  const [savedInternships, setSavedInternships] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const currentDate = new Date("2025-05-20T21:58:00.000Z"); // 09:58 PM PKT, May 20, 2025

  useEffect(() => {
    const fetchSavedInternships = async () => {
      const mockSavedInternships = [
        { internshipId: "internship1" },
        { internshipId: "internship2" },
        { internshipId: "internship3" },
      ];
      const mockInternships = [
        {
          _id: "internship1",
          company: { _id: "company1", name: "Tech Corp" },
          title: "Software Engineer Intern",
          location: "Remote",
          term: "FULL-TIME",
          isLive: true,
          deadline: "2025-06-01T23:59:00.000Z",
          createdAt: "2025-05-01T09:00:00.000Z",
        },
        {
          _id: "internship2",
          company: { _id: "company2", name: "Marketing Inc" },
          title: "Marketing Intern",
          location: "New York",
          term: "PART-TIME",
          isLive: true,
          deadline: "2025-05-25T23:59:00.000Z",
          createdAt: "2025-05-10T14:00:00.000Z",
        },
        {
          _id: "internship3",
          company: { _id: "company3", name: "Old Corp" },
          title: "Data Analyst Intern",
          location: "Boston",
          term: "FULL-TIME",
          isLive: true,
          deadline: "2025-05-15T23:59:00.000Z", // Expired, filtered out
          createdAt: "2025-04-01T10:00:00.000Z",
        },
      ];
      setSavedInternships(mockSavedInternships);
      setInternships(mockInternships);
      setLoading(false);
    };
    fetchSavedInternships();
  }, []);

  const handleUnsave = (internshipId) => {
    setIsUpdating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUpdating(false);
          setSavedInternships((prev) =>
            prev.filter((s) => s.internshipId !== internshipId)
          );
          console.log("Unsave Internship:", { internshipId });
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const filteredInternships = savedInternships
    .map((saved) => internships.find((i) => i._id === saved.internshipId))
    .filter(
      (internship) =>
        internship &&
        internship.isLive &&
        new Date(internship.deadline) > currentDate
    );

  if (loading) {
    return <div className='p-6 max-w-4xl mx-auto'>Loading...</div>;
  }

  return (
    <div className='p-0 md:p-6'>
      <h1 className='text-xl md:text-2xl font-bold mb-2 md:mb-4'>
        Saved Internships
      </h1>
      <p className='text-muted-foreground mb-4 md:mb-6 text-xs md:text-sm'>
        Expired internships, non-live won&apos;t show up here
      </p>
      {isUpdating && (
        <div className='mb-4'>
          <p className='text-muted-foreground'>Updating...</p>
          <Progress value={progress} />
        </div>
      )}
      {filteredInternships.length > 0 ? (
        <Card>
          <CardContent>
            <Table className='w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInternships
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((internship) => (
                    <TableRow
                      key={internship._id}
                      className='cursor-pointer'
                      onClick={(e) => {
                        if (e.target.closest(".actions")) return;
                        console.log("Navigate to internship detail page:", {
                          internshipId: internship._id,
                        });
                      }}
                    >
                      <TableCell>{internship.company.name}</TableCell>
                      <TableCell>{internship.title}</TableCell>
                      <TableCell>{internship.location}</TableCell>
                      <TableCell>{internship.term}</TableCell>
                      <TableCell className='actions'>
                        <div className='flex items-center space-x-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleUnsave(internship._id)}
                          >
                            <Bookmark className='h-4 w-4 mr-1' />
                            Unsave
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                              console.log("Navigate to apply for internship:", {
                                internshipId: internship._id,
                              })
                            }
                          >
                            <ExternalLink className='h-4 w-4 mr-1' />
                            Apply
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <p className='text-muted-foreground'>No saved internships found.</p>
      )}
    </div>
  );
};

export default InternSavedInternshipsTab;
