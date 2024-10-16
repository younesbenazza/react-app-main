export default function Card({ title, type, number, icon }) {
  var typeWrited = "";
  if (number == 1 || number == 0 || number > 10) {
    typeWrited = type[1];
  } else {
    typeWrited = type[0];
  }
  return (
    <div
      className="font-custom text-sm border p-4 h-44 text-right flex flex-col bg-blue-500 text-white rounded-lg  hover:bg-blue-600 border-blue-500 "
      style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.2) " }}
    >
      <div className="flex gap-3">
        <img className="w-8 h-8 " src={icon} alt="" />
        <span className="font-semibold text-lg ">{title}</span>
      </div>
      <span className="text-end text-3xl p-10 font-bold ">
        {number} {typeWrited}
      </span>
    </div>
  );
}
