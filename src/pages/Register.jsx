import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

import LoadingIndicator from "../components/LoadingIndicator";
function Register({ setIsLogged }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  setIsLogged(false);
  const handleSubmit = async (e) => {
    setLoading(true);
    setError(false);
    e.preventDefault();

    try {
      const res = await api.post("/account/register/", {
        username: username,
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password,
      });

      navigate("/login");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center bg-neutral-50">
        {error && (
          <div className=" h-12 w-1/2 m-2  rounded bg-red-500 text-white fixed font-custom text-center p-2">
            خطأ في إسم المستخدم أو كلمة السر
          </div>
        )}
        <div className=" flex flex-col items-center justify-center  font-custom ">
          <div className="flex items-center place-content-center gap-3 hover:cursor-pointer p-5 m-4">
            <img
              className="w-12 h-12"
              src="/static/build/icons/library.png"
              alt=""
            />
            <span className=" font-medium text-lg  ">مكتبتي</span>
          </div>
          <form
            className="border flex flex-col px-10 py-4 rounded bg-white shadow-md"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center m-3">يرجى تسجيل حساب جديد</h1>
            <input
              type="text"
              placeholder="الإسم"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              className=" w-80 border h-12 rounded p-2 mx-4 my-1 py-1 focus:outline-none focus:border-blue-700 placeholder:text-right transition-colors "
              required
              id="firstname"
            />
            <input
              type="text"
              placeholder="اللقب"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              className=" w-80 border h-12 rounded p-2 mx-4 my-1 py-1 focus:outline-none focus:border-blue-700 placeholder:text-right transition-colors "
              required
              id="lastname"
            />
            <input
              type="text"
              placeholder="إسم المستخدم"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className=" w-80 border h-12 rounded p-2 mx-4 my-1 py-1 focus:outline-none focus:border-blue-700 placeholder:text-right transition-colors "
              required
              id="username"
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className=" w-80 border h-12 rounded p-2 mx-4 my-1 py-1 focus:outline-none focus:border-blue-700 placeholder:text-right transition-colors "
              required
              id="email"
            />
            <input
              type="password"
              placeholder="كلمة السر"
              value={password}
              required
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-80 border h-12 rounded p-2 mx-4 my-1 py-1 focus:outline-none focus:border-blue-700 placeholder:text-right transition-colors"
            />
            <div className="flex flex-col items-center justify-center m-4 p-2 gap-3 ">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 py-3 px-5 rounded-lg w-40 text-white font-semibold text-sm"
              >
                {loading ? <LoadingIndicator /> : "تسجيل"}
              </button>
            </div>
          </form>
          <br />
          <p className="p-2">جميع الحقوق محفوظة &copy; 2024</p>
        </div>
      </div>
    </>
  );
}

export default Register;
