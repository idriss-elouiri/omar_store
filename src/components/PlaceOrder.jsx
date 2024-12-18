"use client";

import React, { useState } from "react";
import { useCart } from "./CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

const PlaceOrderPage = () => {
  const { cartItems } = useCart();
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [shippingFee] = useState(10.0); // Static shipping fee

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({
      ...deliveryInfo,
      [name]: value,
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + shippingFee;
  };
console.log(cartItems)
  const handlePlaceOrder = async () => {
    const orderData = {
      deliveryInfo,
      cartItems,
      shippingFee,
      total: calculateTotal(),
      paymentMethod,
    };

    try {
      const response = await fetch(`${apiUrl}/api/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      console.log("Order placed successfully:", data);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  const handleOrder = () => {
    if (paymentMethod === "cashOnDelivery") {
      handlePlaceOrder();
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
    <div className="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        قم بإتمام طلبك
      </h1>
  
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* حقول معلومات التسليم */}
              {Object.keys(deliveryInfo).map((key) => (
                <div key={key}>
                  <label className="block text-gray-700 font-semibold capitalize">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace("firstName", "الاسم الأول")
                      .replace("lastName", "الاسم الأخير")
                      .replace("email", "البريد الإلكتروني")
                      .replace("street", "الشارع")
                      .replace("city", "المدينة")
                      .replace("state", "الولاية")
                      .replace("zipcode", "الرمز البريدي")
                      .replace("country", "الدولة")
                      .replace("phone", "رقم الهاتف")}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={deliveryInfo[key]}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
  
        <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ملخص الطلب
          </h2>
          <div className="flex justify-between text-lg font-semibold text-gray-800 mb-4">
            <span>المجموع الفرعي</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-gray-800 mb-4">
            <span>الشحن</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-800 mb-6">
            <span>الإجمالي</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
  
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            طريقة الدفع
          </h3>
          <div className="space-y-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="cashOnDelivery"
                checked={paymentMethod === "cashOnDelivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-gray-700">الدفع عند الاستلام</span>
            </label>
          </div>
  
          <button
            onClick={handleOrder}
            className="w-full py-3 mt-6 text-white bg-black rounded-lg transition"
          >
            قم بإتمام الطلب
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default PlaceOrderPage;
