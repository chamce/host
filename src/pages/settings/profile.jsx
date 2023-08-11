import { Outlet } from "react-router-dom";

const Component = () => {
  return (
    <div>
      <div>Edit your profile settings</div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Component;
