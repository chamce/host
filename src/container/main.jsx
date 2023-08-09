import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import { PagesRoutes } from "./routes.jsx";
import Wrapper from "./Wrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Wrapper>
      <BrowserRouter>
        <PagesRoutes></PagesRoutes>
      </BrowserRouter>
    </Wrapper>
  </React.StrictMode>,
);
