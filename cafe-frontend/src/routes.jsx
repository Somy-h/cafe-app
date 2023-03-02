import {
  OnlineOrderPage,
  SignInPage,
  SignUpPage,
  ProfilePage,
  CartPage,
  CheckoutPage,
  AdminHomePage,
} from "./pages";
import CartIcon from "./components/cart-icon.component";
import MenuList from "./components/menu-list.component";
import {
  UserCircleIcon,
  TableCellsIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const routes = [
  {
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Sign In",
        path: "/auth/sign-in",
        element: <SignInPage />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Sign Up",
        path: "/auth/sign-up",
        element: <SignUpPage />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Profile",
        path: "/auth/profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    layout: "order",
    pages: [
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Online Order",
        path: "/order/home",
        element: <MenuList />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Profile",
        path: "/order/profile",
        element: <ProfilePage />,
      },
      {
        icon: <CartIcon {...icon} />,
        name: "Cart",
        path: "/order/cart",
        element: <CartPage />,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "Checkout",
        path: "/order/checkout",
        element: <CheckoutPage />,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "OrderHistory",
        path: "/order/history",
        element: <OrderHistoryPage />,
      },
    ],
  },
  {
    layout: "admin",
    pages: [
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Admin",
        path: "/admin",
        element: <AdminHomePage />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Menu update",
        path: "/admin/menu",
        element: <AdminHomePage />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Orders",
        path: "/admin/orders",
        element: <AdminHomePage />,
      },
    ],
  },
];

export default routes;
