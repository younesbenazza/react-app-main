import { Link } from "react-router-dom";

function Logout() {
  return (
    <div className="font-custom text-sm mx-3 flex justify-end ">
      <Link to="logout">
        <div className="py-2.5 px-4 text-white border border-blue-50 rounded-xl hover:bg-blue-600 bg-blue-500 font-semibold">
          تسجيل الخروج
        </div>
      </Link>
    </div>
  );
}

export default Logout;
