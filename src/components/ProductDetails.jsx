"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import RelatedProducts from "./RelatedProducts";
import { useRouter } from "next/navigation";

export default function ProductDetails() {
  const { id } = useParams();
  const { setCartItems } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [review, setReview] = useState({ rating: 5, comment: "" });
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/api/products/${id}`, {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with actual token
          },
        });
        if (!response.ok) throw new Error("Failed to fetch product details");

        const data = await response.json();
        setProduct(data);
        const firstColorImages = Object.values(data.imagesByColor || {})[0]
          ?.images;
        setMainImage(firstColorImages?.[0] || data.defaultImage || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, apiUrl]);

  const handleReviewSubmit = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${apiUrl}/api/products/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(review),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      const data = await response.json();

      // Append the new review to the product's reviews state
      setProduct((prevProduct) => ({
        ...prevProduct,
        reviews: Array.isArray(prevProduct.reviews)
          ? [...prevProduct.reviews, data] // Append new review
          : [data], // If no reviews yet, initialize with the new review
      }));

      setReview({ rating: 5, comment: "" });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      title: product.title,
      price: product.price,
      quantity,
      image: mainImage,
    };

    // Get the existing cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add the new item to the cart
    const updatedCart = [...savedCart, cartItem];

    // Update the cart state
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Persist changes in localStorage
  };

  if (loading)
    return <div className="spinner">جارٍ تحميل تفاصيل المنتج...</div>;
  if (error) return <p>خطأ : {error}</p>;

  return (
    <>
      <div className="min-h-screen py-10 px-4 bg-gray-100">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-10">
          {/* Left Side - Images */}
          <div className="w-full lg:w-1/2">
            {/* Main Image */}
            <div className="mb-6">
              <img
                src={mainImage}
                alt={product?.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product?.title || "Product Title"}
            </h1>
            <p className="text-gray-500 text-sm mb-2">
              ({product?.reviews?.length || 0} Reviews)
            </p>
            <p className="text-2xl font-bold text-slate-800 mb-6">
              {product?.price || 0} د.م
            </p>
            <p className="text-gray-700 text-lg mb-6">
              {product?.content || "No description available."}
            </p>

            {/* Colors and Images */}
            {Object.entries(product?.imagesByColor || {}).map(
              ([color, data]) => (
                <div key={color} className="mb-4">
                  {/* Color Swatch */}
                  <div className="flex items-center gap-4 mb-2">
                    {/* Circle for Color */}
                    <div
                      className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
                      style={{ backgroundColor: color }} // this sets the circular background to the selected color
                      title={color} // Tooltip for the color name on hover
                      onClick={() => setMainImage(data.images[0])} // Update the main image on click
                    />
                    {/* Display color name next to circle */}
                    <h4 className="text-gray-600">{color}</h4>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2">
                    {data.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${color} - ${index}`}
                        className="w-20 h-20 rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500"
                        onClick={() => setMainImage(img)}
                      />
                    ))}
                  </div>
                </div>
              )
            )}

            <button
              onClick={handleAddToCart}
              className="py-3 px-3 text-white bg-black rounded-lg transition mb-6"
            >
              إضافة إلى السلة
            </button>
            <p className="text-gray-600 text-sm">
              100% Original product. <br />
              Cash on delivery is available on this product. <br />
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>

        {/* Bottom Section - Tabs */}
        <div className="max-w-screen-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
          <div className="flex gap-6 border-b pb-4 mb-6" role="tablist">
            <button
              aria-selected={activeTab === "description"}
              className={`text-lg font-semibold pb-2 border-b-4 transition ${
                activeTab === "description"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              aria-selected={activeTab === "reviews"}
              className={`text-lg font-semibold pb-2 border-b-4 transition ${
                activeTab === "reviews"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews ({product?.reviews?.length || 0})
            </button>
          </div>

          {activeTab === "description" && (
            <div className="text-gray-700 text-lg">{product?.content}</div>
          )}

          {activeTab === "reviews" && (
            <div>
              {product?.reviews?.length ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold">
                      {review.user ? review.user.name : "Anonymous"}{" "}
                      {/* Display username */}
                    </p>
                    <p>{review.comment}</p>
                    <p className="text-yellow-500">
                      {"★".repeat(review.rating)} {/* Display rating */}
                    </p>
                  </div>
                ))
              ) : (
                <p>لا توجد تعليقات بعد.</p>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-semibold">أضف تعليقك</h3>
                <textarea
                  value={review.comment}
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="أكتب تعليقك هنا..."
                />
                <div className="flex gap-2 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setReview({ ...review, rating: star })}
                      className={`cursor-pointer ${
                        star <= review.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleReviewSubmit}
                  className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg"
                >
                  نشر التعليق
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <RelatedProducts
        currentProductId={product._id}
        category={product.category}
      />
    </>
  );
}
