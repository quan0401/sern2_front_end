import { instance } from "../axios/setup";

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

const checkCreateValidationn = async (data) => {
  try {
    const result = await instance.post("/user/create-user-validation", {
      ...data,
    });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const LoginUser = async (data) => {
  try {
    const result = await instance.post("/login", { ...data });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllUsers,
  getUsersPagination,
  getAllGroups,
  createNewUser,
  checkCreateValidationn,
  LoginUser,
};
