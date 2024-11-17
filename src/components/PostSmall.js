import { Link } from "react-router-dom";
import profile from "../assets/profile.png";
import axios from "axios";
import { base_url } from "../assets/data";

function PostSmall(props) {
  async function checkAndGo(str) {
    const token = localStorage.getItem("token");
    if (str === "delete") {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.delete(
          `${base_url}post/${props.post._id}`,
          config
        );
        if (response.data.success) {
          console.log("successfully deleted");
          window.location = "/posts";
        } else {
          console.log("Failure to delete");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      window.location = `/posts/${props.post._id}/` + str;
    }
  }

  return (
    <div className="flex flex-col px-8 py-3">
      <div className="w-[100%] h-[250px] rounded-md pb-3">
        <img
          className="w-[100%] h-[100%] object-cover rounded-md"
          src={props.post.titleimage}
          alt="random post"
        />
      </div>
      <div className="flex flex-col mt-2">
        <div className="flex flex-row text-sm pb-2">
          <p className="font-bold text-slate-800">
            {props.post.tags.join(", ")}
          </p>
          <p className="mx-2"> - </p>
          <p className="text-slate-600">{props.post.date}</p>
        </div>
        <Link to={`/posts/${props.post._id}`}>
          <div className="font-sans">
            <div className="mb-3 text-lg font-extrabold text-slate-800 leading-6">
              <h3>{props.post.title}</h3>
            </div>
          </div>
          <div className="text-slate-500 text-sm font-normal tracking-wider whitespace-pre-line mb-2">
            <p>
              {props.post.content.slice(0, 90)}
              {props.post.content.length > 90 && (
                <>
                  ...
                  <button className="text-sm font-medium text-sky-700 hover:text-sky-600">
                    Read More
                  </button>
                </>
              )}
            </p>
          </div>
        </Link>
        <div className="w-[100%] flex flex-row justify-between h-auto min-h-[50px] max-[500px]:flex-col max-[500px]:gap-5">
          <div className="flex flex-row gap-5 items-center">
            <img src={profile} className="w-[40px]"></img>
            <p className="text-md text-slate-700">{props.post._author.name}</p>
          </div>
          {localStorage.getItem("name") === props.post._author.name && (
            <div className="flex flex-row gap-5 items-center">
              <button
                onClick={() => checkAndGo("update")}
                className="h-fit w-fit px-2 py-1 text-md font-medium text-slate-50 bg-yellow-500 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => checkAndGo("delete")}
                className="w-fit h-fit px-2 py-1 text-md font-medium text-slate-50 bg-red-500 rounded-md"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostSmall;
