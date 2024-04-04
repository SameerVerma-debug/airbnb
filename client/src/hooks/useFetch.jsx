import axios from "axios";
import { useEffect, useState } from "react"

export const useFetch = ({path,dependencies}) => {
  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    if(!ignore){
      const fetchData = async()=>{
        try{
          const res = await axios.get(path);
          setData(res.data);
        }
        catch(err){
          setError(err);
        }
        finally{
          setLoading(false);
        }
      }
      fetchData();
    }
    return () => {
      ignore = true;
    }
  },dependencies)

  return [data,loading,error];
}