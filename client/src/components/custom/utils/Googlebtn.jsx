// eslint-disable-next-line react/prop-types
function Googlebtn({ text }) {
  return (
    <button className='flex items-center justify-center gap-2 text-sm px-5 py-2 border-2 rounded-full bg-background text-muted-foreground border-border shadow transition-transform hover:scale-[1.03]'>
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
