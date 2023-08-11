import { Outlet } from "react-router-dom";

const Component = () => {
  return (
    <div>
      <div>View Topic Posts</div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Component;
