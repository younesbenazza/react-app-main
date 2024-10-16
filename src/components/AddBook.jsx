import { useState } from "react";
import Modal from "./Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ar from "date-fns/locale/ar";
import moment from "moment";

export default function AddBook({ addBook, toggleShow, openbook }) {
  const [publishDate, setPublishDate] = useState(null);
  const [enterDate, setEnterDate] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [author, setAuthor] = useState("");
  const [classNum, setClassNum] = useState("");
  const [price, setPrice] = useState("");

  function clearinputs() {
    setTitle("");
    setType("");
    setAuthor(""), setClassNum("");
    setPrice("");
    setEnterDate("");
    setPublishDate("");
  }
  return (
    <div className="">
      <button
        className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg font-custom mx-6 text-white shadow-md"
        onClick={toggleShow}
      >
        إضافة كتاب
      </button>

      <Modal open={openbook} onClose={toggleShow}>
        <div className="m-2 p-5">
          <div className="text-right p-2 font-custom">
            يرجى إدخال معلومات الكتاب
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newBook = {
                title: title,
                category: type,
                author: author,
                class_number: classNum,
                price: price,
                entry_date: moment(enterDate).format("YYYY-MM-DD"),
                published_date: moment(publishDate).format("YYYY-MM-DD"),
                statu: "available",
              };
              addBook(newBook);
              toggleShow();
              clearinputs();
            }}
            className="flex flex-col p-4"
          >
            <div className="p-2 flex flex-row gap-3">
              <div className="relative my-2">
                <input
                  type="text"
                  className="bg-neutral-50 w-56 border-b py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer"
                  id="title"
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={title}
                  onChange={(data) => setTitle(data.target.value)}
                />
                <label
                  htmlFor="title"
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  عنوان الكتاب
                </label>
              </div>
              <div className="relative my-2">
                <input
                  type="text"
                  className="bg-neutral-50 w-56 border-b py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer"
                  id="type"
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={type}
                  onChange={(data) => setType(data.target.value)}
                />
                <label
                  htmlFor="type"
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  صنف الكتاب
                </label>
              </div>
            </div>

            <div className="flex gap-3 p-2 flex-row">
              <div className="relative my-2">
                <input
                  type="text"
                  className="bg-neutral-50 border-b w-56 py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer"
                  id="author"
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={author}
                  onChange={(data) => setAuthor(data.target.value)}
                />
                <label
                  htmlFor="author"
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  المؤلف
                </label>
              </div>

              <div className="relative my-2">
                <input
                  type="text"
                  className="bg-neutral-50 w-56 border-b py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer "
                  id="classNum"
                  autoComplete="off"
                  placeholder=" "
                  required
                  onChange={(data) => setClassNum(data.target.value)}
                  value={classNum}
                />
                <label
                  htmlFor="classNum"
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  رقم الصنف
                </label>
              </div>
            </div>
            <div className="p-2 flex gap-3">
              <DatePicker
                selected={publishDate}
                onChange={(date) => setPublishDate(date)}
                locale={ar}
                dateFormat="yyyy/MM/dd"
                className="bg-neutral-50 w-56 border-b my-1 py-1 px-2 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors text-right placeholder-neutral-600 font-custom cursor-pointer "
                placeholderText="تاريخ النشر"
                required
                showYearDropdown
                showMonthDropdown
                scrollableYearDropdown
                maxDate={new Date()}
              />
              <DatePicker
                selected={enterDate}
                onChange={(date) => setEnterDate(date)}
                locale={ar}
                dateFormat="yyyy/MM/dd"
                className="bg-neutral-50 w-56 border-b my-1 py-1 px-2 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors text-right placeholder-neutral-600 font-custom cursor-pointer"
                placeholderText="تاريخ الدخول"
                required
                showYearDropdown
                showMonthDropdown
                scrollableYearDropdown
                maxDate={new Date()}
              />
            </div>
            <div className="flex gap-3 p-2">
              <div className="relative my-2">
                <input
                  type="number"
                  className="bg-neutral-50 w-56 border-b py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer "
                  id="price"
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={price}
                  onChange={(data) => setPrice(data.target.value)}
                />
                <label
                  htmlFor="price"
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  السعر
                </label>
              </div>
            </div>
            <div className="flex m-4 p-2 gap-4">
              <button className=" bg-blue-400 hover:bg-blue-500 py-2 px-5 rounded-lg font-custom">
                أضف
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
