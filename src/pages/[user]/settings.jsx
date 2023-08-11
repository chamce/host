import { useParams, Outlet } from "react-router-dom";

const Component = () => {
  const { user } = useParams();

  return (
    <>
      <h5>{user}'s settings page</h5>
      <Outlet></Outlet>
    </>
  );
};

export default Component;
