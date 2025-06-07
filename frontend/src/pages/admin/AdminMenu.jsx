import React from "react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router";
const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } fixed p-2 rounded-lg bg-[#151515]`}
        onClick={ToggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes className="text-white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-[#151515] fixed top-5 right-7 p-4 rounded-lg">
          <ul className="mt-2 list-none text-white font-serif ">
            <li>
              <NavLink
                className={
                  " list-item py-2 px-3  mb-5 hover:bg-[#2E2D2D] rounded-sm     "
                }
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
                to={"/admin/dashboard"}
              >
                Admin Dashboard
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
