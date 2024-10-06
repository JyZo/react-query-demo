import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  // return axios.post("http://localhost:4000/superheroes", hero);
  return request({ url: "/superheroes", method: "post", data: hero });
};

export const useSuperHeroesData = () => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
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
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSuperHero,
    // onSuccess: (data, variables) => {
    // queryClient.invalidateQueries({ queryKey: ["super-heroes"] });   //mutaion 으로 업데이트를 하고 재요청을 보내 데이터 갱신
    // queryClient.setQueryData(["super-heroes"], (oldData) =>  //mutaion 으로 업데이트를 하고 재요청 대신 클라이언트사이드에서 캐시 업데이트를 해서 갱신
    //   oldData                                                //네트워크 자원 절약 가능
    //     ? {
    //         ...oldData,
    //         data: [...oldData.data, data.data],
    //       }
    //     : oldData
    // );

    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData(["super-heroes"], (oldData) =>
        oldData
          ? {
              ...oldData,
              data: [
                ...oldData.data,
                { id: oldData?.data?.length + 1, ...newHero },
              ],
            }
          : oldData
      );
      return { previousHeroData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });
};
