import { Outlet } from "react-router-dom";

const Component = () => {
  return (
    <div>
      <div>Posts index page</div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Component;
