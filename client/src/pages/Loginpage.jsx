import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Googlebtn from "../components/custom/utils/Googlebtn";

function Loginpage() {
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

        <h1 className='text-3xl font-semibold text-gray-800'>Welcome Back!</h1>

        {/* Form */}
        <form className='flex flex-col gap-4 items-center justify-center w-full'>
          <Input
            type='email'
            className='w-80'
            placeholder='Your Email...'
            variant='outline'
            size='lg'
            label='Email'
          />
          <Input
            type='password'
            className='w-80'
            placeholder='Password'
            variant='outline'
            size='lg'
            label='Password'
          />
          <Button
            onClick={() => navigate("/")}
            className='btn bg-gradient-to-tl from-dark to-medium-dark text-white rounded-full py-3 px-6 text-xl mt-4 transition-transform hover:scale-105'
          >
            Login
          </Button>
        </form>

        {/* Break Section */}
        <div className='flex items-center justify-center gap-2 w-full mt-6'>
          <hr className='w-full bg-dark h-1 rounded-lg' />
          <span className='text-lg text-gray-600'>OR</span>
          <hr className='w-full bg-dark h-1 rounded-lg' />
        </div>

        {/* Google Login Button */}
        <div className='mt-6'>
          <Googlebtn text='Login With Google' />
        </div>

        {/* Signup Link */}
        <div className='text-sm text-gray-700 mt-4'>
          Don&apos;t have an account yet?{" "}
          <Link to='/signup' className='text-primary-600 underline'>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
