import { createBrowserRouter, Navigate } from "react-router-dom";
import RoutesLanding from "../pages/landingPage/RoutesLanding";
import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/registerPage/RegisterPage";

import Products from "../pages/dashboardPage/pages/product/Products";
import Statisitcs from "../pages/dashboardPage/pages/statistics/Statistics";
import DashboardPage from "../pages/dashboardPage/DashboardPage"; 
import Dashboard from "../pages/dashboardPage/pages/dashboard/Dashboard";     
import Profile from "@/pages/dashboardPage/pages/profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/", 
    element: <RoutesLanding />,
  },
  {
    path: "/login", 
    element: <LoginPage />,
  },
  {
    path: "/register", 
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />, 
    children: [
      {
        path: "", 
        element: <Dashboard />, 
      },
      {
        path: "products", 
        element: <Products />,
      },
      {
        path: "statistics", 
        element: <Statisitcs />,
      },
      {
        path: "profile", 
        element: <Profile />,
      },
    ],
  },
  {
    path: "*", 
    element: <Navigate to="/" replace />, 
  },
]);