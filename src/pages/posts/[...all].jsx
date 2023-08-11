import { Outlet } from "react-router-dom";

// import { useParams } from "react-router-dom";
const Component = () => {
  // const params = useParams();
  return (
    <>
      <h5>Posts 404 page</h5>
      <Outlet></Outlet>
    </>
  );
};

export default Component;
