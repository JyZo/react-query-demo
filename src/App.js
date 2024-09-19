import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryCache,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//suc, error 핸들링 방식 최신
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
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
          <Route path="/super-heroes" element={<SuperHeroesPage />}></Route>
          <Route
            path="/rq-super-heroes"
            element={<RQSuperHeroesPage />}
          ></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
