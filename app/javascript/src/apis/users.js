import axios from "axios";

const fetch = () => axios.get("/users");

const show = userId => axios.get(`/users/${userId}`);

const update = ({ userId, payload }) =>
  axios.put(`/users/${userId}`, {
    task: payload,
  });

const usersApi = {
  fetch,
  show,
  update,
};

export default usersApi;
