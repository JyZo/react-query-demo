import {
  useQuery,
  useQueries,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
import { useState, Fragment } from "react";

const fetchColors = ({ pageParam }) => {
  console.log(pageParam);
  return axios.get(
    `http://localhost:4000/colors?_per_page=2&_page=${{ pageParam }}`
  );
};

export const InfiniteQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      {/* <div>
        {data?.data.map((color) => {
          console.log(data);
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          );
        })}
      </div> */}

      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.map((colors) => (
            <p key={colors.id}>{colors.name}</p>
          ))}
        </Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
