import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
export default function Signin() {
  const [formdata, setFormData] = useState({});
  // const [errorMes, setErrorMes] = useState(null);
  // const [loading, isLoading] = useState(false);
  const { loading, error: errorMes } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value.trim() });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      // return setErrorMes("Please Fill All Fields!");
      return dispatch(signInFailure("Please fill all fields!"));
    }
    try {
      // isLoading(true);
      // setErrorMes(null);
      dispatch(signInStart());
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        // isLoading(false);
        // return setErrorMes(data.message);
        dispatch(signInFailure(data.message));
      }
      //isLoading(false);
      if (res.ok === true) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  console.log(formdata);

  return (
    <div className="min-h-screen mt-60">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
        <div className="flex-1">
          <Link to="/" className=" text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-gray-300">
              BBYY
            </span>
            Blog
          </Link>
          <p className="mt-5 text-sm">
            Sign In with your Email and Password or use Google Account!
          </p>
        </div>
        <div className="flex-1">
          <form className=" flex flex-col gap-4" onSubmit={handleForm}>
            <div className="">
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="123@ABC.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Password..."
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span className="pl-4">Loading...</span>
                </>
              ) : (
                "SIGN IN"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="mt-5 flex gap-2 text-sm">
            <span>No Account Yet?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up Here!
            </Link>
          </div>
          {errorMes && (
            <Alert className="mt-5" color="failure">
              {errorMes}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
