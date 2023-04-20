import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8082/api",
});

const getAllUsers = async () => {
  const users = await instance.get("/users");
  return users.data;
};

const getUsersPagination = async (offset, limit) => {
  const result = await instance.post("/user-table/view", {
    offset,
    limit,
  });
  return result.data;
};

const getAllGroups = async () => {
  const result = await instance.get("/user/group");
  return result.data;
};

const createNewUser = async (userData) => {
  const result = await instance.post("/user/create-user", {
    ...userData,
  });
  return result.data;
};

export { getAllUsers, getUsersPagination, getAllGroups, createNewUser };
