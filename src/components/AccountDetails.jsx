export default function AccountDetails({ ih }) {
  return (
    <div className=" text-right font-custom p-6  ">
      <h1 className="font-bold text-xl p-4">معلومات الحساب</h1>
      <div className="font-semibold p-2 flex flex-row">
        <span className="mx-1">الإسم</span>
        <span className="mx-1">:</span>
        <span className="mx-3 font-medium">يونس </span>
      </div>
      <div className="p-2 font-semibold flex flex-row">
        <span className="mx-1">اللقب :</span>

        <span className="mx-3 font-medium">بن عزة </span>
      </div>
      <div className="p-2 font-semibold flex flex-row">
        <span className="mx-1">إسم المستخدم :</span>

        <span className="mx-3 font-medium">younes </span>
      </div>
      <div className="p-2 font-semibold flex flex-row">
        <span className="mx-1">البريد الإلكتروني :</span>

        <span className="mx-3 font-medium">younes@gmail.com </span>
      </div>
    </div>
  );
}
