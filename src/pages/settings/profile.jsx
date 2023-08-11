import { Outlet } from "react-router-dom";

const Component = () => {
  return (
    <>
      <h5>Profile settings page</h5>
      <Outlet></Outlet>
    </>
  );
};

export default Component;
