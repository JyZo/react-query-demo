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
  // const onSuccess = () => {
  //   console.log("onSuccess");
  // };

  // const onError = () => {
  //   console.log("onError");
  // };

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    // enabled: false,

    // onSuccess: () => {
    //   console.log("onSuccess");
    // },
    // onError: () => {
    //   console.log("onError");
    // },
    //위와같은 에러 핸들링방식은 버전이 바뀌면서 사용하지 않게되었고 queryClient에 전역으로 선언해서 사용하는 방식으로 변경

    // gcTime: 10,            화면이 바뀌어도 캐시를 일정시간 가지고 있을 시간
    // staleTime: 5 * 1000,   데이터의 변화가 많지않아 다시 가져올 필요가 없어 데이터 상태를 fresh로 지니고 있을 시간
    // refetchInterval : 2000,  일정기간마다 데이터를 다시 가져오는 Polling역할, 브라우저에 포커스가 존재해야지만 작동
    // refetchIntervalInbackground : true, 브라우저에 포커스가 없을 경우에도 refetchInterval이 동작하게 해준다.
    // refetchOnMount: true, 데이터가 stale 상태이면 컴포넌트가 마운트 될 때 refetch 작업
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
      <button onClick={refetch}>Fetch heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
