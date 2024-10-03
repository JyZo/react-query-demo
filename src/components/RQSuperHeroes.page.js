import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  // const onSuccess = () => {
  //   console.log("onSuccess");
  // };

  // const onError = () => {
  //   console.log("onError");
  // };
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const handleAddHeroClick = () => {
    console.log([name, alterEgo]);
    const hero = { name, alterEgo };
    addHero(hero);
  };
  const { isLoading, isError, data, error, refetch } = useSuperHeroesData();

  const { mutate: addHero } = useAddSuperHeroData();

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>
              {hero.name} and {hero.id}
            </Link>
          </div>
        );
      })}
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};
