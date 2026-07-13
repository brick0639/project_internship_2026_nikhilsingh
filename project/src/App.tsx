import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Restaurant from "./pages/Restaurant";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import ProtectRoute from "./pages/ProtectRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
import Update from "./pages/Update";


function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="search" element={<Search />} />

            <Route path="restaurant/:id" element={<Restaurant />} />

            <Route
              path="cart"
              element={
                <ProtectRoute isLogin={isLogin}>
                  <Cart />
                </ProtectRoute>
              }
            />

            <Route path="favorites" element={<Favorites />} />

            <Route path="orders" element={<Orders />} />
            <Route path="login" element={<Login setIsLogin={setIsLogin} />} />
            <Route path="signup" element={<Signup />} />
            <Route path="update" element={<Update />} />
            <Route
              path="profile"
              element={
                <ProtectRoute isLogin={isLogin}>
                  <Profile setIsLogin={setIsLogin} />
                </ProtectRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;