import Image from "next/image";
import React from "react";
import SubscriptionForm from "./Subscription";

export default function AboutUs() {
  return (
    <div className="min-h-screen py-10 px-4">
      {/* قسم "من نحن" */}
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* الجانب الأيسر - الصورة */}
        <div className="w-full lg:w-1/2">
          <Image
            src="/images/contact_img.png"
            alt="صورة من نحن"
            width={500}
            height={500}
            className="rounded-lg object-cover"
          />
        </div>

        {/* الجانب الأيمن - النص */}
        <div className="w-full lg:w-1/2 text-slate-800 text-right">
          <h1 className="text-4xl font-bold mb-6">من نحن</h1>
          <p className="text-lg mb-4">
            تأسست "Forever" نتيجة شغفنا بالابتكار ورغبتنا في إحداث ثورة في طريقة
            التسوق عبر الإنترنت. بدأ مشوارنا بفكرة بسيطة: توفير منصة تُمكّن
            العملاء من اكتشاف واستكشاف وشراء مجموعة واسعة من المنتجات بكل سهولة
            وراحة.
          </p>
          <p className="text-lg mb-4">
            منذ انطلاقتنا، عملنا بلا كلل على تقديم مجموعة متنوعة من المنتجات
            عالية الجودة التي تلبي جميع الأذواق والتفضيلات. من الموضة والجمال
            إلى الإلكترونيات واللوازم المنزلية، نوفر مجموعة شاملة من العلامات
            التجارية والموردين الموثوق بهم.
          </p>
          <h2 className="text-2xl font-semibold mt-6">رسالتنا</h2>
          <p className="text-lg mt-4">
            رسالتنا في "Forever" هي تمكين العملاء من الاختيار، والراحة، والثقة.
            نحن ملتزمون بتقديم تجربة تسوق سلسة تفوق التوقعات، بدءًا من التصفح
            والطلب إلى التسليم وما بعد ذلك.
          </p>
        </div>
      </div>

      {/* قسم "لماذا تختارنا" */}
      <div className="py-10 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          {/* العنوان */}
          <h1 className="text-4xl font-bold text-slate-800 mb-8">
            لماذا تختارنا
          </h1>

          {/* قسم الميزات */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* الميزة الأولى - ضمان الجودة */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                ضمان الجودة
              </h2>
              <p className="text-lg text-slate-600">
                نختار ونفحص كل منتج بعناية لضمان تلبية معايير الجودة الصارمة
                لدينا.
              </p>
            </div>

            {/* الميزة الثانية - الراحة */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                الراحة
              </h2>
              <p className="text-lg text-slate-600">
                مع واجهتنا السهلة الاستخدام وعملية الطلب البسيطة، أصبح التسوق
                أسهل من أي وقت مضى.
              </p>
            </div>

            {/* الميزة الثالثة - خدمة عملاء استثنائية */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                خدمة عملاء استثنائية
              </h2>
              <p className="text-lg text-slate-600">
                فريقنا المخصص من المحترفين هنا لمساعدتك في كل خطوة، مما يضمن أن
                تكون رضاك على رأس أولوياتنا.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* نموذج الاشتراك */}
      <SubscriptionForm />
    </div>
  );
}
