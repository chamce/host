import { createRemoteComponent, createRequires } from "@paciolan/remote-component";
import ReactDOM from "react-dom";
import React from "react";

const requires = createRequires({
  "react-dom": ReactDOM,
  react: React,
});

const RemoteComponent = createRemoteComponent({ requires });

const urls = {
  github: "https://raw.githubusercontent.com/chamce/remote/master/docs/remote.cjs",
  local: "http://localhost:5001/remote.cjs",
};

const BootstrapWrapper = ({ url, ...rest }) => <RemoteComponent url={urls.local} {...rest}></RemoteComponent>;

export default BootstrapWrapper;