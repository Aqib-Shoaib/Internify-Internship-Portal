// app/components/ContactPage.tsx or similar
import Form from "@/components/custom/page/contact/Form";
import ContactInfo from "@/components/custom/page/contact/ContactInfo";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export default function ContactPage() {
  return (
    <div className='grid md:grid-cols-2 gap-10'>
      <div className='col-span-2'>
        <Header />
      </div>
      <div className='mt-32 pl-20'>
        <h2 className='text-2xl font-bold mb-6'>Contact Us</h2>
        <Form />
      </div>

      {/* Contact Info */}
      <div className='mt-32 pr-20'>
        <h2 className='text-2xl font-bold mb-6'>Get in Touch</h2>
        <ContactInfo />
      </div>

      <div className='col-span-2'>
        <Footer />
      </div>
    </div>
  );
}
