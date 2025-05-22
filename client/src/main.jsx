import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='1027468399044-hcga088qukri5i070qpponn03ol0tc37.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
    ;
  </StrictMode>
);
