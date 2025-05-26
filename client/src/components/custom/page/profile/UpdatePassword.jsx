import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updatePassword } from "@/services/intern";
import { useState } from "react";
import toast from "react-hot-toast";

function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  async function update(e) {
    setloading(true);
    e.preventDefault();
    if (currentPassword.length !== 8) {
      setError("Your current Password should be of length 8");
      return;
    }
    if (newPassword.length !== 8) {
      setError("Your new Password should be of length 8");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password do not match");
      return;
    }

    const data = await updatePassword({ currentPassword, newPassword });
    if (data?.status === 400) {
      toast.error(data?.message || "Something went wrong");
    } else {
      toast.success("updated");
    }
    setloading(false);
    setnewPassword("");
    setCurrentPassword("");
    setconfirmPassword("");
  }

  return (
    <div className='p-0 md:p-6'>
      <h1 className='text-2xl md:text-3xl font-medium mb-4 md:mb-6'>
        Update Password
      </h1>

      <Card data-aos='zoom-in'>
        <CardHeader>
          <CardTitle>
            Do you know it is recommended to change passwords regularly!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action=''
            onSubmit={update}
            className='py-3 flex flex-col items-center justify-center gap-2.5'
          >
            <Input
              type='password'
              placeholder='Old Password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              type='password'
              placeholder='New Password'
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
            />
            <Input
              type='password'
              placeholder='Confirm New Password'
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />

            {error && <p className='text-lg text-destructive my-1'>{error}</p>}

            <Button type='submit' disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdatePassword;
