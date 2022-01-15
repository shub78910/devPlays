import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { VideoState } from "./Context/VideoState";

ReactDOM.render(
  <React.StrictMode>
    <VideoState>
      <App />
    </VideoState>
  </React.StrictMode>,
  document.getElementById("root")
);
