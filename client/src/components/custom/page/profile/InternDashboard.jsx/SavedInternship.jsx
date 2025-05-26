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
import { savedInternships, saveInternship } from "@/services/intern";

const InternSavedInternshipsTab = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function fetchInternships() {
      const data = await savedInternships();
      setInternships(data.savedInternships);
    }
    fetchInternships();
    setLoading(false);
  }, []);

  const handleUnsave = (internshipId) => {
    setIsUpdating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUpdating(false);
          console.log("Unsave Internship:", { internshipId });
          setInternships((prev) =>
            prev.filter((int) => int._id === internshipId)
          );
          saveInternship(internshipId, false);
          return 0;
        }
        return prev + 10;
      });
    }, 0);
  };

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
      <Card data-aos='zoom-in'>
        {internships.length > 0 ? (
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
                {internships
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((internship) => (
                    <TableRow
                      key={internship?._id}
                      className='cursor-pointer'
                      onClick={(e) => {
                        if (e.target.closest(".actions")) return;
                        console.log("Navigate to internship detail page:", {
                          internshipId: internship._id,
                        });
                      }}
                    >
                      <TableCell>{internship?.company?.name}</TableCell>
                      <TableCell>{internship?.title}</TableCell>
                      <TableCell>{internship?.location}</TableCell>
                      <TableCell>{internship?.term}</TableCell>
                      <TableCell className='actions'>
                        <div className='flex items-center space-x-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleUnsave(internship?._id)}
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
        ) : (
          <CardContent>
            <p className='text-muted-foreground'>No saved internships found.</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default InternSavedInternshipsTab;
