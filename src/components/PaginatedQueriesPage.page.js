import {
  useQuery,
  useQueries,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchColors = ({ queryKey }) => {
  const pageNum = queryKey[1];
  return axios.get(`http://localhost:4000/colors?_per_page=2&_page=${pageNum}`);
};

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["colors", pageNumber],
      queryFn: fetchColors,
      placeholderData: keepPreviousData,
    });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.data.data.map((color) => {
          console.log(data);
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next Page
        </button>
      </div>
      {isFetching && "Loading"}
    </>
  );
};
