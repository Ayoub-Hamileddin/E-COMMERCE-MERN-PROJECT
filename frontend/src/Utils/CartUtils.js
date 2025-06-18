export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calculate the items Price
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // calculate the shippingCart
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 100);

  // calculate tax Price
  state.taxPrice = addDecimal((0.15 * state.itemsPrice).toFixed(2));

  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
