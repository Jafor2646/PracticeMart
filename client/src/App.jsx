import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/login";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import PaymentCancelPage from "./pages/shopping-view/payment-cancel";
import SearchProducts from "./pages/shopping-view/search";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-[600px] h-[600px] bg-black" />;
  }

  // Determine redirection based on authentication and role
  const getDefaultPath = () => {
    if (isAuthenticated) {
      return user?.role === "admin" ? "/admin/dashboard" : "/shop/home";
    }
    return "/auth/login";
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Default redirection for "/" */}
        <Route path="/" element={<Navigate to={getDefaultPath()} />} />

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="register" element={<AuthRegister />} />
          <Route path="login" element={<AuthLogin />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="products" element={<AdminProducts />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="paypal-success" element={<PaymentSuccessPage />} />
          <Route path="paypal-cancel" element={<PaymentCancelPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;

