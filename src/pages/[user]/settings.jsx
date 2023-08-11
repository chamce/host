import { useParams, Outlet } from "react-router-dom";

const Component = () => {
  const { user } = useParams();

  return (
    <div>
      <div>{user}'s settings page</div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Component;
