import { useParams } from "react-router-dom";

const Component = () => {
  const { slug } = useParams();

  return <div>View {slug} posts</div>;
};

export default Component;
