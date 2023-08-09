import { useParams } from "react-router-dom";

const Component = () => {
  const { slug } = useParams();

  return (
    <div>
      <h6>{slug} Posts</h6>
      <div>The user could view {slug} posts here</div>
    </div>
  );
};

export default Component;
