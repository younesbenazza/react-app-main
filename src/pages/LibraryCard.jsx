import { useState } from "react";
import api from "../api";
import LibraryCardTable from "../components/LibraryCardTable";
import AddLibraryCard from "../components/AddLibraryCard";
import DeleteALL from "../components/DeleteALL";

export default function LibraryCard({
  AlertSucceed,
  succeed,
  AlertFailed,
  failed,
  libraryCards,
  setLibraryCards,
  members,
}) {
  const [openpopup, setOpenpopup] = useState(false);

  function toggleShow() {
    setOpenpopup(!openpopup);
    !openpopup
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }

  const deleteLibraryCard = (id) => {
    api
      .delete(`/librarycard/delete/${id}/`)
      .then((res) => {
        if (res.status === 200) AlertSucceed();
        else AlertFailed();
        setLibraryCards(
          libraryCards.filter((libraryCard) => libraryCard.id !== id)
        );
      })
      .catch((error) => AlertFailed());
  };

  const deleteAllLibraryCards = () => {
    api
      .delete(`/librarycards/delete/`)
      .then((res) => {
        if (res.status === 200) {
          AlertSucceed();
          setLibraryCards([]);
        } else {
          AlertFailed();
        }
      })
      .catch(() => AlertFailed());
  };

  const addLibraryCard = (newlibrarycard) => {
    api
      .post("/librarycard/create/", newlibrarycard)
      .then((res) => {
        
        return res.data;
      })
      .then((data) => {
        AlertSucceed();
        setLibraryCards([...libraryCards, data.LibraryCard]);
      })
      .catch((err) => AlertFailed());
  };

  const addLibraryCards = (newLibraryCards) => {
    Promise.all(
      newLibraryCards.map((newCard) =>
        api.post("/librarycard/create/", newCard).then((res) => {
          
            return res.data.LibraryCard;
          
        })
      )
    )
      .then((newCards) => {
        setLibraryCards((prevCards) => [...prevCards, ...newCards]);
        AlertSucceed();
      })
      .catch((err) => {
        AlertFailed();
        console.error("Error adding library cards:", err);
      });
  };

  const [search, setSearch] = useState("");

  return (
    <div className="font-custom">
      {succeed && (
        <div className="flex justify-center">
          <div className="fixed bg-green-500  z-50 hover:bg-green-600 p-4 w-1/3 rounded-lg text-center text-white cursor-default">
            تمت العملية بنجاح
          </div>
        </div>
      )}
      {failed && (
        <div className="flex justify-center">
          <div className="fixed bg-red-500  z-50 hover:bg-red-600 p-4 w-1/3 rounded-lg text-center text-white cursor-default">
            فشلت العملية
          </div>
        </div>
      )}

      <div className="flex items-center place-content-between ">
        <h1 className="text-right font-semibold text-lg p-4 mx-6 ">
          قائمة البطاقات المستخرجة
        </h1>
        <input
          type="text"
          placeholder="البحث في البطاقات"
          value={search}
          onChange={(data) => setSearch(data.target.value)}
          className="bg-neutral-0 w-80 border py-2 px-4 focus:outline-none focus:border-blue-600 focusborder-b-2 transition-colors rtl-cursor rounded text-center shadow-md"
        />
        <div className="flex ">
          <DeleteALL
            deleteFunc={deleteAllLibraryCards}
            text={"هل أنت متأكد من رغبتك في حذف جميع البطاقات"}
          />
          <AddLibraryCard
            cards={libraryCards}
            members={members}
            addLibraryCard={addLibraryCard}
            toggleShow={toggleShow}
            openpopup={openpopup}
            addLibraryCards={addLibraryCards}
          />
        </div>
      </div>

      <LibraryCardTable
        cards={libraryCards}
        search={search}
        toggleShow={toggleShow}
        openpopup={openpopup}
        deleteCard={deleteLibraryCard}
        members={members}
      />
    </div>
  );
}
