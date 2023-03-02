export const dateString = (dateString: string): string => {
  const order_date = new Date(dateString);
  return `${order_date.getMonth() + 1}/${order_date.getDate()}`;
};
