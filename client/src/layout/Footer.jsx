function Footer() {
  return (
    <footer className='bg-background flex flex-col md:flex-row md:flex-wrap gap-20 p-16'>
      <div className='flex-1'>
        <img src='logo.svg' alt='footer logo' className='h-[70%]' />
      </div>

      <div className='flex-2 flex flex-col gap-6'>
        <div data-aos='fade-up'>
          <h3 className='text-foreground text-lg font-semibold'>Mail:</h3>
          <span className='text-secondary'>aqibibnamjid@gmail.com</span>
        </div>
        <div data-aos='fade-up'>
          <h3 className='text-foreground text-lg font-semibold'>Address:</h3>
          <span className='text-secondary'>UET Taxila</span>
        </div>
        <div data-aos='fade-up'>
          <h3 className='text-foreground text-lg font-semibold'>Phone:</h3>
          <span className='text-secondary'>+92 304 6164841</span>
        </div>
      </div>

      <div
        className='flex-2 flex flex-col gap-4 items-start justify-start'
        data-aos='fade-up'
      >
        {["About us", "Contact us", "Internships", "Interns", "News"].map(
          (link, index) => (
            <a
              key={index}
              href='#'
              className='transition-all duration-300 hover:border-b text-primary border-primary text-base'
            >
              {link}
            </a>
          )
        )}
      </div>
    </footer>
  );
}

export default Footer;
