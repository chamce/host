import { useParams } from "react-router-dom";

const Component = () => {
  const params = useParams();

  return (
    <div>
      <h6>Invalid Posts ({params["*"]})</h6>
      <div>There is nothing to find here</div>
    </div>
  );
};

export default Component;
