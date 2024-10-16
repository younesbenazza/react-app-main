import { Link } from "react-router-dom";
import { useState } from "react";
import EditMember from "./EditMember";
import Delete from "./Delete";

export default function MemberItem({ member, deleteMember, editMember }) {
  const [openpopup, setOpenpopup] = useState(false);

  function toggleShow() {
    setOpenpopup(!openpopup);
  }
  return (
    <tr className="bg-white border font-custom hover:bg-neutral-50">
      <td className="p-3 text-sm text-center text-gray-700 ">{member.id} </td>
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

      <td className="p-3 flex items-center justify-center gap-4">
        <EditMember
          member={member}
          toggleShow={toggleShow}
          openmember={openpopup}
          editMember={editMember}
        />
        <Delete
          deleteFunc={deleteMember}
          id={member.id}
          text={"هل أنت متأكد من رغبتك في حذف التلميذ؟"}
        />
      </td>
    </tr>
  );
}
