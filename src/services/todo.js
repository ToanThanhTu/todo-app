import axios from "axios";

const baseUrl = "http://localhost:3001/todos";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (item) => {
  const response = await axios.post(baseUrl, item);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const deleteObject = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAll,
  create,
  update,
  deleteObject,
};
