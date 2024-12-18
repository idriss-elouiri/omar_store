"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";

const sliderSettings = {
  dots: false,
  infinite: true,
  arrows: false,
  speed: 800,
  slidesToScroll: 1,
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  cssEase: "ease-in-out",
  pauseOnHover: false,
  pauseOnFocus: true,
};

const HeroSection = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/products/get?sort=desc&limit=3`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setBestsellers(data.products.filter((p) => p.bestseller));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error}</div>;

  return (
    <section className="py-10" dir="rtl">
      <div className="w-[90%] mx-auto my-10" dir="rtl">
        <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center">
          <div className="container pb-8 sm:pb-0">
            <Slider {...sliderSettings}>
              {bestsellers.map(
                ({ _id, title, content, price, imagesByColor }) => {
                  // Extract the first image and color
                  const firstColor = Object.keys(imagesByColor)[0];
                  const firstImage =
                    imagesByColor[firstColor]?.images[0] ||
                    "/images/default.jpg";

                  return (
                    <div key={_id}>
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Text Section */}
                        <div className="flex flex-col justify-center gap-4 md:pl-3 pt-12 md:pt-0 text-center md:text-left order-2 md:order-1 relative z-10">
                          <h1 className="text-5xl md:text-6xl font-bold">
                            {title}
                          </h1>
                          <p className="text-slate-600">{content}</p>
                          <div className="flex items-center gap-3">
                            <p className="flex items-center text-primary px-4 py-2 bg-brandWhite rounded-full gap-3 font-semibold">
                              عرض حصري -50% <FaLongArrowAltRight />
                            </p>
                            <Link
                              href={`/productDetails/${_id}`}
                              className="underline font-semibold"
                            >
                              اشتري الآن
                            </Link>
                          </div>
                        </div>
                        {/* Image Section */}
                        <div className="order-1 md:order-2">
                          <Image
                            src={firstImage}
                            alt={title || "Product"}
                            width={500}
                            height={500}
                            className="rounded-lg shadow-lg transition-opacity duration-500 object-contain mx-auto"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
