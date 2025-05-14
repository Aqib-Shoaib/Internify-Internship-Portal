import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function Form() {
  return (
    <form className='space-y-4'>
      <div>
        <label htmlFor='name' className='block text-sm font-medium mb-1'>
          Name
        </label>
        <Input id='name' placeholder='Your name' />
      </div>

      <div>
        <label htmlFor='email' className='block text-sm font-medium mb-1'>
          Email
        </label>
        <Input id='email' type='email' placeholder='you@example.com' />
      </div>

      <div>
        <label htmlFor='phone' className='block text-sm font-medium mb-1'>
          Phone Number
        </label>
        <Input id='phone' type='tel' placeholder='+1 (123) 456-7890' />
      </div>

      <div>
        <label htmlFor='message' className='block text-sm font-medium mb-1'>
          Message
        </label>
        <Textarea
          id='message'
          placeholder='Write your message here...'
          rows={5}
        />
      </div>

      <Button type='submit' className='w-full mt-4'>
        Submit
      </Button>
    </form>
  );
}

export default Form;
