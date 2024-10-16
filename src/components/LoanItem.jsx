import { useState } from "react";
import Modal from "./Modal";

export default function LoanItem({
  loan,
  deleteLoan,
  books,
  members,
  editLoan,
  editBook,
  table,
}) {
  const [openpopup, setOpenpopup] = useState(false);
  const [returned, setReturned] = useState(loan.isReturned);

  function toggleShow() {
    setOpenpopup(!openpopup);
  }

  function getObjectbyId(list, id) {
    return list ? list.find((object) => object.id === id) : null;
  }
  const member = getObjectbyId(members, loan.student_id);
  const book = getObjectbyId(books, loan.book_id);
  var daysLeft = Math.max(
    Math.floor(
      (new Date(loan.return_date) - new Date()) / (1000 * 60 * 60 * 24)
    ),
    0
  );
  var hoursLeft = Math.max(
    Math.floor((new Date(loan.return_date) - new Date()) / (1000 * 60 * 60)) %
    24,
    0
  );
  return (
    <tr
      className={` border font-custom bg-white hover:bg-neutral-50 text-gray-600 
        `}
    >
      <td className="p-3 text-sm text-center  ">{loan.id} </td>
      <td className="p-3 text-sm text-right    ">
        <div className="flex gap-0.5">
          {" "}
          {member ? member.last_name : <p>معلومات التلميذ محذوفة</p>}
          <p></p>
          {member ? member.first_name : null}
        </div>
      </td>
      <td className="p-3 text-sm text-right ">
        {book ? book.title : <p>معلومات الكتاب محذوفة</p>}
      </td>
      <td className="p-3 text-sm text-right  ">{loan.rent_date}</td>
      <td className="p-3 text-sm text-right ">{loan.return_date}</td>
      <td className="p-3 text-sm  ">
        <div className="flex gap-0.5 justify-center">
          {Math.max(
            Math.floor(
              (new Date(loan.return_date) - new Date(loan.rent_date)) /
              (1000 * 60 * 60 * 24)
            ),
            0
          )}

          <p>يوم</p>
        </div>
      </td>
      <td className="p-3 text-sm flex items-center justify-center  ">
        {daysLeft <= 0 && hoursLeft <= 0 /*&& table === "1" */ ? (
          <div className=" text-center w-32 bg-red-600 font-semibold cursor-default text-white rounded-lg p-2">
            إنتهى الوقت
          </div>
        ) : (
          <div className="flex gap-1 justify-center">
            {daysLeft}
            <p>يوم</p>

            {hoursLeft}
            <p>ساعة</p>
          </div>
        )}
      </td>
      <td className="p-3 text-sm text-center ">
        {returned && (
          <button className="w-28 border rounded-lg p-2 bg-green-500 text-white  cursor-default">
            تم إرجاعه
          </button>
        )}{" "}
        {!returned && (
          <button
            onClick={() => {
              editLoan(loan.id, {
                ...loan,

                isReturned: true,
              });
              editBook(book.id, { ...book, statu: "available" });
            }}
            className="w-28 border rounded-lg p-2 bg-red-500 text-white hover:bg-red-600"
          >
            لم يتم إرجاعه
          </button>
        )}
      </td>

      <td className="p-3 flex items-center justify-center gap-4">
        <div className="">
          <button className="w-8 h-8" onClick={() => toggleShow()}>
            <img src="/static/build/icons/delete.png" alt="" />
          </button>
          <Modal open={openpopup} onClose={toggleShow}>
            <div className="">
              <div className="my-5 p-6">
                <span className="text-lg font-bold p-4">
                  هل أنت متأكد من رغبتك في حذف هذه الإعارة
                </span>
              </div>
              <div className=" p-4"></div>
              <div className="flex items-center mx-10 m-4 p-2 gap-4">
                <button
                  onClick={() => {
                    deleteLoan(loan.id);
                    const status =
                      book.statu === "rented" ? "available" : book.statu;
                    table === "1"
                      ? editBook(book.id, { ...book, statu: status })
                      : null;
                    toggleShow();
                  }}
                  className=" bg-red-500 hover:bg-red-600 py-2 px-5 rounded-lg font-custom text-white"
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
      </td>
    </tr>
  );
}
