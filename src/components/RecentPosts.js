import PostSmall from "../components/PostSmall";
import React, { useEffect, useState } from "react";
import { base_url } from "../assets/data";
import axios from "axios";
import { format } from "date-fns";

function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(`${base_url}recent`);
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
    <div className="w-[100%] h-[auto] my-8">
      <h1 className="text-3xl text-center font-sans font-bold tracking-wider mb-8">
        Recent posts
      </h1>
      <div className="w-[100%] px-20 max-[500px]:px-5 max-[600px]:px-7 max-[700px]:px-10 max-[850px]:px-16 max-[1100px]:px-16 max-[1200px]:px-18 grid grid-flow-row grid-cols-1 min-[1300px]:grid-cols-3 min-[900px]:grid-cols-2">
        {posts.map((post, index) => {
          return <PostSmall key={index} post={post} />;
        })}
      </div>
    </div>
  );
}

export default RecentPosts;
