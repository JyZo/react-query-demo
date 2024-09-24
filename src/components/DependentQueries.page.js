import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = ({ queryKey }) => {
  console.log(queryKey);
  const email = queryKey[1];
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = ({ queryKey }) => {
  const channelId = queryKey[1];
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  console.log(email);
  const { data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email),
  });
  console.log("userfin");

  const channelId = user?.data?.channelId;
  console.log(channelId);

  const {
    status,
    fetchStatus,
    data: courses,
  } = useQuery({
    queryKey: ["courses", channelId],
    queryFn: fetchCoursesByChannelId,
    enabled: !!channelId,
  });
  return <div>DependentQueries</div>;
};
