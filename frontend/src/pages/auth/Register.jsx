import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
const Register = () => {
  // ---------- manage the data of form ------
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --------- redirection of url -----------
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // -----------   logic of register when submitting   ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password do not match each other");
    } else {
      try {
        const res = await Register({ userName, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (error) {
        console.error(error);
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <section className="pl-[10rem]   flex flex-wrap  ">
      <div className="mr-[4rem ] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4 ">Register</h1>

        <form onSubmit={handleSubmit} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-black"
            >
              {" "}
              userName
            </label>
            <input
              type="text "
              id="userName"
              className="mt-1 p-2 border rounded w-full "
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              {" "}
              email adress
            </label>
            <input
              type="email "
              id="email"
              className="mt-1 p-2 border rounded w-full "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              {" "}
              Password
            </label>
            <input
              type="password "
              id="password"
              className="mt-1 p-2 border rounded w-full "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-black"
            >
              {" "}
              Confirm Password
            </label>
            <input
              type="password "
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-full "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] "
            disabled={isLoading}
          >
            {isLoading ? "Register ..." : "Register"}
          </button>
          {isLoading && <Loader />}
        </form>
        <div className="mt-4">
          <p className="text-black ">
            Already have Account?
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
