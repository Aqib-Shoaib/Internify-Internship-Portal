import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, verifyOtp } from "@/stateActions/userActions";
import toast from "react-hot-toast";

function OTPPage() {
  const navigate = useNavigate();
  const { tempEmail, loading } = useSelector((state) => state.user);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userobj"));

  const resendOTP = useCallback(async () => {
    if (!userData) {
      toast.error("OTP Resending Failed");
      navigate("/signup");
    } else {
      try {
        await dispatch(registerUser(userData)).unwrap();
        toast.success("OTP sent. Please check your email: " + userData.email);
      } catch (err) {
        toast.error(err || "Something went wrong");
      }
    }
  }, [dispatch, navigate, userData]);

  const signUpAfterOTP = async (e) => {
    e.preventDefault();
    const data = { email: tempEmail, otp };
    try {
      await dispatch(verifyOtp(data)).unwrap();
      toast.success("Welcome to Internify");
      navigate("/");
    } catch (err) {
      toast.error(err || "Sign Up Failed");
    }
  };

  if (!tempEmail && !userData)
    return (
      <div className='flex flex-col gap-1 h-screen w-screen items-center justify-center'>
        <p>
          No Email found! Looks Like you are trying to access this page the
          wrong way.
        </p>
        <Link to='/signup' className='text-primary hover:underline'>
          Signup
        </Link>
      </div>
    );

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
        <form
          className='flex flex-col gap-4 items-center justify-center w-full'
          onSubmit={signUpAfterOTP}
        >
          <Input
            className='w-80'
            placeholder='Your OTP...'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <p>
            <Button variant='ghost' onClick={resendOTP}>
              Resend OTP
            </Button>
          </p>
          <Button
            type='submit'
            variant='outline'
            disabled={loading}
            className='btn bg-gradient-to-tl from-dark to-medium-dark rounded-full py-3 px-6 text-xl mt-4 transition-transform hover:scale-105'
          >
            {loading ? "Submitting" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default OTPPage;
