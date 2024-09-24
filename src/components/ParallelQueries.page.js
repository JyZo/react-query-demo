import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get(`http://localhost:4000/superheroes`);
};

const fetchFriends = () => {
  return axios.get(`http://localhost:4000/friends`);
};

export const ParallelQueriesPage = () => {
  const superheroesQuery = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
  });

  const friendsQuery = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  return <div>ParallelQueriesPage Page</div>;
};
