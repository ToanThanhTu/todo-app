let token = null;

export const setToken = (userToken) => {
  token = `Bearer ${userToken}`;
};

export const getToken = () => {
  if (!token) {
    const loggedUser = localStorage.getItem("loggedTodoappUser");

    if (loggedUser) {
      token = `Bearer ${loggedUser.token}`; // Retrieve token from localStorage if not set in memory
    }
  }

  return token;
};
