import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../../AuthProvider/AuthContext";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log("Sign Out successful"))
      .catch((error) => console.log(error));
  };

  const publicLinks = (
    <>
      <NavLink
        className="text-white text-lg font-semibold"
        to="/"
        onClick={() => setIsOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        className="text-white text-lg font-semibold"
        to="/available-foods"
        onClick={() => setIsOpen(false)}
      >
        Available Foods
      </NavLink>
      <NavLink
        className="text-white text-lg font-semibold"
        to="/addfood"
        onClick={() => setIsOpen(false)}
      >
        Add Food
      </NavLink>
    </>
  );

  const privateLinks = (
    <>
      {publicLinks}
      <NavLink
        className="text-white text-lg font-semibold"
        to="/addfood"
        onClick={() => setIsOpen(false)}
      >
        Add Food
      </NavLink>
      <NavLink
        className="text-white text-lg font-semibold"
        to="/myfoods"
        onClick={() => setIsOpen(false)}
      >
        Manage My Foods
      </NavLink>
      <NavLink
        className="text-white text-lg font-semibold"
        to={`/requests/${user?.email}`}
        onClick={() => setIsOpen(false)}
      >
        My Food Request
      </NavLink>
    </>
  );

  return (
    <nav className="bg-[#FF6B6B] sticky top-0 w-full shadow-sm z-50 mb-10">
      <div className="max-w-[90%] mx-auto p-4 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            className="h-12 w-12 rounded-full"
            src="https://i.postimg.cc/6QBmwJk9/Screenshot-2025-07-17-143220.png"
            alt="Logo"
          />
          <h1 className="text-3xl font-medium text-white">
            Share<span className="text-black">Plate</span>
          </h1>
        </div>

        <div className="hidden lg:flex gap-10 items-center">
          {user ? privateLinks : publicLinks}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="text-lg font-semibold text-white border border-white px-4 py-2 rounded-sm hover:bg-white hover:text-[#FF6B6B]"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="ml-2 text-lg font-semibold text-white border border-white px-4 py-2 rounded-sm hover:bg-white hover:text-[#FF6B6B]"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <Link to="/profile">
                <img
                  className="rounded-full h-12 w-12 border-2 border-white"
                  src={user.photoURL}
                  alt="Profile"
                />
              </Link>
              <button
                onClick={handleSignOut}
                className="ml-2 text-lg font-semibold text-white border border-white px-4 py-2 rounded-sm hover:bg-white hover:text-[#FF6B6B]"
              >
                Log out
              </button>
            </>
          )}
        </div>

        <div className="lg:hidden">
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-[#FF6B6B]">
          {user ? privateLinks : publicLinks}

          {!user ? (
            <>
              <NavLink
                to="/login"
                className="text-lg font-semibold text-white border border-white px-4 py-2 rounded-sm hover:bg-white hover:text-[#FF6B6B]"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-lg font-semibold text-white border border-white px-4 py-2 rounded-sm hover:bg-white hover:text-[#FF6B6B]"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <div className="relative group">
                <img
                  className="rounded-full h-12 w-12 cursor-pointer border-2 border-white"
                  src={user.photoURL}
                  alt="Profile"
                />
                <div className="absolute right-0 mt-2 hidden group-hover:flex flex-col bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[180px]">
                  <span className="px-4 py-2 text-gray-700 font-medium border-b">
                    {user.displayName}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-left text-red-600 hover:bg-red-50 hover:text-red-800"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
