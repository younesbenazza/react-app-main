import LibraryCardItem from "./LibraryCardItem";

export default function LibraryCardTable({
  cards,
  search,
  deleteCard,
  members,
}) {
  function getObjectbyId(list, id) {
    return list ? list.find((object) => object.id === id) : "";
  }
  return (
    <div className="m-2 overflow-y-auto max-h-[500px] shadow-md">
      <table className="w-full border font-custom">
        <thead className="sticky -top-0.5 bg-gray-100 border-b-2 border-gray-300">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-right w-10 ">
              المعرف
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right">
              اللقب
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right">
              الإسم
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right">
              تاريخ الإزدياد
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right ">
              مكان الإزدياد
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right w-28">
              القسم
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right w-28">
              السنة الدراسية
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center w-40">
              إجراء تعديل
            </th>
          </tr>
        </thead>
        <tbody>
          {cards.length > 0 ? (
            cards
              .filter((card) => {
                const member = getObjectbyId(members, card.student_id);
                return (
                  member &&
                  (member.first_name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                    member.last_name
                      .toLowerCase()
                      .includes(search.toLowerCase()))
                );
              })
              .map((card) => {
                return (
                  <LibraryCardItem
                    key={card.id}
                    members={members}
                    card={card}
                    deleteCard={deleteCard}
                  />
                );
              })
          ) : (
            <tr>
              <td colSpan={8} className="text-center p-2">
                لا يوجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
