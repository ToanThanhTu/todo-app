import { LoginCredentials } from "@/types";
import axios from "axios";

const baseUrl = "/api/users";

const create = async (user: LoginCredentials) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

export default { create };
