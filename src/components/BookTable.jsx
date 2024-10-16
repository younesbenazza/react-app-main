import BookItem from "./BookItem";

export default function BookTable({ books, search, deleteBook, editBook }) {
  return (
    <div className="m-2 overflow-y-auto max-h-[500px] shadow-md">
      <table className="w-full border font-custom">
        <thead className="sticky -top-0.5 bg-gray-100 border-b-2 border-gray-300">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-right w-10 ">
              المعرف
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right">
              عنوان الكتاب
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right">
              الصنف
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right">
              المؤلف
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right">
              تاريخ النشر
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right">
              رقم الصنف
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right">
              تاريخ الدخول
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right">
              السعر
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right ">
              الحالة
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              إجراء تعديل
            </th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books
              .filter((book) =>
                book
                  ? book.title.toLowerCase().includes(search.toLowerCase()) ||
                    book.category
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    book.author.toLowerCase().includes(search.toLowerCase())
                  : null
              )
              .map((book, index) => {
                return (
                  <BookItem
                    key={index}
                    book={book}
                    deleteBook={deleteBook}
                    editBook={editBook}
                  />
                );
              })
          ) : (
            <tr>
              <td colSpan={10} className="text-center p-2">
                لا يوجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
