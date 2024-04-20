import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

export const useFetchUser = ({ path, dependencies }) => {
  const {setUser,setUserFetched} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    try {
      const fetchData = async () => {
        const res = await axios.get(path);
        setUser(res.data); 
        setUserFetched(true);
      };
      fetchData();
      
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }

    return () => {
      ignore = true;
    };
  }, dependencies);

  return [loading,error];
};
