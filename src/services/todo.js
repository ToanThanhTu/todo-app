import axios from "axios";

const baseUrl = "http://localhost:3001/todo";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (item) => {
  const response = await axios.post(baseUrl, item);
  return response.data;
};

export default {
  getAll,
  create
};
