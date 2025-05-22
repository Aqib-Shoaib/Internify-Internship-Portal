// app/components/ContactPage.tsx or similar
import Form from "@/components/custom/page/contact/Form";
import ContactInfo from "@/components/custom/page/contact/ContactInfo";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export default function ContactPage() {
  return (
    <div className='grid md:grid-cols-2 gap-5 md:gap-10'>
      <div className='col-span-2'>
        <Header />
      </div>
      <div
        className='mt-32 pl-5 pr-5 md:pr-0 md:pl-20 col-span-2 md:col-span-1'
        data-aos='fade-right'
      >
        <h2 className='text-2xl font-bold mb-6'>Contact Us</h2>
        <Form />
      </div>

      {/* Contact Info */}
      <div
        className='mt-10 md:mt-32 pr-5 md:pr-20 pl-5 md:pl-0 col-span-2 md:col-span-1'
        data-aos='fade-left'
      >
        <h2 className='text-2xl font-bold mb-6'>Get in Touch</h2>
        <ContactInfo />
      </div>

      <div className='col-span-2'>
        <Footer />
      </div>
    </div>
  );
}
