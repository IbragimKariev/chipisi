import { useEffect } from "react";
import "./App.css";
import { Home } from "./pages/home/Home";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthSliceMethods, getAuthState } from "./redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./redux/root/root.store";
import { Roles } from "./pages/roles/Roles";

import { Layout } from "./components/layout";

import { LoginPage } from "./pages/login";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useDarkMode } from "./contexts/DarkModeContext";
import { routes } from "./routes";
import { Users } from "./pages/users";
import { Companies } from "./pages/companies";
import { ProductList } from "./pages/products/productList";
import { OrdersPage } from "./pages/orders";
import { ProDuctItemPage } from "./pages/products/productItem";

function App() {
  const { theme } = useDarkMode();
  const { isLoggedIn } = useSelector(getAuthState);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  const setUserInfo = async () => {
    await dispatch(AuthSliceMethods.getUserInfo());
  };

  useEffect(() => {
    if ((!isLoggedIn && localStorage.getItem("token")) || isLoggedIn) {
      setUserInfo();
    }
  }, [isLoggedIn]);

  return (
    <ConfigProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Routes>
          <Route
            path={routes.login}
            element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path={routes.home}
            element={
              isLoggedIn ? (
                <Layout />
              ) : (
                <Navigate to="/login" replace state={{ from: location }} />
              )
            }
          >
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.users} element={<Users />} />
            <Route path={routes.companies} element={<Companies />} />
            <Route path={routes.orders} element={<OrdersPage />} />
            <Route path={routes.roles} element={<Roles />} />

            {/* <Route
              path={routes.catalog.productList}
              element={<ProductList />}
            /> */}

            <Route path={routes.catalog.productsList}>
              <Route index element={<ProductList />} />
              <Route path=":productId" element={<ProDuctItemPage />} />
            </Route>
            <Route path={routes.catalog.priceList} element={<ProductList />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
