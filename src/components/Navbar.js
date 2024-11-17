import { useContext, useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineMenu,
} from "react-icons/ai";

import profile from "../assets/profile.png";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Navbar(props) {
  const [isopen, setIsopen] = useState(false);
  const { isAuth } = useContext(AuthContext);

  const name = localStorage.getItem("name");
  const photo = localStorage.getItem("photo");

  return (
    <div className="w-[100%] h-[60px] py-4 px-4 flex flex-row justify-around items-center border-b-2 border-gray-300 shadow-md shadow-slate-300 max-[800px]:h-auto max-[800px]:flex-col mb-10">
      <div className="w-fit px-4 text-2xl font-bold font-sans max-[800px]:w-[100%] max-[800px]:flex max-[800px]:justify-between ">
        <NavLink to="/">Aspire</NavLink>
        <div
          className="min-[800px]:hidden w-fit text-xl font-bold px-2 py-2 rounded-t-md hover:scale-95 active:scale-90"
          onClick={() => setIsopen(!isopen)}
        >
          <AiOutlineMenu />
        </div>
      </div>
      <div
        className={`w-fit px-4 text-lg font-sans flex flex-row gap-5 max-[800px]:hidden tracking-wider`}
      >
        <NavLink
          className={({ isActive }) =>
            `hover:scale-95 active:scale:90 px-2 rounded-t-md flex hover:bg-sky-100 ${
              isActive ? "border-b-2 border-red-200" : ""
            }`
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `hover:scale-95 active:scale:90 px-2 rounded-t-md flex hover:bg-sky-100 ${
              isActive ? "border-b-2 border-red-200" : ""
            }`
          }
          to="/posts"
        >
          Posts
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `hover:scale-95 active:scale:90 px-2 rounded-t-md flex hover:bg-sky-100 ${
              isActive ? "border-b-2 border-red-200" : ""
            }`
          }
          to="/posts/new"
        >
          Create Post
        </NavLink>

        {isAuth === false ? (
          <div className="w-fit px-5 text-xl flex flex-row gap-5 tracking-wide font-sans">
            <NavLink
              className={({ isActive }) =>
                `hover:scale-95 active:scale:90 px-2 rounded-t-md flex hover:bg-sky-100 ${
                  isActive ? "border-b-2 border-red-200" : ""
                }`
              }
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `hover:scale-95 active:scale:90 px-2 rounded-t-md flex hover:bg-sky-100 ${
                  isActive ? "border-b-2 border-red-200" : ""
                }`
              }
              to="/register"
            >
              SignUp
            </NavLink>
          </div>
        ) : (
          <div className="w-fit px-5 text-xl flex flex-row">
            <NavLink
              to="/posts/my"
              className={({ isActive }) =>
                `hover:scale-95 active:scale:90 px-2 rounded-t-md flex hover:bg-sky-100 ${
                  isActive ? "border-b-2 border-red-200" : ""
                }`
              }
            >
              <img src={photo || profile} className="w-[32px] mr-3"></img>
              <p className="text-md text-slate-700 mr-6">{name}</p>
            </NavLink>
            <NavLink
              href="/"
              className="hover:bg-sky-100 rounded-t-md px-2 hover:scale-95 active:scale-90"
              onClick={() => localStorage.clear()}
            >
              Logout
            </NavLink>
          </div>
        )}
      </div>
      {isopen && (
        <div
          className={` pt-2 px-4 text-xl font-sans flex gap-5 w-[100%] flex-col min-[800px]:hidden`}
        >
          <NavLink
            className={({ isActive }) =>
              `hover:scale-95 active:scale:90 px-2 rounded-t-md flex hover:bg-sky-100 ${
                isActive ? "border-b-2 border-red-200" : ""
              }`
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hover:scale-95 active:scale:90 px-2 rounded-t-md flex hover:bg-sky-100 ${
                isActive ? "border-b-2 border-red-200" : ""
              }`
            }
            to="/posts"
          >
            Posts
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hover:scale-95 active:scale:90 px-2 rounded-t-md flex hover:bg-sky-100 ${
                isActive ? "border-b-2 border-red-200" : ""
              }`
            }
            to="/posts/new"
          >
            Create Post
          </NavLink>

          {isAuth === false ? (
            <div className="w-[100%] text-xl flex flex-col gap-5 tracking-wide font-sans">
              <NavLink
                className={({ isActive }) =>
                  `hover:scale-95 active:scale:90 px-2 rounded-t-md flex hover:bg-sky-100 ${
                    isActive ? "border-b-2 border-red-200" : ""
                  }`
                }
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `hover:scale-95 active:scale:90 px-2 rounded-t-md flex hover:bg-sky-100 ${
                    isActive ? "border-b-2 border-red-200" : ""
                  }`
                }
                to="/register"
              >
                SignUp
              </NavLink>
            </div>
          ) : (
            <div className="w-[100%] text-xl flex flex-col gap-5 tracking-wide font-sans">
              <NavLink
                to="/posts/my"
                className={({ isActive }) =>
                  `hover:scale-95 active:scale:90 px-2 rounded-t-md flex hover:bg-sky-100 ${
                    isActive ? "border-b-2 border-red-200" : ""
                  }`
                }
              >
                <img src={photo || profile} className="w-[32px]"></img>
                <p className="text-md text-slate-700">{name}</p>
              </NavLink>
              <NavLink
                href="/"
                className="hover:bg-sky-100 rounded-t-md px-2 hover:scale-95 active:scale-90"
                onClick={() => localStorage.clear()}
              >
                Logout
              </NavLink>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
