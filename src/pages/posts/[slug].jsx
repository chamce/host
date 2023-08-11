import { useParams, Outlet } from "react-router-dom";

const Component = () => {
  const { slug } = useParams();

  return (
    <>
      <h5>{slug} posts page</h5>
      <Outlet></Outlet>
    </>
  );
};

export default Component;
