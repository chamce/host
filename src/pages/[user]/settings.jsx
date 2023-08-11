import { useParams } from "react-router-dom";

const Component = () => {
  const { user } = useParams();

  return <div>{user}'s settings page</div>;
};

export default Component;
