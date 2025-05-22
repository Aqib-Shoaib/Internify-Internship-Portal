import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function OTPPage() {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-center gap-20 w-full h-screen'>
      {/* Greeting Section */}
      <div
        className='hidden lg:flex flex-col gap-4 p-4 w-1/2 items-center justify-center'
        data-aos='fade-right'
      >
        <div className='w-full'>
          <img
            src='/logo.svg'
            alt='internify logo'
            className='w-full object-cover'
          />
        </div>
        <p className='text-lg text-gray-800'>
          We Help You to Connect with companies in a bit more efficient and
          hurdle less way
        </p>
      </div>

      {/* Main Section */}
      <div
        className='flex flex-col items-center justify-center h-full md:h-fit gap-6 p-8 shadow-lg rounded-lg'
        data-aos='fade-left'
      >
        {/* Logo */}
        <div className='w-full text-center'>
          <img src='/logo.svg' alt='internify logo' className='w-1/2 mx-auto' />
        </div>

        <h1 className='text-3xl font-semibold text-gray-800'>Enter OTP</h1>

        {/* Form */}
        <form className='flex flex-col gap-4 items-center justify-center w-full'>
          <Input
            type='number'
            className='w-80'
            placeholder='Your OTP...'
            variant='outline'
            size='lg'
          />
          <Button
            onClick={() => navigate("/")}
            variant='outline'
            className='btn bg-gradient-to-tl from-dark to-medium-dark rounded-full py-3 px-6 text-xl mt-4 transition-transform hover:scale-105'
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default OTPPage;
