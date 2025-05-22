import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function UpdatePassword() {
  return (
    <div className='p-0 md:p-6'>
      <h1 className='text-2xl md:text-3xl font-medium mb-4 md:mb-6'>
        Update Password
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>
            Do you know it is recommended to change passwords regularly!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action=''
            className='py-3 flex flex-col items-center justify-center gap-2.5'
          >
            <Input type='password' placeholder='Old Password' />
            <Input type='password' placeholder='New Password' />
            <Input type='password' placeholder='Confirm New Password' />

            <Button>Update Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdatePassword;
