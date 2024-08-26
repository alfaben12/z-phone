import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MenuProvider } from "./context/MenuContext";
import axios from "axios";

const resourceName = "km-phone";
axios.defaults.baseURL = `https://${resourceName}`;
axios.defaults.headers.common["Authorization"] = "Bearer ZPHONE";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    console.log(request);
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("z-phone-root")).render(
  <React.StrictMode>
    <MenuProvider>
      <App />
    </MenuProvider>
  </React.StrictMode>
);
