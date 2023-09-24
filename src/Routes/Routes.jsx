import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Orders from "../Pages/Orders/Orders";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DashBoard from "../Layout/DashBoard";
import MyCart from "../Pages/DashBoard/MyCart/MyCart";
import PrivateRoutes from "./PrivateRoutes";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import AddItem from "../Pages/DashBoard/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import ManagedItems from "../Pages/DashBoard/ManagedItems/ManagedItems";
import Payment from "../Pages/DashBoard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'menu',
        element: <Menu></Menu>
      },
      {
        path: 'orders/:category',
        element: <Orders></Orders>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoutes>
      <DashBoard></DashBoard>
    </PrivateRoutes>,
    children: [
      {
        path: 'mycart',
        element: <MyCart></MyCart>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path: 'allusers',
        element: <AdminRoute>
          <AllUsers></AllUsers>
        </AdminRoute>
      },
      {
        path: 'additem',
        element: <AdminRoute>
          <AddItem></AddItem>
        </AdminRoute>
      },
      {
        path: 'manageitems',
        element: <AdminRoute>
          <ManagedItems></ManagedItems>
        </AdminRoute>
      },

    ]
  },
]);