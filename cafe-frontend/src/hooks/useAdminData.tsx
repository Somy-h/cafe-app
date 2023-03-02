import { useQuery, useMutation } from "react-query";
import { get, patchFormData, post } from "../api-services/http-service";
import { API_URL } from "../api-services/auth-service";
const ADMIN_API_URL = "http://localhost:4000/api/v1/admin";


// admin: Today's order count
export type OrderCountT = {
  order_count: number;
}
const getTodayOrderCount = async (order_date: Date): Promise<OrderCountT> => {
  const queryString = order_date ? "?order_date=" + order_date.toLocaleDateString() : "";
  console.log(queryString);
  console.log(`${ADMIN_API_URL}/order-count${queryString}`);
  return await get(`${ADMIN_API_URL}/order-count${queryString}`);
};

export const useTodayOrderCount = (order_date: Date | null = null) => {
  const queryString = order_date ?? new Date(Date.now()).toLocaleDateString();
  return useQuery(["todayOrderCount", queryString], () =>
    getTodayOrderCount(order_date)
  );
};

// admin: Today's order sales
export type DaySalesT = {
  day_sales: number;
}
const getTodaySales = async (order_date: Date): Promise<DaySalesT> => {
  return await get(
    `${ADMIN_API_URL}/order-sales${
      order_date ? "?order_date=" + order_date : ""
    }`
  );
};

export const useTodaySales = (order_date: Date | null = null) => {
  const queryString = order_date ?? new Date(Date.now()).toLocaleDateString();
  return useQuery(["todaySales", queryString], () => getTodaySales(order_date));
};

// admin: daily order count for a week
export type OrderCountForWeekT = {
  order_date: Date;
  order_count: number;
};
const getDailyOrderCountForWeek = async (): Promise<OrderCountForWeekT[]> => {
  return await get(`${ADMIN_API_URL}/order-count/week`);
};

export const useDailyOrderCountForWeek = () => {
  const queryString = new Date(Date.now()).toLocaleDateString();
  return useQuery(["orderCountForWeek", queryString], () =>
    getDailyOrderCountForWeek()
  );
};

// admin: daily order count for a week
export type DailySalesT = {
  order_date: Date;
  daily_sales: number;
};
const getDailySales = async (): Promise<DailySalesT[]> => {
  return await get(`${ADMIN_API_URL}/order-sales/week`);
};

export const useDailySales = () => {
  const queryString = new Date(Date.now()).toLocaleDateString();
  return useQuery(["dailySales", queryString], () => getDailySales());
};

// admin: daily orders
export type OrderHistoryTodayT = {
  first_name: string;
  last_name: string;
  id: number;
  order_num: string;
  total_price: number;
  delivery_addr_id: number;
  order_date: Date;
  order_status: number;
  order_type: number;
  delivery_datetime: Date;
};
const getOrderHistoryToday = async (): Promise<OrderHistoryTodayT[]> => {
  return await get(`${ADMIN_API_URL}/orders`);
};

export const useOrderHistoryToday = () => {
  const queryString = new Date(Date.now()).toLocaleDateString();
  return useQuery(["orderHistoryToday", queryString], () =>
    getOrderHistoryToday()
  );
};

// admin: update menu items
// const updateOnlineMenu = async (categoryItem) => {
//   return await put(`${ADMIN_API_URL}/updateOnlineMenu`, categoryItem);
// };

// export const useCategoryItemMutate = (categoryItem) => {
//   return useMutation((categoryItem) => updateOnlineMenu(categoryItem), 
//   {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["category-items", categoryItem.id]);
//     },
//   });
// };


export const updateOnlineMenu = async (menuId: number, menuData: FormData) => {
  try {
    console.log("updateOnlineMenu", menuData);
    return await patchFormData(`${API_URL}/menu-items/${menuId}`, menuData);
  } catch (err) {
    return {
      data: [],
      error: err,
    };
  }
};
