import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5 ">
        <div className="flex-1">
          <Link to="/" className=" text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-gray-300">
              BBYY
            </span>
            Blog
          </Link>
          <p className="mt-5 text-sm">
            Sign Up with your Email and Password or use Google Account!
          </p>
        </div>
        <div className="flex-1">
          <form className=" flex flex-col gap-4">
            <div>
              <Label value="User Name" />
              <TextInput type="text" placeholder="Username..." id="username" />
            </div>
            <div className="">
              <Label value="Email" />
              <TextInput type="text" placeholder="123@ABC.com" id="email" />
            </div>
            <div className="">
              <Label value="Password" />
              <TextInput type="text" placeholder="Password..." id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              SIGN UP
            </Button>
          </form>
          <div className="mt-5 flex gap-2 text-sm">
            <span>Already had an account?</span>
            <Link to="./signin" className="text-blue-500">
              Sign In Here!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
