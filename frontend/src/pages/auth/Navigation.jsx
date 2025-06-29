import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import "./Navigation.css";
import FavoritesCount from "../Products/FavoritesCount";
const Navigation = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const ToggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };
  const ToggleSidebar = () => {
    setDropDownOpen(!showSidebar);
  };

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={` ${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4  text-white bg-black  w-[4%] hover:w-[15%] h-[100vh] fixed   `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          className="flex items-center transition-transform transform hover:translate-x-2"
          to={"/"}
        >
          <AiOutlineHome className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem] ">HOME</span>
        </Link>
        <Link
          className="flex items-center transition-transform transform hover:translate-x-2"
          to={"/shop"}
        >
          <AiOutlineShopping className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem] ">SHOP</span>
        </Link>
        <Link
          className="flex items-center transition-transform transform hover:translate-x-2"
          to={"/cart"}
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem] ">CART</span>
          {cartItems.length > 0 && (
            <div className="absolute top-9">
              <span>
                <span className="px-2 bg-pink-500 text-sm rounded-full py-0   ">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              </span>
            </div>
          )}
        </Link>
        <Link
          className="flex items-center transition-transform transform hover:translate-x-2"
          to={"/favorite"}
        >
          <FaHeart className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem] ">
            FAVORITES <FavoritesCount />
          </span>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={ToggleDropDown}
          className="flex items-center text-gray-800 focus:outline-none "
        >
          {userInfo ? (
            <span className="text-white">{userInfo.userName}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropDownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropDownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {dropDownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              className="flex items-center transition-transform transform hover:translate-x-2"
              to={"/login"}
            >
              <AiOutlineLogin className="mr-2 mt-[3rem] " size={26} />
              <span className="hidden nav-item-name mt-[3rem] ">LOGIN</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center transition-transform transform hover:translate-x-2"
              to={"/register"}
            >
              <AiOutlineUserAdd className="mr-2 mt-[3rem] " size={26} />
              <span className="hidden nav-item-name mt-[3rem]">REGISTER</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
