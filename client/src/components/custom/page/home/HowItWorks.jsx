import {
  User,
  Landmark,
  Stethoscope,
  Share2,
  Smile,
  Target,
  Building,
  Plus,
  CheckCheck,
  ClipboardList,
  Accessibility,
} from "lucide-react";

import Title from "../../utils/Title";
import Sub from "../../utils/Sub";

function HowItWorks() {
  return (
    <section className='py-12 w-full flex flex-col gap-16 items-center justify-center px-4'>
      <div className='flex flex-col items-center justify-center text-center gap-1.5'>
        <Title>How It Works</Title>
        <Sub>Whether You&apos;re Seeking or Offering, We Connect the Dots.</Sub>
      </div>

      <div className='flex flex-col xl:flex-row gap-8 max-w-7xl w-full'>
        {/* Internship Seekers */}
        <div
          className='bg-background shadow rounded-lg p-6 flex-1'
          data-aos='zoom-in'
        >
          <h4 className='text-lg font-normal border-b border-border inline-block mb-4'>
            If you want an Internship:
          </h4>
          <ul>
            {[
              {
                icon: <User className='w-5 h-5' />,
                title: "Create a Profile",
                desc: "Showcase your skills, experience, and academic achievements.",
              },
              {
                icon: <Landmark className='w-5 h-5' />,
                title: "Explore Opportunities",
                desc: "Browse through a variety of internships from top companies.",
              },
              {
                icon: <Stethoscope className='w-5 h-5' />,
                title: "Apply to Internships",
                desc: "Submit your application and highlight your relevant qualifications.",
              },
              {
                icon: <Share2 className='w-5 h-5' />,
                title: "Connect with Recruiters",
                desc: "Network with hiring managers and industry professionals.",
              },
              {
                icon: <Smile className='w-5 h-5' />,
                title: "Ace the Interview",
                desc: "Prepare for interviews and receive valuable career advice.",
              },
              {
                icon: <Target className='w-5 h-5' />,
                title: "Land Your Dream Internship",
                desc: "Secure a rewarding internship that aligns with your goals.",
              },
            ].map(({ icon, title, desc }) => (
              <li key={title} className='my-4 text-secondary flex gap-1.5'>
                <span className='mt-1'>{icon}</span>
                <div className='flex flex-col gap-0.5 font-semibold'>
                  <b className='capitalize'>{title}:</b>
                  <p className='text-secondary/80'>{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Internship Providers */}
        <div
          className='bg-background shadow rounded-lg p-6 flex-1'
          data-aos='zoom-in'
        >
          <h4 className='text-lg font-light border-b border-border inline-block mb-4'>
            If you are looking for an Intern:
          </h4>
          <ul>
            {[
              {
                icon: <Building className='w-5 h-5' />,
                title: "Create a Company Profile",
                desc: "Showcase your brand and attract top talent.",
              },
              {
                icon: <Plus className='w-5 h-5' />,
                title: "Post Internship Opportunities",
                desc: "Create engaging internship listings and set clear expectations.",
              },
              {
                icon: <CheckCheck className='w-5 h-5' />,
                title: "Review Applications",
                desc: "Screen applications and identify promising candidates.",
              },
              {
                icon: <ClipboardList className='w-5 h-5' />,
                title: "Conduct Interviews",
                desc: "Assess candidates’ skills and cultural fit through interviews.",
              },
              {
                icon: <Accessibility className='w-5 h-5' />,
                title: "Hire Top Talent",
                desc: "Extend offers to qualified interns and build a strong talent pipeline.",
              },
            ].map(({ icon, title, desc }) => (
              <li key={title} className='my-4 text-secondary flex gap-1.5'>
                <span className='mt-1'>{icon}</span>
                <div className='flex flex-col gap-0.5 font-semibold'>
                  <b className='capitalize'>{title}:</b>
                  <p className='text-secondary/80'>{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
