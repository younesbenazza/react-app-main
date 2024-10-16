import ArchiveItem from "./ArchiveItem";

export default function ArchiveTable({
  archives,
  search,
  deleteArchive,
  editArchive,
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
            <th className="p-3 text-sm font-semibold tracking-wide text-right">
              رقم الصنف
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right">
              رقم الوثيقة
            </th>

            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              إجراء تعديل
            </th>
          </tr>
        </thead>
        <tbody>
          {archives.length > 0 ? (
            archives
              .filter((archive) =>
                archive
                  ? archive.last_name
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    archive.first_name
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    archive.birth_date
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    archive.birth_place
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  : null
              )
              .map((archive, index) => {
                return (
                  <ArchiveItem
                    key={index}
                    archive={archive}
                    deleteArchive={deleteArchive}
                    editArchive={editArchive}
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
