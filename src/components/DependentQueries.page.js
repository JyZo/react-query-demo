import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";

const fetchUserByEmail = ({ queryKey }) => {
  const email = queryKey[1];
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = ({ queryKey }) => {
  const channelId = queryKey[1];
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: fetchUserByEmail,
  });

  const channelId = user?.data?.channelId;

  const { data: courses } = useQuery({
    queryKey: ["courses", channelId],
    queryFn: fetchCoursesByChannelId,
    enabled: !!channelId,
  });

  return <div>DependentQueries</div>;
};
