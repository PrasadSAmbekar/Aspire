import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PageNotFound() {
  return (
    <>
      <Navbar />
      <div className="flex flex-row h-[80%] justify-around w-[100%] px-6 items-center max-[1200px]:flex-col-reverse">
        <div className="h-[auto] w-[45%] flex flex-col justify-center items-start min-[720px]:pl-4 max-[1200px]:w-[65%] max-[1200px]:z-10 max-[1200px]:-translate-y-20 max-[1000px]:w-[75%] max-[800px]:w-[85%] ">
          <h1 className="text-6xl text-pink-600 py-1 font-extrabold">
            Whoops!
          </h1>
          <h1 className="text-6xl text-zinc-900 py-1 font-extrabold ">
            The page got lost in the Matrix.
          </h1>
          <p className="text-3xl font-light">
            No worries, just head back to our{" "}
            <Link to="/" className="font-medium text-sky-700">
              Home Page
            </Link>{" "}
            for awesome content our readers can't get enough of.
          </p>
        </div>
        <div className="h-[100%] w-[55%] max-[1200px]:w-[80%] max-[1000px]:w-[90%] max-[720px]:hidden ">
          <img
            className="h-[90%]"
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="404"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PageNotFound;
