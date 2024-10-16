import { useState } from "react";
import api from "../api";
import AddArchive from "../components/AddArchive";
import ArchiveTable from "../components/ArchiveTable";

export default function Archive({
  archives,
  setArchives,
  AlertSucceed,
  succeed,
  AlertFailed,
  failed,
}) {
  const [openpopup, setOpenpopup] = useState(false);
  const [search, setSearch] = useState("");

  function toggleShow() {
    setOpenpopup(!openpopup);
  }

  const deleteArchive = (id) => {
    api
      .delete(`/archive/delete/${id}/`)
      .then((res) => {
        if (res.status === 200) AlertSucceed();
        else AlertFailed();
        setArchives(archives.filter((archive) => archive.id !== id));
      })
      .catch((error) => AlertFailed());
  };

  const addArchive = (archive) => {
    api
      .post("/archive/add/", archive)
      .then((res) => {
        if (res.status === 200) AlertSucceed();
        else AlertFailed();
        return res.data;
      })
      .then((data) => {
        setArchives([...archives, data.Archive]);
      })
      .catch((err) => AlertFailed());
  };

  const editArchive = (ArchiveId, updatedArchive) => {
    api
      .put(`/archive/update/${ArchiveId}/`, updatedArchive)
      .then((res) => {
        if (res.status === 200) AlertSucceed();
        else AlertFailed();
        return res.data;
      })
      .then((data) => {
        setArchives(
          archives.map((archive) =>
            archive.id === ArchiveId ? data.Archive : archive
          )
        );
      })
      .catch((err) => AlertFailed());
  };

  return (
    <div className="font-custom">
      {succeed && (
        <div className="flex justify-center ">
          <div className="fixed bg-green-500 hover:bg-green-600 p-4 w-1/3 rounded-lg text-center text-white cursor-default">
            تمت العملية بنجاح
          </div>
        </div>
      )}
      {failed && (
        <div className="flex justify-center">
          <div className="fixed bg-red-500 hover:bg-red-600 p-4 w-1/3 rounded-lg text-center text-white cursor-default">
            فشلت العملية
          </div>
        </div>
      )}

      <div className="">
        <div className="flex items-center place-content-between">
          <h1 className="text-right font-semibold text-lg p-4 mx-6 ">
            قائمة الأرشيف
          </h1>
          <input
            type="text"
            placeholder="البحث في الأرشيف"
            value={search}
            onChange={(data) => setSearch(data.target.value)}
            className="bg-neutral-0 w-80 border py-2 px-4 focus:outline-none focus:border-blue-600 focusborder-b-2 transition-colors rtl-cursor rounded text-center shadow-md"
          />
          <AddArchive
            addArchive={addArchive}
            toggleShow={toggleShow}
            openarchive={openpopup}
          />
        </div>
        <ArchiveTable
          archives={archives}
          search={search}
          deleteArchive={deleteArchive}
          editArchive={editArchive}
        />
      </div>
    </div>
  );
}
