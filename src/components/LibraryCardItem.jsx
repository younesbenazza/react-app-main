import { useState } from "react";

import Delete from "./Delete";

export default function LibraryCardItem({ card, members, deleteCard }) {
  const [openpopup, setOpenpopup] = useState(false);

  function toggleShow() {
    setOpenpopup(!openpopup);
  }
  function getObjectbyId(list, id) {
    return list ? list.find((object) => object.id === id) : "";
  }
  const member = getObjectbyId(members, card.student_id);
  return (
    <tr className="bg-white border font-custom hover:bg-neutral-50">
      <td className="p-3 text-sm text-center text-gray-700 ">{card.id} </td>
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
      <td className="p-3 text-sm text-right text-gray-700">
        {card.collegeYear}
      </td>

      <td className="p-3 flex items-center justify-center gap-4">
        <Delete
          deleteFunc={deleteCard}
          id={card.id}
          text={"هل أنت متأكد من رغبتك في حذف البطاقة"}
        />
      </td>
    </tr>
  );
}
