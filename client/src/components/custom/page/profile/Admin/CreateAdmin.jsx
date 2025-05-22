import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function CreateAdmin() {
  return (
    <div className='p-0 md:p-6'>
      <h1 className='text-2xl md:text-3xl font-medium mb-4 md:mb-6'>
        Create a new Admin
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Create Credentails for new admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action=''
            className='py-2 grid grid-cols-1 md:grid-cols-2 gap-2.5'
          >
            <Input type='email' placeholder='Email' />
            <Input type='text' placeholder='Username' />
            <Input type='password' placeholder='Password' />
            <Input type='password' placeholder='Password Confirm' />

            <div className='md:col-span-2 flex items-center justify-center flex-col gap-1 mt-3'>
              <p className='text-xs'>
                Please note down the password to avoid issues while logging in
              </p>
              <Button>Create</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateAdmin;
