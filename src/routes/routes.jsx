/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const HomePageLayout=lazy(()=>import("../layouts/HomePageLayout"))
const Login=lazy(()=>import("../pages/Login"))
const Register=lazy(()=>import("../pages/Register"))
const Home=lazy(()=>import("../pages/Home"))
const NewArrival=lazy(()=>import("../pages/NewArrival"))
const Dashboard=lazy(()=>import("../dashboard/Dashboard"))
const Cart=lazy(()=>import("../pages/Cart"))
const Wishlist=lazy(()=>import("../pages/Wishlist"))
const ProductListing=lazy(()=>import("../components/productListing/ProductListing"))
import PrivateRouting from "./privaterouting/PrivateRouting";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    children:[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/new-arrivals",
            element:<NewArrival/>
        },
        {
            path:"/newarrival",
            element:<NewArrival/>
        },
        {
            path:"/deals",
            element:<ProductListing mode="deals"/>
        },
        {
            path:"/category/:category",
            element:<ProductListing/>
        },
        {
          path:"/dashboard",
          element:<PrivateRouting>
              <Dashboard/>
          </PrivateRouting>
        },
        {
          path:"/cart",
          element:<PrivateRouting>
              <Cart/>
          </PrivateRouting>
        },
        {
          path:"/wishlist",
          element:<Wishlist/>
        }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);