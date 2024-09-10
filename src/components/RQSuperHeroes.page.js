import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
export const RQSuperHeroesPage = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    // gcTime: 10,            화면이 바뀌어도 캐시를 일정시간 가지고 있을 시간
    // staleTime: 5 * 1000,   데이터의 변화가 많지않아 다시 가져올 필요가 없어 데이터 상태를 fresh로 지니고 있을 시간
    refetchOnMount: true,
  });

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
