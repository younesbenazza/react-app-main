import AddMember from "../components/AddMember";
import MembersTable from "../components/MembersTable";
import { useState, useEffect } from "react";
import api from "../api";

export default function Members({
  members,
  setMembers,
  AlertSucceed,
  succeed,
  AlertFailed,
  failed,
  setAlerting
}) {
  const [openpopup, setOpenpopup] = useState(false);

  function toggleShow() {
    setOpenpopup(!openpopup);
  }

  const deleteMember = (id) => {
    api
      .delete(`/student/delete/${id}/`)
      .then((res) => {
        if (res.status === 200) setAlerting((prev)=>!prev);
        else AlertFailed();
        setMembers(members.filter((member) => member.id !== id));
      })
      .catch((error) => AlertFailed());
  };

  const addMember = (Member) => {
    api
      .post("/student/add/", Member)
      .then((res) => {
        
        return res.data;
      })
      .then((data) => {
        setMembers([...members, data.New_Student]);
        AlertSucceed();
      })
      .catch((err) => AlertFailed());
  };

  const editMember = (MemberId, updatedMember) => {
    api
      .put(`/student/update/${MemberId}/`, updatedMember)
      .then((res) => {
        
        return res.data;
      })
      .then((data) => {
        setMembers(
          members.map((Member) =>
            Member.id === MemberId ? data.student : Member
          )
        );
        AlertSucceed();
      })
      .catch((err) => AlertFailed());
  };

  const [search, setSearch] = useState("");
  return (
    <div className="font-custom">
      {succeed && (
        <div className="flex justify-center ">
          <div className="fixed  z-50 bg-green-500 hover:bg-green-600 p-4 w-1/3 rounded-lg text-center text-white cursor-default">
            تمت العملية بنجاح
          </div>
        </div>
      )}
      {failed && (
        <div className="flex justify-center">
          <div className="fixed  z-50 bg-red-500 hover:bg-red-600 p-4 w-1/3 rounded-lg text-center text-white cursor-default">
            فشلت العملية
          </div>
        </div>
      )}
      <div className="">
        <div className="flex items-center place-content-between">
          <h1 className="text-right font-semibold text-lg p-4 mx-6 ">
            قائمة التلاميذ
          </h1>
          <input
            type="text"
            placeholder="البحث عن التلاميذ"
            value={search}
            onChange={(data) => setSearch(data.target.value)}
            className="bg-neutral-0 w-80 border py-2 px-4 focus:outline-none focus:border-blue-600 focusborder-b-2 transition-colors rtl-cursor rounded text-center shadow-md"
          />

          <AddMember
            addMember={addMember}
            toggleShow={toggleShow}
            openmember={openpopup}
          />
        </div>
        <MembersTable
          members={members}
          search={search}
          deleteMember={deleteMember}
          editMember={editMember}
        />
      </div>
    </div>
  );
}
