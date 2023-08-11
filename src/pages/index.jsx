import { Outlet } from "react-router-dom";

const Component = () => {
  return (
    <div>
      <div>Landing page</div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Component;
