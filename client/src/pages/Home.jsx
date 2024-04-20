import { useFetch } from "../hooks/useFetch";
import "../styles/home.css";
import { Loading } from "../components/Loading";
import { Accommodations } from "../components/Accommodations";

export const Home = () => {
  const [accommodations, loading] = useFetch({
    path: "/accommodations",
    dependencies: [],
  });

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="home">
      <h2>Home Page</h2>
      <Accommodations accommodations={accommodations}/>
    </div>
  );
};
