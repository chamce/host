import { Outlet } from "react-router-dom";

const Component = () => {
  return (
    <div>
      <div>No matching route found</div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Component;
