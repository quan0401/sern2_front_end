import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8082/api",
});

const getAllUsers = async () => {
  const users = await instance.get("/users");
  return users.data;
};

const getUsersPagination = async (offset, limit) => {
  const result = await instance.post("/user-table", {
    offset,
    limit,
  });
  return result.data;
};
export { getAllUsers, getUsersPagination };
