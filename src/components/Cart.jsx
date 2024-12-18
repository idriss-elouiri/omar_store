"use client";

import React from "react";
import { useCart } from "./CartContext";
import Link from "next/link";
import Image from "next/image";

const Cart = () => {
  const { cartItems, updateCartItemQuantity, setCartItems } = useCart();

  const handleIncreaseQuantity = (id) => {
    const item = cartItems.find((item) => item._id === id);
    if (item) {
      const newQuantity = item.quantity + 1;
      updateCartItemQuantity(id, newQuantity); // تحديث الكمية فقط للمنتج المحدد
    }
  };

  const handleDecreaseQuantity = (id) => {
    const item = cartItems.find((item) => item._id === id);
    if (item && item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      updateCartItemQuantity(id, newQuantity); // تحديث الكمية فقط للمنتج المحدد
    }
  };

  const removeFromCart = (id) => {
    console.log("Removing product with id:", id);
    const updatedCart = cartItems.filter((item) => item._id !== id); // إزالة المنتج المحدد فقط
    console.log("Updated cart:", updatedCart);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + 10.0; // Static shipping fee
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-end gap-2 w-full mb-4">
          <h2 className="text-4xl font-bold text-slate-800">
            عربة التسوق الخاصة بك
          </h2>
          <div className="w-16 h-1 bg-slate-900"></div>
        </div>
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-6"
            >
              <div className="flex items-center space-x-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-5">
                    <p className="text-lg font-semibold text-slate-800">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleDecreaseQuantity(item._id)}
                  className="px-2 py-1 bg-slate-300 text-slate-800 rounded-lg hover:bg-slate-400"
                >
                  -
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(item._id)}
                  className="px-2 py-1 bg-slate-300 text-slate-800 rounded-lg hover:bg-slate-400"
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:text-red-800 mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between text-lg font-semibold text-slate-800 mb-4">
            <span>Subtotal</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-slate-800 mb-4">
            <span>Shipping Fee</span>
            <span>$10.00</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-slate-800 mb-6">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <Link href={"/placeOrder"}>
            <button className="w-full py-3 px-3 text-white bg-black rounded-lg transition">
              PROCEED TO CHECKOUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
