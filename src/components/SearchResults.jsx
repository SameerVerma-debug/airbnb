import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Accommodations } from "./Accommodations";
import { Loading } from "./Loading";
import "../styles/search-results.css";
import { NoSearchResults } from "./NoSearchResults";
export const SearchResults = () => {
  const { searchQuery } = useParams();

  const [foundAccommodations, loading] = useFetch({
    path: `/search/${searchQuery}`,
    dependencies: [searchQuery],
  });

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="search-results">
      <h2>Showing Results for: {searchQuery}</h2>
      {foundAccommodations.length > 0 ? (
        <Accommodations accommodations={foundAccommodations} />
      ) : (
        <NoSearchResults />
      )}
    </div>
  );
};
