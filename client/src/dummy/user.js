export const INTERN_USER = {
  user_type: "INTERN",
  fullName: "Aqib Shoaib",
  profilePic: "student_vector.svg",
  email: "example@gmail.com",
  password: "test1234",
  passwordConfirm: "test1234",
  phone: "+923046164841",
  portfolioUrl: "http://localhost:5173/",
  university: "UET Taxila",
  major: "BS",
  degree: "Software Engineering",
  currentYear: "Senior (4th year)",
  skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
  interests: ["Web Developer", "Front-end Engineer", "React.js Developer"],
  location: ["Islamabad", "Remote", "Wah Cantt", "Lahore"],
  shortbio:
    "Aspiring Software Engineer with a passion for building scalable and efficient web applications. Experienced in MERN stack development.",
  workExp: [
    {
      location: "Remote",
      company: "Kindi AI",
      role: "Software Engineer Intern",
      time: "8 months",
      description:
        "Worked on AI-driven web applications using React and Node.js.",
    },
    {
      location: "Islamabad",
      company: "Tech Solutions",
      role: "Front-end Developer Intern",
      time: "3 months",
      description: "Developed interactive UIs using React.js and Tailwind CSS.",
    },
  ],
  certificates: [
    {
      title: "Full-Stack Development",
      issuingOrganization: "Coursera",
      issueDate: "2023-05-15",
      image: "/download.jpeg",
    },
    {
      title: "JavaScript Mastery",
      issuingOrganization: "Udemy",
      issueDate: "2022-12-10",
      image: "/download.jpeg",
    },
  ],
  internships: [
    {
      name: "Amazon Affiliate Marketing",
      status: "applied",
      company: "Amazon",
    },
    {
      name: "Google Dev ops internship",
      status: "in Progress",
      company: "Google",
    },
    {
      name: "Nasa HTML/CSS internship",
      status: "viewed",
      company: "Nasa",
    },
    {
      name: "Microsoft Linux checkup",
      status: "completed",
      company: "Microsoft",
    },
    {
      name: "Machine learning",
      status: "rejected",
      company: "Ezitech",
    },
  ],
  reviews: [
    {
      company: "Google",
      reviewerName: "John Doe",
      reviewerJobTitle: "Senior Developer",
      rating: 4.5,
      review:
        "Aqib was a proactive and dedicated intern. He quickly adapted to our work environment and delivered high-quality results.",
      date: "2023-06-15",
    },
    {
      company: "Microsoft",
      reviewerName: "Sarah Lee",
      reviewerJobTitle: "Project Manager",
      rating: 5,
      review:
        "Aqib showed excellent problem-solving skills and was a great team player. He contributed significantly to our project.",
      date: "2023-09-10",
    },
  ],
  internshipPreferences: ["Remote", "Islamabad"],
};

export const HR_USER = {
  user_type: "COMPANY",
  companyName: "Aqib Devs",
  email: "company@gmail.com",
  password: "test1234",
  passwordConfirm: "test1234",
  phone: "+923046164841",
  websiteUrl: "http://localhost:5173/signup",
  industry: "Tech",
  headQuartersLocation: "ABC CITY, XYZ STREET",
  briefDescription:
    "Aqib Devs is a leading software development firm specializing in AI, web, and mobile app development.",
  resgisterationNumber: "97934384038403",
  recruiterName: "Aqib Shoaib",
  recruiterJobTitle: "HR Manager",
  mission:
    "To empower businesses with cutting-edge software solutions while fostering a culture of innovation and growth.",
  logo: "apple.png",
  internshipsPosted: [
    {
      name: "Graphic Designer",
      status: "Open",
      type: "Part Time",
      tasks: ["Practice Tasks"],
      salary: "$100/month",
      location: "San Francisco, CA",
      datePosted: "June 23, 2023",
      description:
        "Looking for a creative graphic designer to work on various design projects.",
      applications: 45,
    },
    {
      name: "Software Developer Intern",
      status: "Closed",
      type: "Full Time",
      tasks: ["Development Tasks"],
      salary: "$500/month",
      location: "Remote",
      datePosted: "May 12, 2023",
      description:
        "An internship focused on building scalable web applications using React and Node.js.",
      applications: 32,
    },
  ],
  internsCount: 12,
  reviews: [
    {
      intern: "Aqib Shoaib",
      internJobTitle: "Software Engineering Intern",
      rating: 5,
      review:
        "Amazing company with a great work environment and plenty of learning opportunities. The mentors were very supportive.",
      date: "2023-07-20",
    },
    {
      intern: "Fatima Khan",
      internJobTitle: "Front-End Developer Intern",
      rating: 4.8,
      review:
        "Had a fantastic experience working here! The projects were challenging, and I gained hands-on experience with modern tech stacks.",
      date: "2023-10-05",
    },
  ],
  companyCulture:
    "We promote a culture of learning, innovation, and work-life balance. Our goal is to create a collaborative and dynamic work environment for all employees and interns.",
};
