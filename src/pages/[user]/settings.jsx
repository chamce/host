import { useParams } from "react-router-dom";

const Page = () => {
  const { user } = useParams();

  return `${user}'s Settings Route`;
};

export default Page;
