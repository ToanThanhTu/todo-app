import axios from "axios";
import { getToken } from "./auth";

const baseUrl = "/api/todos";

const getAllOfUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/user/${userId}`);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (item) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  const response = await axios.post(baseUrl, item, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deleteObject = async (id) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getAllOfUser,
  getOne,
  create,
  update,
  deleteObject,
};
