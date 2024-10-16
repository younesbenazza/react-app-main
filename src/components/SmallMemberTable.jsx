import { useState } from "react";
export default function SmallMemberTable({
  members,

  setStudentId,
  setStep,
}) {
  const [search, setSearch] = useState("");
  return (
    <div className="">
      <div className="flex items-center place-content-between">
        <div className="text-right p-2 font-custom">
          يرجى إختيار تلميذ من القائمة
        </div>
        <input
          type="text"
          placeholder="البحث عن التلاميذ"
          value={search}
          onChange={(data) => setSearch(data.target.value)}
          className="mx-6 bg-neutral-0 w-80 border py-2 px-4 focus:outline-none focus:border-blue-600 focusborder-b-2 transition-colors rtl-cursor rounded text-center"
        />{" "}
      </div>
      <div className="min-h-[400px]">
        <div className="m-2 overflow-y-auto max-h-[500px] shadow-md ">
          <table className="w-full border font-custom  ">
            <thead className="sticky -top-0.5 bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-right w-24 ">
                  المعرف
                </th>
                <th className="p-3 text-sm w-44 font-semibold tracking-wide text-right">
                  اللقب
                </th>
                <th className="p-3 text-sm w-44 font-semibold tracking-wide text-right">
                  الإسم
                </th>
                <th className="p-3 text-sm w-44 font-semibold tracking-wide text-right">
                  تاريخ الإزدياد
                </th>
                <th className="p-3 text-sm w-44 font-semibold tracking-wide text-right ">
                  مكان الإزدياد
                </th>
                <th className="p-3 text-sm w-32 font-semibold tracking-wide text-right ">
                  القسم
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
                  .map((member, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => {
                          setStudentId(member.id);
                          setStep("2");
                        }}
                        className="bg-white border font-custom hover:bg-neutral-50 hover:cursor-pointer"
                      >
                        <td className="p-3 text-sm text-center text-gray-700 ">
                          {member.id}{" "}
                        </td>
                        <td className="p-3 text-sm text-right text-gray-700">
                          {member.last_name}
                        </td>
                        <td className="p-3 text-sm text-right text-gray-700">
                          {member.first_name}
                        </td>
                        <td className="p-3 text-sm text-right text-gray-700 ">
                          {member.birth_date}
                        </td>
                        <td className="p-3 text-sm text-right text-gray-700">
                          {member.birth_place}
                        </td>
                        <td className="p-3 text-sm text-right text-gray-700">
                          {member.class_num}
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
    </div>
  );
}
