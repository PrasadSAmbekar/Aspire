import styles from "./Register.module.css";
import transparent from "../assets/transparent.png";
import axios from "axios";
import { Link } from "react-router-dom";
// import {useNavigate} from "react-router-dom"
import { base_url } from "../assets/data";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import profile from "../assets/profile.png";
import { MdModeEdit } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Compressor from "compressorjs";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postImage, setPostImage] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  // function isValidEmail(email) {
  //   console.log(/\S+@\S+\.\S+/.test(email));
  // }

  function fireError() {
    const failMessage = document.getElementById("messages");
    failMessage.style.visibility = "visible";
    setTimeout(() => {
      failMessage.style.visibility = "hidden";
    }, 2000);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = base_url + "register";
    try {
      const response = await axios.post(url, {
        name,
        username,
        photo: postImage,
        bio,
        email,
        password,
      });
      if (response.data.success) {
        console.log(response.data);
        localStorage.setItem("token", response.data.response.token);
        localStorage.setItem("photo", response.data.response.photo);
        localStorage.setItem("name", response.data.response.name);
        localStorage.setItem("email", response.data.response.email);
        setMessage("success");
        fireError();
        window.location = "/posts";
      } else {
        setMessage(response.data.msg);
        fireError();
      }
    } catch (err) {
      setMessage(err.response.data.msg);
      fireError();
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (file) {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        return undefined;
      }
    });
  };

  const compressImage = (compressedImage) => {
    const base64 = convertToBase64(compressedImage);
    console.log(base64);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log(reader.result);
      setPostImage(reader.result);
    });
    reader.readAsDataURL(compressedImage);
    // setPostImage(base64);
    // return file;
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          compressImage(result);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.message} id="messages">
        {message === "success" ? (
          <div className={styles.successMessage}>Registered Successfully</div>
        ) : (
          <div className={styles.errorMessage}>{message}</div>
        )}
      </div>
      <div className={styles.heading}>
        <img src={transparent} alt="website logo"></img>
        <h1>Register on Aspire</h1>
      </div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.formElement}>
            <img
              className="w-[100px] h-[100px] rounded-full"
              src={postImage || profile}
            />
            <div className="flex gap-10 px-3 pb-2 items-center">
              <label
                htmlFor="profilephoto"
                className="w-fit px-1 pb-1 text-gray-600"
              >
                <MdModeEdit className="text-2xl" />
              </label>
              <ImCross
                className="text-gray-500 text-3xl"
                onClick={() => setPostImage("")}
              />
            </div>
            <input
              className="hidden"
              type="file"
              id="profilephoto"
              label="Image"
              name="myFile"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <div className={styles.formElement}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className={styles.formElement}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="DuckyMoMo"
            />
          </div>
          <div className={styles.formElement}>
            <label htmlFor="bio">Your Bio</label>
            <textarea
              type="text"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Once upon a summer a rich man went to verona saw two young gentlemen and called it a day"
            ></textarea>
          </div>
          <div className={styles.formElement}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@example.com"
            />
          </div>
          <div className={styles.formElement}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign up</button>
        </form>
        <div className={styles.links}>
          <Link>Forgot your password ?</Link>
          <Link to="/login">Already have an account ?</Link>
        </div>
      </div>
    </>
  );
}

export default Register;
