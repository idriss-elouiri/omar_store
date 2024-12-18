"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Collection() {
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Toggle function to show or hide the search bar
  const toggleSearchBar = () => {
    setShowSearchBar((prevState) => !prevState);
  };

  // Handle checkbox toggle for filters
  const handleFilterChange = (filterType, value) => {
    if (filterType === "categories") {
      setCategories((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (filterType === "types") {
      setTypes((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  // Fetch products from the backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        searchTerm,
        sort: sortOption === "price-asc" ? "asc" : "desc",
        categories: categories.map(encodeURIComponent).join(","),
        types: types.map(encodeURIComponent).join(","),
      });

      const response = await fetch(`${apiUrl}/api/products/get?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
      }

      const data = await response.json();
      setCollections(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [categories, types, searchTerm, sortOption]);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-screen-lg mx-auto px-4 mb-10 border-t border-b bg-gray-100">
        <div className="flex items-center justify-center space-x-4">
          {showSearchBar && (
            <div className="w-1/2 md:w-1/3 relative">
              <input
                type="text"
                placeholder="ابحث في المجموعات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full text-lg"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          )}
          <button
            onClick={toggleSearchBar}
            className="px-4 py-2 rounded-md text-lg font-semibold text-slate-800"
          >
            {showSearchBar ? "إخفاء شريط البحث" : "إظهار شريط البحث"}
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
        <div className="p-6 rounded-lg w-full lg:w-1/4">
          <h2 className="text-xl font-semibold mb-4">الفلاتر</h2>

          <div className="mb-6 p-3 border">
            <h3 className="font-semibold text-md mb-2">الفئات</h3>
            <ul>
              {[
                "حواسيب",
                "هواتف",
                "شاشات",
                "اكسسوارات",
                "سماعات",
                "فأرة",
                "لوحة المفاتيح",
              ].map((category) => (
                <li key={category} className="py-1">
                  <input
                    type="checkbox"
                    id={category}
                    onChange={() => handleFilterChange("categories", category)}
                    checked={categories.includes(category)}
                  />
                  <label htmlFor={category} className="ml-2 text-slate-600">
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">جميع المجموعات</h2>
            <div className="flex items-center gap-4">
              <span className="text-lg">الترتيب حسب:</span>
              <select
                className="py-2 px-4 border border-gray-300 rounded-lg text-lg"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="relevant">الأكثر صلة</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p>جارٍ التحميل...</p>
          ) : collections.length === 0 ? (
            <p>لم يتم العثور على مجموعات.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {collections.map((item) => (
                <Link
                  href={`/productDetails/${item._id}`}
                  key={item._id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="overflow-hidden rounded-lg mb-4">
                    <Image
                      src={
                        item.imagesByColor[Object.keys(item.imagesByColor)[0]]
                          .images[0]
                      }
                      alt={item.title}
                      width={300}
                      height={300}
                      className="rounded-lg object-cover w-full h-48"
                    />
                  </div>
                  <h3 className="text-xl  text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-xl text-slate-800 font-bold">
                    {item.price} درهم
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
