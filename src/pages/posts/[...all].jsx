import { useParams } from "react-router-dom";

const Page = () => {
  const params = useParams();

  return `Posts Wildcard Route (${params["*"]})`;
};

export default Page;
