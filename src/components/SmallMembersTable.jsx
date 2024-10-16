import { useState, useEffect } from "react";
export default function SmallMembersTable({
  members,
  students,
  setStudents,
  setStep,
}) {
  const [search, setSearch] = useState("");

  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (selectAll) {
      setStudents(members);
    } else {
      setStudents([]);
    }
  }, [selectAll]);

  const handleCheck = (student, isChecked) => {
    if (isChecked) {
      setStudents([...students, student]);
    } else {
      setStudents(students.filter((s) => s.id !== student.id));
    }
  };

  return (
    <div className="">
      <div className="flex items-center place-content-between">
        <div className="text-right p-2 font-custom">
          يرجى إختيار التلاميذ من القائمة
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
        <div className="m-2 overflow-y-auto max-h-[500px] shadow-md">
          <table className="w-full border font-custom  ">
            <thead className="sticky -top-0.5 bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-center w-24 ">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => setSelectAll(e.target.checked)}
                    className="h-4 w-4 hover:cursor-pointer "
                  />
                </th>
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
                        className="bg-white border font-custom hover:bg-neutral-50 "
                      >
                        <td className="p-3 text-sm text-center text-gray-700 ">
                          <input
                            key={member.id}
                            type="checkbox"
                            checked={students.some((s) => s.id === member.id)}
                            onChange={(e) =>
                              handleCheck(member, e.target.checked)
                            }
                            className="h-4 w-4 hover:cursor-pointer"
                          />
                        </td>
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
                  <td colSpan={7} className="text-center p-2">
                    لا يوجد بيانات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end my-2 ">
        <button
          onClick={() => {
            if (students.length === 0) {
              alert("يرجى إختيار تلميذ واحد على الأقل");
            } else {
              setStep("2");
            }
          }}
          className=" bg-blue-500 hover:bg-blue-600 py-2 px-5 rounded-lg font-custom text-white "
        >
          التالي
        </button>
      </div>
    </div>
  );
}
