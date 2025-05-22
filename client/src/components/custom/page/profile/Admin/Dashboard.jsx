import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const users = [
  {
    _id: "user_001",
    name: "Aqib Shoaib",
    email: "aqib@example.com",
    role: "INTERN",
    isActive: true,
    skills: ["React.js", "Node.js"],
    education: [
      {
        school: "UET Taxila",
        degree: "BS Software Engineering",
        year: "Senior",
      },
    ],
  },
  {
    _id: "user_002",
    name: "Aqib Devs",
    email: "company@example.com",
    role: "COMPANY",
    isActive: true,
    industry: "Tech",
    location: "Islamabad",
    verified: false,
  },
  {
    _id: "user_003",
    name: "Sara Khan",
    email: "sara@example.com",
    role: "INTERN",
    isActive: false,
    skills: ["Python", "Django"],
    education: [
      { school: "NUST", degree: "BS Computer Science", year: "Junior" },
    ],
  },
  {
    _id: "user_004",
    name: "Tech Innovate",
    email: "tech@example.com",
    role: "COMPANY",
    isActive: true,
    industry: "Software",
    location: "Lahore",
    verified: true,
  },
  {
    _id: "user_005",
    name: "Admin User",
    email: "admin@example.com",
    role: "ADMIN",
    isActive: true,
  },
];

const internships = [
  {
    _id: "internship_001",
    title: "Software Engineer Intern",
    verified: true,
  },
  {
    _id: "internship_002",
    title: "Frontend Developer Intern",
    verified: false,
  },
  {
    _id: "internship_003",
    title: "Backend Developer Intern",
    verified: true,
  },
  {
    _id: "internship_004",
    title: "AI Developer Intern",
    verified: false,
  },
  {
    _id: "internship_005",
    title: "Full Stack Intern",
    verified: true,
  },
];

const Dashboard = () => {
  // Calculate user stats
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.isActive).length;
  const companiesPendingVerification = users.filter(
    (user) => user.role === "COMPANY" && !user.verified
  ).length;

  // Calculate activity stats
  const internshipsPendingVerification = internships.filter(
    (internship) => !internship.verified
  ).length;
  const verifiedInternships = internships.filter(
    (internship) => internship.verified
  ).length;
  const verifiedCompanies = users.filter(
    (user) => user.role === "COMPANY" && user.verified
  ).length;

  return (
    <div className='p-0 md:p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* System Overview Card */}
        <Card data-aos='zoom-in'>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-3 gap-4'>
              <div>
                <p className='text-2xl font-bold'>{totalUsers}</p>
                <p className='text-sm text-muted-foreground'>Total Users</p>
              </div>
              <div>
                <p className='text-2xl font-bold'>{activeUsers}</p>
                <p className='text-sm text-muted-foreground'>Active Users</p>
              </div>
              <div>
                <p className='text-2xl font-bold'>
                  {companiesPendingVerification}
                </p>
                <p className='text-sm text-muted-foreground'>
                  Companies Pending Verification
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Summary Card */}
        <Card data-aos='zoom-in'>
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-3 gap-4'>
              <div>
                <p className='text-2xl font-bold'>
                  {internshipsPendingVerification}
                </p>
                <p className='text-sm text-muted-foreground'>
                  Internships Pending Verification
                </p>
              </div>
              <div>
                <p className='text-2xl font-bold'>{verifiedInternships}</p>
                <p className='text-sm text-muted-foreground'>
                  Verified Internships
                </p>
              </div>
              <div>
                <p className='text-2xl font-bold'>{verifiedCompanies}</p>
                <p className='text-sm text-muted-foreground'>
                  Verified Companies
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
