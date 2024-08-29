import axios from "axios";

const baseUrl = "http://localhost:3001/categories";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (category) => {
  const response = await axios.post(baseUrl, category);
  return response.data;
};

export default {
  getAll,
};
