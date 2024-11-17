import React, { useEffect, useState } from "react";
import {
  AiFillCaretRight,
  AiFillInstagram,
  AiFillFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";
import axios from "axios";
import { base_url } from "../assets/data";
import { format } from "date-fns";
import Loader from "./Loader";
import { json, useLoaderData } from "react-router";

function Post(props) {
  const postDetails = useLoaderData();

  async function checkAndGo(str) {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const resp = await axios.get(`${base_url}post/${props.postid}`);
      if (resp.data.success) {
        if (str === "delete") {
          try {
            const response = await axios.delete(
              `${base_url}post/${props.postid}`,
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
          window.location = `/posts/${props.postid}/` + str;
        }
      } else console.log("Unauthorised request to modify post");
    } catch (err) {
      console.log(err);
    }
  }

  const shareHandler = async () => {
    try {
      await navigator.share({
        title: "Post from Aspire ",
        text: "I am lord",
        url: `${window.location.href}`,
      });
      alert("shared successfully");
      console.log("MDN shared successfully");
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <>
      <div className="w-[100%] pt-16 flex justify-center">
        <div className="box-border w-[70%] px-[5%] flex justify-between max-[1000px]:items-center max-[1000px]:w-[90%] max-[1000px]:flex-col">
          <div className="w-[70%] max-[1000px]:w-[100%] flex flex-col">
            <div className="w-[100%] mb-4">
              <img
                className="w-[100%] max-h-[500px]"
                src={postDetails.titleimage}
                alt="random post"
              />
            </div>
            <div className=" flex flex-row justify-between text-slate-600 pb-2">
              <p>{postDetails.date}</p>
              <p>{postDetails._author.name}</p>
            </div>
            <div className="">
              <div className="mb-5 text-2xl font-bold text-slate-700">
                <h3>{postDetails.title}</h3>
              </div>
              <div className="text-slate-500 text-lg whitespace-pre-line">
                <p>{postDetails.content}</p>
              </div>
            </div>
          </div>
          <div className="w-[20%] max-[1000px]:mt-16 max-[1000px]:w-[100%]">
            <div
              className="flex items-center justify-between text-2xl"
              onClick={() => shareHandler()}
            >
              <AiFillInstagram className="text-rose-600" />
              <AiFillFacebook className="text-blue-500" />
              <AiOutlineTwitter className="text-sky-500" />
            </div>
            <div>
              <h3 className="pt-5 pb-3 border-b text-slate-800">Categories</h3>
              {postDetails.tags &&
                postDetails.tags.map((tag, index) => {
                  return (
                    <p
                      key={index}
                      className="flex items-center justify-between text-slate-600 pt-2"
                    >
                      <span>{tag}</span>
                      <AiFillCaretRight />
                    </p>
                  );
                })}
            </div>
            {localStorage.getItem("name") === postDetails._author.name && (
              <div className="pt-8 flex flex-row gap-5 items-center">
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
    </>
  );
}

export default Post;

export const loader = async ({ params }) => {
  try {
    const resp = await axios.get(`${base_url}post/${params.id}`);
    if (resp.status > 399)
      return json({
        error: 404,
        message: "Could not fetch the requested post",
      });
    let p = resp.data.response;
    p.date = format(new Date(p.date), "dd/MM/yyyy");
    return p;
  } catch (err) {
    console.log(err);
    return json({ something: "die", error: err, message: err });
  }
};
