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

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (err) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = err.response?.status || 500;

    switch (status) {
      // authentication (token related issues)
      case 401: {
        return err;
      }

      // forbidden (permission related issues)
      case 403: {
        return Promise.reject(err);
      }

      // bad request
      case 400: {
        return Promise.reject(err);
        return err.response;
      }

      // not found
      case 404: {
        return Promise.reject(err);
      }

      // conflict
      case 409: {
        return Promise.reject(err);
      }

      // unprocessable
      case 422: {
        return Promise.reject(err);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(err);
      }
    }
    // return Promise.reject(error);
  }
);

export {
  getAllUsers,
  getUsersPagination,
  getAllGroups,
  createNewUser,
  checkCreateValidationn,
};
