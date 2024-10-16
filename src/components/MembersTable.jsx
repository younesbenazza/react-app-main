import MemberItem from "./MemberItem";

export default function MembersTable({
  members,
  search,
  deleteMember,
  editMember,
}) {
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
            <th className="p-3 text-sm font-semibold tracking-wide text-center w-40">
              إجراء تعديل
            </th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members
              .filter((member) =>
                member
                  ? member.first_name
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    member.last_name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  : null
              )
              .map((member) => {
                return (
                  <MemberItem
                    key={member.id}
                    member={member}
                    deleteMember={deleteMember}
                    editMember={editMember}
                  />
                );
              })
          ) : (
            <tr>
              <td colSpan={7} className="text-center p-2">
                لا يوجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
