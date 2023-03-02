import { get, post, postWithoutAuth, patch } from "./http-service";
//import { setJwt } from "./jwtService";
import { Response, User } from "../types/serverDataInterfaces";

export const API_URL = "http://localhost:4000/api/v1";

export const registerUser = async (user): Promise<Response> => {
  try {
    return await postWithoutAuth(`${API_URL}/users`, user);
  } catch (err) {
    return {
      data: [],
      error: err,
    };
  }
};

export const authenticateUser = async (user): Promise<Response> => {
  try {
    console.log(user);
    return await postWithoutAuth(`${API_URL}/auth`, user);
  } catch (err) {
    return {
      data: [],
      error: err,
    };
  }
};

export const getUserProfile = async (id) => {
  try {
    console.log(`${API_URL}/users/${id}`);
    return await get(`${API_URL}/users/${id}`);
  } catch (err) {
    return {
      data: [],
      error: err,
    };
  }
};

export const updateUserProfile = async (user) => {
  try {
    console.log("profileService", user);
    return await patch(`${API_URL}/users/${user.id}`, user);
  } catch (err) {
    return {
      data: [],
      error: err,
    };
  }
};
