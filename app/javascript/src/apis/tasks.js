import axios from "axios";

const fetch = () => axios.get("/tasks");

const show = slug => axios.get(`/tasks/${slug}`);

const create = payload => axios.post("/tasks", payload);

const tasksApi = {
  fetch,
  show,
  create,
};

export default tasksApi;
