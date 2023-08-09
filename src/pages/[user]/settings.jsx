import { useParams } from "react-router-dom";

const Component = () => {
  const { user } = useParams();

  return (
    <div>
      <h6>{user}'s Settings</h6>
      <div>{user} could edit their settings here</div>
    </div>
  );
};

export default Component;
