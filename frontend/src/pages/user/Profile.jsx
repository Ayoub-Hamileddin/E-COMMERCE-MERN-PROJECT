import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader.jsx";
import { setCredentials } from "../../redux/features/auth/authSlice";
const Profile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.userName);
    setEmail(userInfo.email);
  }, [userInfo.userName, userInfo.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password do not match each other");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          userName,
          password,
        }).unwrap();
        console.log(res);

        dispatch(setCredentials({ ...res }));
        toast.success("update profile successfuly");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  return (
    <div className="container mx-auto p-4 mt-[10rem] ">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3 ">
          <h2 className="text-2xl font-semibold mb-4 text-center ">
            Update Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="text-black block mb-2 font-bold"
              >
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter your Name"
                className=" form-input w-full p-4 rounded-sm placeholder:font-serif border-2 "
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="text-black block mb-2 font-bold "
              >
                Email:
              </label>
              <input
                type="text"
                placeholder="Enter your Email"
                className=" form-input w-full p-4 rounded-sm placeholder:font-serif border-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="text-black block mb-2 font-bold"
              >
                Password:
              </label>
              <input
                type="text"
                placeholder="Enter your Password"
                className=" form-input w-full p-4 rounded-sm placeholder:font-serif border-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="text-black block mb-2 font-bold placeholder:font-serif"
              >
                Confirm Password:
              </label>
              <input
                type="text"
                placeholder="Confirm your Password"
                className=" form-input w-full p-4 rounded-sm placeholder:font-serif border-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
              >
                Update
              </button>
              <Link
                to={"/user-orders"}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                My orders
              </Link>
            </div>
          </form>
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
