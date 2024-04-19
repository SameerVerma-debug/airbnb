import { useFetch } from "../hooks/useFetch";
import "../styles/home.css";
import { HomeAccommodation } from "../components/HomeAccommodation";
import { Toaster } from "react-hot-toast";
import { Loading } from "../components/Loading";
export const Home = () => {
  const [accommodations, loading] = useFetch({
    path: "/accommodations",
    dependencies: [],
  });

  if(loading){
    return <Loading/>
  }
  return (
    <div className="home">
      {accommodations &&
        accommodations.map((accommodation) => {
          return (
            <HomeAccommodation key={accommodation._id} accommodation={accommodation}/>
          );
        })}
        
    </div>
  );
};
