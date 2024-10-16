import LoanItem from "./LoanItem";

export default function LoanTable({
  loans,
  search,
  deleteLoan,
  books,
  members,
  editLoan,
  editBook,
  table,
}) {
  function getObjectbyId(list, id) {
    return list ? list.find((object) => object.id === id) : "";
  }
  return (
    <div className="min-h-[300px]">
      <div className="m-2 overflow-y-auto max-h-[500px]  shadow-md">
        <table className="w-full border font-custom">
          <thead className="sticky -top-0.5 bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-right w-10 ">
                المعرف
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-right">
                إسم و لقب التلميذ
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-right">
                عنوان الكتاب
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-right">
                تاريخ الإعارة
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-right ">
                تاريخ الإرجاع
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-center ">
                المدة الكلية
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-center ">
                المدة المتبقية
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-center">
                حالة الإعارة
              </th>

              <th className="p-3 text-sm font-semibold tracking-wide text-center">
                إجراء تعديل
              </th>
            </tr>
          </thead>
          <tbody>
            {loans.length > 0 ? (
              loans

                .filter((loan) => {
                  const member = getObjectbyId(members, loan.student_id);
                  const book = getObjectbyId(books, loan.book_id);
                  return loan
                    ? (member &&
                        (member.last_name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                          member.first_name
                            .toLowerCase()
                            .includes(search.toLowerCase()))) ||
                        (book &&
                          book.title
                            .toLowerCase()
                            .includes(search.toLowerCase()))
                    : null;
                })
                .map((loan, index) => {
                  return (
                    <LoanItem
                      key={index}
                      loan={loan}
                      deleteLoan={deleteLoan}
                      members={members}
                      books={books}
                      editLoan={editLoan}
                      editBook={editBook}
                      table={table}
                    />
                  );
                })
            ) : (
              <tr>
                <td colSpan={9} className="text-center p-2">
                  لا يوجد بيانات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
