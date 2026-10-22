import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Main from "./layouts/Main.tsx";
import Home from "./Pages/Home.tsx";
import Register from "./Pages/Register.tsx";
import Login from "./Pages/Login.tsx";
import ProductDetails from "./Pages/ProductDetails.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { Toaster } from "./components/ui/toast.tsx";
import IsLogin from "./Pages/protector/IsLogin.tsx";
import Profile from "./Pages/Profile.tsx";
import ForgotPassword from "./Pages/ForgotPassword.tsx";
import ForgotPasswordLogin from "./Pages/ForgotPasswordLogin.tsx";
import ProductFilter from "./Pages/ProductFilter.tsx";
import IsAdmin from "./Pages/protector/IsAdmin.tsx";
import ProductCreate from "./Pages/admin/ProductCreate.tsx";
import Panel from "./components/admin/Panel.tsx";
import ProductUpdate from "./Pages/admin/ProductEdit.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/reset-password/:id",
        element: <ForgotPassword />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordLogin />,
      },
      {
        path: "/product/filter",
        element: <ProductFilter />,
      },
      {
        path: "/profile",
        element: (
          <IsLogin>
            <Profile />
          </IsLogin>
        ),
      },
      {
        path: "/admin",
        element: (
          <IsAdmin>
            <Panel />
          </IsAdmin>
        ),
        children: [
          {
            path: "/admin/product-create",
            element: <ProductCreate />,
          },
          {
            path: "/admin/product-edit/:id",
            element: <ProductUpdate />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
