import { useState } from "react";
import { FaBars, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { user, logOut } = useAuth();
  const loggedIn = user != null;
  const mobileCss =
    "hover:bg-white hover:font-bold hover:text-black p-1 rounded-lg font-medium cursor-pointer";
  const links = (
    <>
      <li>
        <NavLink
          to={`/`}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold border-b-2 border-blue-600"
              : "hover:text-blue-600 hover:font-semibold"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/queries/all`}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold border-b-2 border-blue-600"
              : "hover:text-blue-600 hover:font-semibold"
          }
        >
          Queries
        </NavLink>
      </li>

      <li>
        <NavLink
          to={`/pages/about`}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold border-b-2 border-blue-600"
              : "hover:text-blue-600 hover:font-semibold"
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/pages/faq`}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold border-b-2 border-blue-600"
              : "hover:text-blue-600 hover:font-semibold"
          }
        >
          FAQ
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/pages/contact`}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold border-b-2 border-blue-600"
              : "hover:text-blue-600 hover:font-semibold"
          }
        >
          Contact
        </NavLink>
      </li>
      {loggedIn && (
        <>
          <li>
            <details>
              <summary className="font-bold">
                {" "}
                <FaUser className="text-blue-600" /> User Dashboard
              </summary>
              <ul className="p-2">
                <li>
                  <NavLink
                    to={`/queries/recommendation`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-bold border-b-2 border-blue-600"
                        : "hover:text-blue-600 hover:font-semibold"
                    }
                  >
                    Recommendations For Me
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/queries/myqueries`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-bold border-b-2 border-blue-600"
                        : "hover:text-blue-600 hover:font-semibold"
                    }
                  >
                    My Queries
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/queries/myrecommendations`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-bold border-b-2 border-blue-600"
                        : "hover:text-blue-600 hover:font-semibold"
                    }
                  >
                    My Recommendations
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/user`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-bold border-b-2 border-blue-600"
                        : "hover:text-blue-600 hover:font-semibold"
                    }
                  >
                    My Profile
                  </NavLink>
                </li>
              </ul>
            </details>
          </li>
        </>
      )}
    </>
  );
  return (
    <section className="bg-blue-50 shadow-md ">
      <div className="mx-auto px-4 flex justify-between items-center py-3 space-x-2">
        {/* Left Title/Logo Section */}
        <NavLink to={"/"}>
          <div className="flex items-center space-x-2">
            <FaMessage className="text-3xl text-blue-600" />
            <span className="text-black text-2xl font-semibold font-barlow">
              {import.meta.env.VITE_NAME || "ProRecommendation"}
            </span>
          </div>
        </NavLink>
        {/* Mid Nav Section */}
        <nav className="hidden md:flex space-x-2 text-gray-600 menu menu-horizontal px-1 justify-center">
          {links}
        </nav>

        {/* Right Nav Section */}
        <div className="flex">
          {/* Buttons */}
          <div className="hidden md:flex items-center">
            {loggedIn == false ? (
              <button className="border border-blue-500 text-blue-500 px-3 py-2 rounded-md hover:bg-blue-50">
                <NavLink
                  to={"/auth/login"}
                  className="inline-flex items-center gap-2"
                >
                  {" "}
                  <FaSignInAlt /> Login{" "}
                </NavLink>
              </button>
            ) : (
              <div className="flex items-center space-x-2 ">
                <NavLink to={`/user`}>
                  <div className="flex items-center rounded-xl border border-blue-600 px-2 py-1">
                    {" "}
                    <img
                      src={user.photoURL}
                      className="w-10 h-9 rounded-xl font-bold mr-1"
                      alt=""
                    />{" "}
                    {user.displayName}
                  </div>
                </NavLink>

                <button className="border border-blue-500 text-blue-500 px-3 py-2 rounded-md hover:bg-blue-50">
                  <NavLink
                    onClick={logOut}
                    className="inline-flex items-center gap-2"
                  >
                    {" "}
                    <FaSignOutAlt /> Logout{" "}
                  </NavLink>
                </button>
              </div>
            )}
          </div>
          {/* Mobile Nav */}
          <div className="md:hidden flex items-center space-x-4 ">
            <span
              className="cursor-pointer bg-slate-100 p-2 rounded-xl"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? "X" : <FaBars className="text-2xl" />}
            </span>
            <div
              className={`${
                toggle ? "flex" : "hidden"
              } p-1 bg-blue-300 absolute top-16 right-1 mx-4 my-2 z-10 rounded-xl `}
            >
              <ul className="list-none flex flex-col justify-end items-start gap-1 ">
                <li
                  className={mobileCss}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <NavLink to={`/`}>Home</NavLink>
                </li>
                <li
                  className={mobileCss}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <NavLink to={`/queries/all`}>Queries</NavLink>
                </li>

                {loggedIn && (
                  <>
                    <li
                      className={mobileCss}
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      <NavLink to={`/queries/recommendation`}>
                        Recommendations For Me
                      </NavLink>
                    </li>
                    <li
                      className={mobileCss}
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      <NavLink to={`/queries/myqueries`}>My Queries</NavLink>
                    </li>
                    <li
                      className={mobileCss}
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      <NavLink to={`/queries/myrecommendations`}>
                        My Recommendations
                      </NavLink>
                    </li>
                    <li
                      className={mobileCss}
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      <NavLink to={`/user`}>Profile</NavLink>
                    </li>
                    <li
                      className={mobileCss}
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      <NavLink onClick={logOut}>Logout</NavLink>
                    </li>
                  </>
                )}
                {!loggedIn && (
                  <li
                    className={mobileCss}
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  >
                    <NavLink to={`/auth/login`}>Login</NavLink>
                  </li>
                )}
                <li
                  className={mobileCss}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <NavLink to={`/pages/about`}>About</NavLink>
                </li>
                <li
                  className={mobileCss}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <NavLink to={`/pages/faq`}>FAQ</NavLink>
                </li>
                <li
                  className={mobileCss}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <NavLink to={`/pages/contact`}>Contact</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
