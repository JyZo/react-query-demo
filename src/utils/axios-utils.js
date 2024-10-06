import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

export const request = ({ ...options }) => {
  console.log({ ...options });
  // client.defaults.headers.common.Authorization = `Bearer token`;  //CORS ERROR

  const onSuccess = (response) => {
    console.log("success");
    return response;
  };
  const onError = (error) => {
    console.log("error");
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
