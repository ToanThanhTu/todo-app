let token = null

const setToken = (userToken) => {
  token = `Bearer ${userToken}`;
};

export default { token, setToken }