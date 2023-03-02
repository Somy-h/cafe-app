import { useQuery } from "react-query";
import { get } from "../api-services/http-service";
import { API_URL } from "../api-services/auth-service";

export type CategoryT = {
  id: number;
  name: string;
  description: string;
};

const getCategories = async (): Promise<CategoryT[]> => {
  return await get(`${API_URL}/categories`);
};

export const useCategoriesData = () => {
  return useQuery(["categories"], () => getCategories());
};