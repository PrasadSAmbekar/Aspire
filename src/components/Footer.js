import {
  AiFillInstagram,
  AiFillFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-[100%]">
      <div className="w-[100%] h-auto flex flex-col gap-10 items-center mt-20 mb-16">
        <div className="w-[80%] h-fit py-8 flex flex-row justify-center gap-6 items-center bg-pink-50 px-5 max-[540px]:flex-col">
          <input
            type="text"
            className="h-fit px-4 py-3 w-[60%] h-auto text-slate-600 text-xl rounded-full border-2 border-gray-500 focus:outline-none focus:border-gray-600  max-[500px]:w-[90%]"
            placeholder="Enter your email"
          />
          <button className="h-fit text-center bg-amber-500 px-5 py-3 text-slate-50 rounded-full text-2xl tracking-wider font-sans max-[500px]:w-[90%] hover:scale-95 active:scale-90">
            Subscribe
          </button>
        </div>
        <div className=" flex flex-row justify-center items-center gap-4 mt-8 text-xl text-slate-700">
          <Link to="#" className="w-fit px-2 py-2 bg-gray-300 rounded-md">
            <AiFillFacebook className="text-blue-700" />
          </Link>
          <Link to="#" className="w-fit px-2 py-2 bg-gray-300 rounded-md">
            <AiFillInstagram className="text-pink-500" />
          </Link>
          <Link to="#" className="w-fit px-2 py-2 bg-gray-300 rounded-md">
            <AiOutlineTwitter className="text-blue-500" />
          </Link>
        </div>
        <div className="w-auto max-w-[100%] min-w-[60%] px-4 py-3 mt-4 rounded-full text-center bg-gray-200 text-slate-700 text-lg">
          Made by Sachin4219
        </div>
      </div>
    </footer>
  );
}

export default Footer;
