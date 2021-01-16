import { useState, createContext, useContext, useEffect } from "react";
import products from "../shared/products.json";
import { initiateCheckout } from "../lib/payments";

const defaultCart = {
  products: {},
};

export const CartContext = createContext();

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);

  const cartItems = Object.keys(cart.products).map((key) => {
    const product = products.find(({ id }) => id === key);
    return {
      ...cart.products[key],
      pricePerItem: product.price,
    };
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.pricePerItem,
    0
  );

  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map((item) => ({
        price: item.id,
        quantity: item.quantity,
      })),
    });
  }

  function addToCart({ id } = {}) {
    updateCart((prev) => {
      let cartState = { ...prev };
      if (cartState.products[id]) {
        cartState.products[id].quantity++;
      } else {
        cartState.products[id] = {
          id,
          quantity: 1,
        };
      }
      return cartState;
    });
  }

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem("cart");
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      updateCart(() => data);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem("cart", data);
  }, [cartItems]);

  return {
    cart,
    updateCart,
    subtotal,
    quantity,
    addToCart,
    checkout,
  };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
