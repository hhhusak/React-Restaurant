import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsOpened, setCartIsOpened] = useState(false);
  const [orderIsOpened, setOrderIsOpened] = useState(false);

  const cartHandler = () => {
    setCartIsOpened(!cartIsOpened);
  }

  return (
    <CartProvider>
      {cartIsOpened && <Cart onCloseCart={cartHandler} />}
      <Header onCartOpen={cartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
