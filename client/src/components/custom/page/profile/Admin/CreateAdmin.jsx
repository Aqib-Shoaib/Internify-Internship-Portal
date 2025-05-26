import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createAdmin } from "@/services/admin";
import { useState } from "react";
import toast from "react-hot-toast";

const INITIAL_ERROR =
  "Please note down the password to avoid issues while logging in";

function CreateAdmin() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(INITIAL_ERROR);
  const [loading, setLoading] = useState(false);

  async function handleCreateAdmin(e) {
    e.preventDefault();
    setLoading(true);
    const data = { name, email, password, confirmPassword };
    console.log(data);
    if (password !== confirmPassword) {
      setError("Password and Password Confirm do not match");
      setLoading(false);
      return;
    }
    const res = await createAdmin(data);
    if (res.status === 201) {
      toast.success("New Admin Created Successfully");
      setEmail("");
      setName("");
      setPassword("");
      setConfirmPassword("");
    } else {
      toast.error(res?.message);
      setError(res?.message);
    }

    setLoading(false);
  }
  return (
    <div className='p-0 md:p-6'>
      <h1 className='text-2xl md:text-3xl font-medium mb-4 md:mb-6'>
        Create a new Admin
      </h1>
      <Card data-aos='zoom-in'>
        <CardHeader>
          <CardTitle>Create Credentails for new admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action=''
            onSubmit={handleCreateAdmin}
            className='py-2 grid grid-cols-1 md:grid-cols-2 gap-2.5'
          >
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <Input
              type='password'
              placeholder='Password Confirm'
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className='md:col-span-2 flex items-center justify-center flex-col gap-1 mt-3'>
              <p className='text-xs'>{error}</p>
              <Button type='submit' disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateAdmin;
