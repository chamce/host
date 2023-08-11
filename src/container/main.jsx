import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import { Pages as Routes } from "./routes.jsx";
import Wrapper from "./Wrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Wrapper>
      <Router>
        <Routes></Routes>
      </Router>
    </Wrapper>
  </React.StrictMode>,
);
