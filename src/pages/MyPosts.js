import Navbar from "../components/Navbar";
import PostSmall from "../components/PostSmall";
import Footer from "../components/Footer";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { base_url } from "../assets/data";
import axios from "axios";
import { format } from "date-fns";

function MyPosts() {
  const { isAuth } = useContext(AuthContext);
  if (isAuth === false) window.location.replace("/login");

  const [posts, setPosts] = useState([]);
  const name = localStorage.getItem("name");
  const photo = localStorage.getItem("photo");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        setLoading(true);
        const resp = await axios.get(`${base_url}posts/my`, config);
        let p = resp.data.response;
        p.map((post) => {
          post.date = format(new Date(post.date), "dd/MM/yyyy");
        });
        setPosts(p);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("[Get All posts]", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="w-[90%] flex px-3 py-2 items-center gap-10 bg-slate-50 rounded-md mb-5">
        <img src={photo} className="w-[100px] h-[100px] rounded-full" />
        <h1 className="text-3xl">Welcome {name}</h1>
      </div>
      <h1 className="my-3 text-2xl font-bold mb-5">Your Posts</h1>
      <div className="w-[100%] px-20 max-[500px]:px-5 max-[600px]:px-7 max-[700px]:px-10 max-[850px]:px-16 max-[1100px]:px-16 max-[1200px]:px-18 grid grid-flow-row grid-cols-1 min-[1300px]:grid-cols-3 min-[900px]:grid-cols-2">
        {posts.map((post, index) => {
          return <PostSmall key={index} post={post} />;
        })}
      </div>
    </>
  );
}

export default MyPosts;
