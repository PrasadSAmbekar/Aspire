import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./AuthContext";
import Loader from "./components/Loader";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </AuthProvider>
);

// ServiceWorkerRegistration.register();
