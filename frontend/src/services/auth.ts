// Setting and getting token for use in categories and todos services

import { LoggedUser } from "@/types";

let token: string | null = null;

export const setToken = (userToken: string) => {
  token = `Bearer ${userToken}`;
};

export const getToken = () => {
  if (!token) {
    const storedUser = localStorage.getItem("loggedTodoappUser");
    const loggedUser: LoggedUser | null = storedUser ? JSON.parse(storedUser) : null;

    if (loggedUser) {
      token = `Bearer ${loggedUser.token}`; // Retrieve token from localStorage if not set in memory
    }
  }

  return token;
};
