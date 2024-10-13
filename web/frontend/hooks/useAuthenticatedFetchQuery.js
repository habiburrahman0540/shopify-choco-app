import { useQuery } from "react-query";

const fetchQueryFunction = async(url) => {
  return await fetch(url).then((res) => res.json());
};

export const useAuthenticatedFetchQuery = (url) => {
  return useQuery(['Fetch-query', url], () => fetchQueryFunction(url));
};
