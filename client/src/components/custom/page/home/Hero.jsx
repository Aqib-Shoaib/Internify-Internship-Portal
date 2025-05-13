import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <div className='w-full bg-gradient-to-b from-gray-700 via-gray-200 to-white py-8 px-4 md:grid md:grid-cols-[45%_45%] md:gap-[7%] md:place-items-center md:px-16'>
      <div data-aos='fade-right'>
        <h2 className='text-3xl md:text-4xl font-bold uppercase tracking-wide leading-snug my-2'>
          Unlock Your Potential:{" "}
          <span className='text-gray-200'>Top Internships </span>
          Top Companies
        </h2>
        <p className='text-base tracking-wide text-gray-800 mt-2'>
          Bridging the gap between academia and industry, we connect talented
          students with top companies for transformative internship experiences.
        </p>
        <Button
          variant='default'
          className='mt-4 rounded-full px-6 py-3 text-base tracking-wide transition-all translate-y-2 hover:translate-y-0'
        >
          Get Started
        </Button>
      </div>

      <div className='my-4' data-aos='fade-left'>
        <img
          src='/internship-illustration.png'
          alt='vector illustration image for internship'
          className='object-cover filter sepia'
          loading='lazy'
        />
      </div>
    </div>
  );
}

export default Hero;
