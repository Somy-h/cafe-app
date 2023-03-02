import { useQuery } from "react-query";
import { get } from "../api-services/http-service";
import { API_URL } from "../api-services/auth-service";

export type OrderHistoryT = {
  id: number;
  order_num: string;
  user_id: number;
  total_price: number;
  delivery_addr_id: number;
  order_data: Date;
  order_status: number;
  order_type: number;
  delivery_datetime: Date;
};

export type OrderHistoryDetailT = {
  online_order_id: number;
  order_detail_id: number;
  quantity: number;
  order_price: number;
  special_note: string;
  menu_id: number;
  menu_name: string;
  image_url: string;
  menu_price: number;
};

export type OrderHistoryDetailExtraT = {
  online_order_id: number;
  order_detail_id: number;
  extra_id: number;
  extra_name: string;
  extra_price: number;
}

const getOrderHistory = async (id: number): Promise<OrderHistoryT[]> => {
  return await get(`${API_URL}/users/${id}/orders`);
};

export const useOrderHistoryData = (id: number): UseQueryResult<OrderHistoryT[]> => {
  return useQuery(["orderHistory", id], () => getOrderHistory(id));
};

const getOrderHistoryDetail = async (
  id: number
): Promise<OrderHistoryDetailT[]> => {
  return await get(`${API_URL}/orders/${id}`);
};

export const useOrderHistoryDetailData = (
  id: number
): UseQueryResult<OrderHistoryDetailT[]> => {
  return useQuery(["OrderHistoryDetail", id], () =>
    getOrderHistoryDetail(id)
  );
};

const getOrderHistoryDetailExtra = async (
  id: number
): Promise<OrderHistoryDetailExtraT[]> => {
  return await get(`${API_URL}/orders/${id}/extra-items`);
};

export const useOrderHistoryDetailExtraData = (
  id: number
): UseQueryResult<OrderHistoryDetailExtraT[]> => {
  return useQuery(["OrderHistoryDetailExtra", id], () =>
    getOrderHistoryDetailExtra(id)
  );
};