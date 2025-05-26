import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Googlebtn from "../components/custom/utils/Googlebtn";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/stateActions/userActions";

function Loginpage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await dispatch(loginUser(loginData)).unwrap();
      toast.success("Login Successfull");
      navigate("/");
    } catch (err) {
      toast.error(err || "Login Failure");
    }
  }

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
        <form
          className='flex flex-col gap-4 items-center justify-center w-full'
          onSubmit={handleLogin}
        >
          <Input
            type='email'
            className='w-80'
            name='email'
            value={loginData.email}
            onChange={(e) => handleInputChange(e)}
            placeholder='Your Email...'
            required
          />
          <Input
            type='password'
            className='w-80'
            name='password'
            value={loginData.password}
            onChange={(e) => handleInputChange(e)}
            placeholder='Password'
            minLength={8}
            required
          />
          <Button
            variant='outline'
            disabled={loading}
            type='submit'
            className='btn bg-gradient-to-tl from-dark to-medium-dark rounded-full py-3 px-6 text-xl mt-4 transition-transform hover:scale-105'
          >
            {loading ? "Logging in..." : "Login"}
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
