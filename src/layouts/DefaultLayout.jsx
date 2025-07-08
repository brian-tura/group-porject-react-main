import { Outlet, useLocation } from "react-router";
import Header from "../components/Header";
import ShoppingCart from "../components/ShoppingCart";
import { useState } from "react";
import AddCartAlert from "../components/AddCartAlert";

const DefaultLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  // Nascondi carrello e tasto nella checkoutpage
  const isCheckoutPage = location.pathname === "/checkoutpage";

  return (
    <>
      <div className="d-flex justify-content-center">
        <AddCartAlert />
      </div>
      <Header 
        isCartOpen={isCartOpen} 
        setIsCartOpen={setIsCartOpen} 
        showCartToggle={!isCheckoutPage} 
      />
      <main className="d-flex justify-content-between">
        <div className="w-100">
          <Outlet />
        </div>
        {!isCheckoutPage && isCartOpen && <ShoppingCart />}
      </main>
    </>
  );
};

export default DefaultLayout;
