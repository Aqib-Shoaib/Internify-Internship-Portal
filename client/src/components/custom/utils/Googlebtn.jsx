/* eslint-disable react/prop-types */
import { useGoogleLogin } from "@react-oauth/google";

function Googlebtn({ text }) {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        //send this tokenResponse.access_token to backend
        //might have to use jwtDecode library, if it is of no use, remove it from dependencies

        console.log(tokenResponse);
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <button
      className='flex items-center justify-center gap-2 text-sm px-5 py-2 border-2 rounded-full bg-background text-muted-foreground border-border shadow transition-transform hover:scale-[1.03] cursor-pointer'
      onClick={login}
    >
      <span className='w-6 h-6 flex items-center justify-center'>
        <img
          src='/google.png'
          alt='google logo'
          className='w-full h-full object-contain'
        />
      </span>
      {text}
    </button>
  );
}

export default Googlebtn;
