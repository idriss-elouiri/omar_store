import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* قسم عن الشركة */}
        <div className="mb-12 md:flex md:justify-between">
          <div className="md:w-1/3">
            <Image
              src="/images/logo.png"
              alt="رفع الصور"
              width={100}
              height={100}
              className="cursor-pointer mb-4"
            />
            <p className="text-md text-slate-800 mb-4">
              لوريم إيبسوم هو مجرد نص وهمي في صناعة الطباعة والتنضيد. كان لوريم
              إيبسوم نصاً وهمياً معتمداً في هذه الصناعة منذ القرن الخامس عشر،
              عندما أخذ طابع غير معروف مجموعة من الحروف وخلطها لإنشاء كتاب عينات
              للطباعة.
            </p>
          </div>

          {/* روابط الشركة */}
          <div className="md:w-1/4">
            <h3 className="text-xl text-black font-semibold mb-4">الشركة</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-800 hover:text-black">
                  الصفحة الرئيسية
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-800 hover:text-black">
                  عنا
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-800 hover:text-black">
                  التوصيل
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-800 hover:text-black">
                  سياسة الخصوصية
                </a>
              </li>
            </ul>
          </div>

          {/* تواصل معنا */}
          <div className="col-span-2 sm:col-auto">
              <h1 className="text-xl font-bold sm:text-left mb-3">العنوان</h1>
              <div>
                <div className="flex items-center gap-3 mt-6">
                  <FaLocationArrow />
                  <p>الدار البيضاء, البرنوصي</p>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <FaMobileAlt />
                  <p>0621541569</p>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <Link href={"https://www.instagram.com/omartahir25/"}>
                    <FaInstagram className="text-2xl hover-text-black duration-200 hover:text-primary" />
                  </Link>
                  <Link href={"#"}>
                    <FaLinkedin className="text-2xl hover-text-black duration-200 hover:text-primary" />
                  </Link>
                  <Link href={"#"}>
                    <FaFacebook className="text-2xl hover-text-black duration-200 hover:text-primary" />
                  </Link>
                </div>
              </div>
            </div>
        </div>

        {/* قسم حقوق الطبع */}
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          <p className="text-balck text-md">
            حقوق الطبع والنشر 2024@ idriss.dev - جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
