export default function AboutUs() {
  return (
    <div className="min-h-screen  flex flex-col items-center p-6 font-custom ">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-12">
        <h1 className="text-3xl font-bold mb-4 text-center">عن التطبيق</h1>
        <p className="text-lg mb-6 text-right">
          مكتبتي هو تطبيق ويب مصمم لإدارة المكتبات والأرشيف يهدف إلى تحسين تجربة
          المستخدمين. يتميز بواجهة بسيطة وسهلة الاستخدام، مما يجعله الحل الأمثل
          لتنظيم المكتبات بفعالية.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-right">الميزات</h2>
        <ul className="list-disc list-inside mb-6 text-right">
          <li className="mb-2">طباعة بطاقات المكتبة</li>
          <li className="mb-2">صفحة الإحصائيات</li>
          <li className="mb-2">استعارة الكتب وإرجاعها</li>
          <li className="mb-2">معرفة حالة الكتب</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-right">المطورون</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">يونس بن عزة</h3>
            <p className="text-right">
              البريد الإلكتروني: younesbenazza.pro@gmail.com
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">هيثم عايمر</h3>
            <p className="text-right">
              البريد الإلكتروني: hxaimeur02@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
