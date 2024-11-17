import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

function SinglePost() {
  let { id } = useParams();
  return <Post postid={id} />;
}

export default SinglePost;
