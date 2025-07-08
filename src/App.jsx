import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ProductPage from "./pages/ProductPage";
import { CartProvider } from "./contexts/CartContext";
import { WishListProvider } from "./contexts/WishListContext";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";

function App() {
  return (
    <>
      <CartProvider>
        <WishListProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/videogames/:slug" element={<ProductPage />} />
                <Route path="/SearchPage/" element={<SearchPage />} />
                <Route path="/checkoutpage" element={<CheckoutPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/cancel" element={<CancelPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WishListProvider>
      </CartProvider>
    </>
  );
}

export default App;
