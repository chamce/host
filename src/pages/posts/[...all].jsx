import { Outlet } from "react-router-dom";

// import { useParams } from "react-router-dom";
const Component = () => {
  // const params = useParams();
  return (
    <div>
      <div>Invalid posts route</div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Component;
