import axios from "axios";
import { getToken } from "./auth";
import { Category, NewCategory } from "@/types";

const baseUrl = "/api/categories";

const getAllOfUser = async (userId: string) => {
  const response = await axios.get(`${baseUrl}/user/${userId}`);
  return response.data;
};

const getOne = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (category: NewCategory) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  const response = await axios.post(baseUrl, category, config);
  return response.data;
};

const update = async (id: string, updatedCategory: Category) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  const response = await axios.put(`${baseUrl}/${id}`, updatedCategory, config);
  return response.data;
};

const deleteObject = async (id: string) => {
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
