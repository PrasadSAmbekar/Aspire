import Navbar from "../components/Navbar";
import PostSmall from "../components/PostSmall";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import { base_url } from "../assets/data";
import axios from "axios";
import { format } from "date-fns";
import { ImSearch } from "react-icons/im";
import { json } from "react-router";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(`${base_url}posts`);
        let p = resp.data.response;
        p.map((post) => {
          post.date = format(new Date(post.date), "dd/MM/yyyy");
        });
        setPosts(p);
        setLoading(false);
      } catch (error) {
        console.log("[Get All posts]", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full flex justify-center h-auto py-2 my-4 items-center">
        <div className="w-min-[250px] w-[50%] pl-5 border-1 h-auto rounded-l-full bg-blue-50">
          <input
            className="w-full py-2 pl-1 pr-1 text-2xl focus:outline-none bg-blue-50"
            type="text"
            placeholder="New World"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
        </div>
        <div className="text-2xl py-3 pl-1 pr-3 text-slate-500 rounded-r-full bg-blue-50">
          <ImSearch />
        </div>
      </div>
      <div className="w-[100%] px-20 max-[500px]:px-5 max-[600px]:px-7 max-[700px]:px-10 max-[850px]:px-16 max-[1100px]:px-16 max-[1200px]:px-18 grid grid-flow-row grid-cols-1 min-[1300px]:grid-cols-3 min-[900px]:grid-cols-2">
        {posts
          .filter((post) => {
            return query.toLowerCase() === ""
              ? post
              : post.title.toLowerCase().includes(query.toLowerCase());
          })
          .map((post, index) => {
            return <PostSmall key={index} post={post} />;
          })}
      </div>
    </>
  );
}

export default AllPosts;

export const loader = async () => {
  try {
    const resp = await axios.get(`${base_url}posts`);
    if (resp.statusText != "OK")
      return json({
        error: 500,
        message: "Could not fetch posts",
      });
    let p = resp.data.response;
    p.map((post) => {
      post.date = format(new Date(post.date), "dd/MM/yyyy");
    });
    return p;
  } catch (err) {
    return json({ error: 500, message: "Could not fetch posts" });
  }
};
