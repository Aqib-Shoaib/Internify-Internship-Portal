import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BACKEND_URL } from "@/constants";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const initialData = {
  name: "",
  email: "",
  message: "",
  subject: "",
};

function Form() {
  const [contactData, setContactData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  function handleInputChange(e) {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await axios.post(`${BACKEND_URL}/api/contact`, contactData);
    if (res.status == 200) {
      setContactData(initialData);
      toast.success("Your Message has been forwarded to Internify Admins");
    } else {
      toast.error("Your Message can not be sent right now!");
    }
    setLoading(false);
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit} disabled={loading}>
      <div>
        <label htmlFor='name' className='block text-sm font-medium mb-1'>
          Name
        </label>
        <Input
          id='name'
          name='name'
          value={contactData.name}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div>
        <label htmlFor='email' className='block text-sm font-medium mb-1'>
          Email
        </label>
        <Input
          id='email'
          type='email'
          name='email'
          value={contactData.email}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div>
        <label htmlFor='subject' className='block text-sm font-medium mb-1'>
          Subject
        </label>
        <Input
          id='subject'
          type='text'
          name='subject'
          value={contactData.subject}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div>
        <label htmlFor='message' className='block text-sm font-medium mb-1'>
          Message
        </label>
        <Textarea
          id='message'
          name='message'
          rows={5}
          value={contactData.message}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <Button type='submit' disabled={loading} className='w-full mt-4'>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}

export default Form;
