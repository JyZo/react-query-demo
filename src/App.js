import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { RQSuperHeroPage } from "./components/RQSuperHero.page";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryCache,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DynamicParallelPage } from "./components/DynamicParallel.page";
import { ParallelQueriesPage } from "./components/ParallelQueries.page";

//suc, error 핸들링 방식 최신
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onSuccess: (data) => {
      console.log("success", data);
    },
    onError: (data) => {
      console.log("error", data);
    },
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Routes>
          <Route path="/rq-parallel" element={<ParallelQueriesPage />}></Route>
          <Route
            path="/rq-super-heroes/:heroId"
            element={<RQSuperHeroPage />}
          ></Route>
          <Route path="/super-heroes" element={<SuperHeroesPage />}></Route>
          <Route
            path="/rq-super-heroes"
            element={<RQSuperHeroesPage />}
          ></Route>
          <Route
            path="/rq-dynamic-parallel"
            element={<DynamicParallelPage heroIds={[1, 3]} />}
          ></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
