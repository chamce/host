import { useParams, Outlet } from "react-router-dom";

const Component = () => {
  const { slug } = useParams();

  return (
    <div>
      <div>View {slug} posts</div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Component;
