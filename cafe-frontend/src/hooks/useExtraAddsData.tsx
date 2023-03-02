import { useQuery } from "react-query";
import { get } from "../api-services/http-service";
import { API_URL } from "../api-services/auth-service";

export type ExtraAddT = {
  id: number;
  name: string;
  price: number;
};

const getExtraAddsOnMenu = async (id: number): Promise<ExtraAddT[]> => {
  return await get(`${API_URL}/menu-items/${id}/extra-items`);
};

export const useExtraAddsData = (menu_id: number) => {
  return useQuery(["extra-items", menu_id], () => getExtraAddsOnMenu(menu_id));
};
