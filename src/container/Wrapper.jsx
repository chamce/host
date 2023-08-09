import RemoteComponent from "../components/RemoteComponent";

const versions = {
  recommended: "https://raw.githubusercontent.com/chamce/remote-starter/master/dist/wrapper.cjs",
  latest: "https://raw.githubusercontent.com/chamce/remote/master/docs/remote.cjs",
  local: "http://localhost:5000/remote.cjs",
};

const Wrapper = ({ url, ...rest }) => <RemoteComponent url={versions.latest} {...rest}></RemoteComponent>;

export default Wrapper;
