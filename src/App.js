import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import { Suspense, lazy, useContext } from "react";
import { AuthContext } from "./AuthContext";
import RootLayout from "./pages/RootLayout";
import { loader as SinglePostLoader } from "./components/Post";
import { loader as AllPostsLoader } from "./pages/AllPosts";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const SinglePost = lazy(() => import("./pages/SinglePost"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AllPosts = lazy(() => import("./pages/AllPosts"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const UpdatePost = lazy(() => import("./pages/UpdatePost"));
const MyPosts = lazy(() => import("./pages/MyPosts"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <h1>About</h1>,
      },
      {
        path: "contact",
        element: <h1>Contact</h1>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "posts/",
        children: [
          {
            index: true,
            element: <AllPosts />,
            loader: AllPostsLoader,
          },
          {
            path: ":id",
            element: <SinglePost />,
            loader: SinglePostLoader,
          },
          {
            path: "new",
            element: <CreatePost />,
          },
          {
            path: "my",
            element: <MyPosts />,
          },
          {
            path: ":id/update",
            element: <UpdatePost />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
