import { useState } from "react";
import Modal from "./Modal";
export default function DeleteALL({ deleteFunc, text }) {
  const [openpopup, setOpenpopup] = useState(false);

  function toggleShow() {
    setOpenpopup(!openpopup);
  }
  return (
    <div className="font-custom">
      <button
        className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg font-custom  text-white shadow-md"
        onClick={() => toggleShow()}
      >
        حذف الكل
      </button>
      <Modal open={openpopup} onClose={toggleShow}>
        <div className="">
          <div className="my-5 p-6">
            <span className="text-lg font-bold p-4">{text}</span>
          </div>
          <div className=" p-4"></div>
          <div className="flex items-center mx-10 m-4 p-2 gap-4">
            <button
              onClick={() => {
                deleteFunc();
                toggleShow();
              }}
              className=" bg-red-500 hover:bg-red-600 py-2 px-5 rounded-lg  text-white"
            >
              حذف
            </button>
            <button
              onClick={() => toggleShow()}
              className=" bg-blue-400 hover:bg-blue-500 py-2 px-5 rounded-lg font-custom"
            >
              إلغاء
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
