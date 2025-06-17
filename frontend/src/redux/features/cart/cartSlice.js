import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };


const cartSlice=createSlice({
 name:"cart",
 initialState,
 reducers:{
    addToCart:(state,action)=>{
            
    }
 }
})