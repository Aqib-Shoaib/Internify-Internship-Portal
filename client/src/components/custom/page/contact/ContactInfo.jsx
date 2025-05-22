import { Mail, Phone, MapPin } from "lucide-react";
function ContactInfo() {
  return (
    <ul className='space-y-4 text-sm md:text-base'>
      <li className='flex flex-col items-start gap-1'>
        <div className='flex gap-3 items-center'>
          <MapPin className='text-muted-foreground mt-1' size={20} />
          <h3>Address</h3>
        </div>
        <span className='text-input text-lg md:text-2xl font-bold'>
          1234 Example Street
          <br />
          City, Country 12345
        </span>
      </li>
      <li className='flex flex-col items-start gap-1'>
        <div className='flex gap-3 items-center'>
          <Phone className='text-muted-foreground' size={20} />
          <h3>Phone</h3>
        </div>
        <span className='text-input text-lg md:text-2xl font-bold'>
          +1 (555) 123-4567
        </span>
      </li>
      <li className='flex items-start flex-col gap-1'>
        <div className='flex gap-3 items-center'>
          <Mail className='text-muted-foreground' size={20} />
          <h3>Email</h3>
        </div>
        <span className='text-input text-lg md:text-2xl font-bold'>
          support@example.com
        </span>
      </li>
    </ul>
  );
}

export default ContactInfo;
