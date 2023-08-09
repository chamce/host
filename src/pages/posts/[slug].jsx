import { useParams } from "react-router-dom";

const Page = () => {
  const { slug } = useParams();

  return slug + " Posts Route";
};

export default Page;
