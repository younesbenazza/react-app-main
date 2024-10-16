import { useState } from "react";
import Modal from "./Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ar from "date-fns/locale/ar";
import SmallBookTable from "./SmallBookTable";
import SmallMemberTable from "./SmallMemberTable";
import moment from "moment";

export default function AddLoan({
  addLoan,
  toggleShow,
  openloan,
  books,
  members,
  editBook,
}) {
  const [bookId, setBookId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [rentdate, setRentdate] = useState(null);
  const [returndate, setReturndate] = useState(null);
  const [step, setStep] = useState("1");

  function clearinputs() {
    setBookId("");
    setStudentId("");
    setRentdate("");
    setReturndate("");
    setStep("1");
  }
  function getObjectbyId(list, id) {
    return list ? list.find((object) => object.id === id) : null;
  }

  return (
    <div className="">
      <button
        className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg font-custom mx-6 text-white shadow-md"
        onClick={toggleShow}
      >
        إضافة إعارة
      </button>

      <Modal open={openloan} onClose={toggleShow}>
        <div className="m-2 p-5 ">
          {step === "1" && (
            <SmallMemberTable
              members={members}
              setStudentId={setStudentId}
              setStep={setStep}
            />
          )}
          {step === "2" && (
            <SmallBookTable
              books={books}
              setBookId={setBookId}
              setStudentId={setStudentId}
              setStep={setStep}
            />
          )}
          {step === "3" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const newLoan = {
                  book_id: bookId,
                  student_id: studentId,
                  rent_date: moment(rentdate).format("YYYY-MM-DD"),
                  return_date: moment(returndate).format("YYYY-MM-DD"),
                  isReturned: false,
                };
                addLoan(newLoan);
                editBook(bookId, {
                  ...getObjectbyId(books, bookId),
                  statu: "rented",
                });
                toggleShow();
                clearinputs();
              }}
              className="flex flex-col p-4"
            >
              <div className="text-right p-2 font-custom">
                يرجى إدخال معلومات الإعارة
              </div>
              <br />
              <br />
              <br />

              <div className="p-2 flex gap-3">
                <DatePicker
                  selected={rentdate}
                  onChange={(date) => setRentdate(date)}
                  locale={ar}
                  dateFormat="yyyy/MM/dd"
                  className="bg-neutral-50 w-56 border-b my-1 py-1 px-2 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors text-right placeholder-neutral-600 font-custom cursor-pointer "
                  placeholderText="تاريخ الإعارة"
                  required
                  showYearDropdown
                  showMonthDropdown
                  scrollableYearDropdown
                  maxDate={new Date()}
                />
                <DatePicker
                  selected={returndate}
                  onChange={(date) => setReturndate(date)}
                  locale={ar}
                  dateFormat="yyyy/MM/dd"
                  className="bg-neutral-50 w-56 border-b my-1 py-1 px-2 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors text-right placeholder-neutral-600 font-custom cursor-pointer"
                  placeholderText="تاريخ الإرجاع"
                  required
                  showYearDropdown
                  showMonthDropdown
                  scrollableYearDropdown
                  minDate={new Date()}
                />
              </div>
              <br />
              <br />
              <div className="flex m-4 p-2 gap-4">
                <button
                  onClick={() => {
                    setBookId("");
                    setStep("2");
                    setReturndate(null);
                    setRentdate(null);
                  }}
                  className=" bg-red-400 hover:bg-red-500 py-2 px-5 rounded-lg font-custom "
                >
                  العودة
                </button>
                <button className=" bg-blue-500 hover:bg-blue-600 py-2 px-5 rounded-lg font-custom text-white">
                  أضف
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
}
