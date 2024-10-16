import { useState } from "react";
export default function SmallBookTable({
  books,

  setStep,
  setBookId,
  setStudentId,
}) {
  const [search, setSearch] = useState("");
  return (
    <div className="">
      <div className="flex items-center place-content-between">
        <div className="text-right p-2 font-custom">
          يرجى إختيار كتاب من القائمة
        </div>
        <input
          type="text"
          placeholder="البحث عن الكتب"
          value={search}
          onChange={(data) => setSearch(data.target.value)}
          className="mx-6 bg-neutral-0 w-80 border py-2 px-4 focus:outline-none focus:border-blue-600 focusborder-b-2 transition-colors rtl-cursor rounded text-center"
        />{" "}
      </div>
      <div className="min-h-[400px]">
        <div className="m-2 overflow-y-auto max-h-[500px] shadow-md">
          <table className="w-full border font-custom  ">
            <thead className="sticky -top-0.5 bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="p-3 text-sm  font-semibold tracking-wide text-right w-24 ">
                  المعرف
                </th>
                <th className="p-3 text-sm w-44 font-semibold tracking-wide text-right">
                  عنوان الكتاب
                </th>
                <th className="p-3 text-sm w-44 font-semibold tracking-wide text-right">
                  الصنف
                </th>
                <th className="p-3 text-sm w-44 font-semibold tracking-wide text-right">
                  المؤلف
                </th>
                <th className="p-3 text-sm w-44 font-semibold tracking-wide text-right">
                  رقم الصنف
                </th>
                <th className="p-3 text-sm w-32 font-semibold tracking-wide text-center ">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books
                  .filter((book) => {
                    return book
                      ? book.statu.toLowerCase() === "available"
                      : null;
                  })
                  .filter((book) =>
                    book
                      ? book.title
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        book.category
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        book.author.toLowerCase().includes(search.toLowerCase())
                      : null
                  )
                  .map((book, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => {
                          setBookId(book.id);
                          setStep("3");
                        }}
                        className="bg-white border font-custom hover:bg-neutral-50 hover:cursor-pointer"
                      >
                        <td className="p-3 text-sm text-center text-gray-700 ">
                          {book.id}{" "}
                        </td>
                        <td className="p-3 text-sm text-right text-gray-700">
                          {book.title}{" "}
                        </td>
                        <td className="p-3 text-sm text-right text-gray-700">
                          {book.category}{" "}
                        </td>
                        <td className="p-3 text-sm text-right text-gray-700">
                          {book.author}{" "}
                        </td>
                        <td className="p-3 text-sm text-right text-gray-700">
                          {book.class_number}
                        </td>
                        <td className="p-2">
                          <div className="bg-green-200 px-2 py-1 rounded-lg text-center">
                            متاح
                          </div>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-2">
                    لا يوجد بيانات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex m-4 p-2 gap-4">
        <button
          onClick={() => {
            setStudentId("");
            setStep("1");
          }}
          className=" bg-red-400 hover:bg-red-500 py-2 px-5 rounded-lg font-custom "
        >
          العودة
        </button>
      </div>
    </div>
  );
}
