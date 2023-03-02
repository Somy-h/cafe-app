import { useQuery } from "react-query";
import { get } from "../api-services/http-service";
import { API_URL } from "../api-services/auth-service";

export type CategoryItemT = {
  id: number;
  category_id: number;
  name: string;
  price: number;
  description: string;
  popular: boolean;
  image_url: string | null;
};

const getCategoryItems = async (categoryId:number): Promise<CategoryItemT[]> => {
  return await get(`${API_URL}/categories/${categoryId}/menu-items`);
};

export const useCategoryItemsData = (categoryId:number|null = null) => {
  return useQuery(["category-items", categoryId], () => getCategoryItems(categoryId));
};

const getAllCategoryItems = async (): Promise<CategoryItemT[]> => {
  return await get(`${API_URL}/menu-items`);
};

export const useAllCategoryItemsData = () => {
  return useQuery(["category-items"], () => getAllCategoryItems());
};


