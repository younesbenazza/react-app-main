import { useState } from "react";
import Delete from "./Delete";
import EditArchive from "./EditArchive";

export default function ArchiveItem({ archive, deleteArchive, editArchive }) {
  const [openpopup, setOpenpopup] = useState(false);

  function toggleShow() {
    setOpenpopup(!openpopup);
  }

  return (
    <tr className="bg-white border font-custom hover:bg-neutral-50 ">
      <td className="p-3 text-sm text-center text-gray-700 ">{archive.id} </td>
      <td className="p-3 text-sm text-right text-gray-700">
        {archive.last_name}
      </td>
      <td className="p-3 text-sm text-right text-gray-700">
        {archive.first_name}
      </td>
      <td className="p-3 text-sm text-right text-gray-700 ">
        {archive.birth_date}
      </td>
      <td className="p-3 text-sm text-right text-gray-700">
        {archive.birth_place}
      </td>
      <td className="p-3 text-sm text-right text-gray-700">
        {archive.class_name}
      </td>
      <td className="p-3 text-sm text-right text-gray-700">
        {archive.document_name}
      </td>

      <td className="p-3 flex items-center justify-center gap-4">
        <EditArchive
          editArchive={editArchive}
          archive={archive}
          toggleShow={toggleShow}
          openarchive={openpopup}
        />
        <Delete
          deleteFunc={deleteArchive}
          id={archive.id}
          text={"هل أنت متأكد من رغبتك في حذف الملف؟"}
        />
      </td>
    </tr>
  );
}
