import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <div className='w-full h-dvh py-8 px-4 md:grid md:grid-cols-[45%_45%] md:gap-[7%] md:place-items-center md:px-16 mt-20 bg-gradient-to-b from-gray-100 to-blue-50 '>
      <div
        data-aos='fade-right'
        className='flex flex-col gap-2 items-start justify-start'
      >
        <h2 className='text-3xl md:text-4xl font-bold uppercase tracking-wide leading-snug my-2'>
          Unlock Your Potential:{" "}
          <span className='text-primary'>Top Internships </span>
          Top Companies
        </h2>
        <p className='text-base tracking-wide text-secondary mt-2'>
          Bridging the gap between academia and industry, we connect talented
          students with top companies for transformative internship experiences.
        </p>
        <Button
          variant='default'
          className='rounded-full !tracking-wider !text-2xl !px-4 !py-3 mt-4'
        >
          Get Started
        </Button>
      </div>

      <div className='my-4' data-aos='fade-left'>
        <img
          src='/internship-illustration.png'
          alt='vector illustration image for internship'
          className='object-cover'
          loading='lazy'
        />
      </div>
    </div>
  );
}

export default Hero;
