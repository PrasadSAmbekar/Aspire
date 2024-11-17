import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { base_url } from "../assets/data";
import { AuthContext } from "../AuthContext";
import { useParams } from "react-router";
import Footer from "../components/Footer";

function UpdatePost(props) {
  let { id } = useParams();

  const [title, setTitle] = useState("");
  const [titleimage, setTitleimage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [tagsArr, setTagsArr] = useState([]);

  const { isAuth } = useContext(AuthContext);
  if (isAuth === false) window.location.replace("/login");

  async function submitHandler(e) {
    e.preventDefault();
    const data = {
      title: title,
      titleimage: titleimage,
      content: content,
      tags: tagsArr,
    };
    console.log(data);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const resp = await axios.put(`${base_url}post/${id}`, data, config);
      if (resp.data.success) {
        console.log("Success");
        window.location = "/";
      } else {
        console.log("failure");
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleChangeTag = (e) => {
    const val = e.target.value;
    if (val.at(-1) === ",") {
      setTagsArr([...tagsArr, val.split(",")[0]]);
      setTags("");
    } else {
      setTags(val);
    }
  };
  return (
    <>
      <form
        className="w-[50%] py-10 flex flex-col justify-center items-center gap-8 border-2 border-gray-300 rounded-md outline-none"
        onSubmit={submitHandler}
      >
        <div className="h-fit w-[80%]">
          <label
            className="text-left text-lg font-bold text-gray-600"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="focus:scale-95 text-xl w-[100%] h-[46px] px-3 py-2 border-2 border-gray-300 rounded-md outline-none focus:border-gray-400"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My First Post"
          />
        </div>
        <div className="h-fit w-[80%]">
          <label
            className="text-left text-lg font-bold text-gray-600"
            htmlFor="titleimage"
          >
            Title image
          </label>
          <input
            className="focus:scale-95 text-xl w-[100%] h-[46px] px-3 py-2 border-2 border-gray-300 rounded-md outline-none focus:border-gray-400"
            type="text"
            id="titleimage"
            value={titleimage}
            onChange={(e) => setTitleimage(e.target.value)}
            placeholder="https://randomimage.com/cats-in-the-cradle/1"
          />
        </div>
        <div className="h-fit w-[80%]">
          <label
            className="text-left text-lg font-bold text-gray-600"
            htmlFor="content"
          >
            Content
          </label>
          <input
            className="focus:scale-95 text-xl w-[100%] h-[46px] px-3 py-2 border-2 border-gray-300 rounded-md outline-none focus:border-gray-400"
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Lorem Ipsum dolor sit amet"
          />
        </div>
        <div className="h-fit w-[80%]">
          <label
            className="text-left text-lg font-bold text-gray-600"
            htmlFor="tags"
          >
            Tags
          </label>
          <input
            className="focus:scale-95 text-xl w-[100%] h-[46px] px-3 py-2 border-2 border-gray-300 rounded-md outline-none focus:border-gray-400"
            type="text"
            id="title"
            value={tags.split(",").at(-1)}
            onChange={handleChangeTag}
            placeholder="My First Post"
          />
          {/* <div className="text-xl w-[100%] h-[46px] px-3 py-2 border-2 border-gray-300 rounded-md outline-none focus:border-gray-400"></div> */}
          <div className="mt-2">
            <Tags tags={tagsArr} setTags={setTagsArr}></Tags>
          </div>
        </div>
        <button
          className="w-fit h-fit px-5 py-3 text-lg font-bold text-slate-50 rounded-md border-none outline-none bg-blue-600"
          type="submit"
        >
          Update Post
        </button>
      </form>
    </>
  );
}

const Tags = ({ tags, setTags }) => {
  if (tags.length === 0) return;
  const handleClick = (idx) => {
    setTags([...tags.slice(0, idx), ...tags.slice(idx + 1)]);
  };
  return (
    <div className="flex flex-wrap">
      {tags.map((tag, idx) => {
        if (tag === "") return;
        return (
          <div className="flex gap-1 w-fit m-1 border-2 border-blue-500 px-2 py-0.5 rounded bg-gray-100 text-sm font-medium">
            {tag}
            <div onClick={() => handleClick(idx)}>✖️</div>
          </div>
        );
      })}
    </div>
  );
};
export default UpdatePost;
