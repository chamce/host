import { Outlet } from "react-router-dom";
const Component = () => {
  return (
    <div>
      <div>Settings index page</div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Component;
