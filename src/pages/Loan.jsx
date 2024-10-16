import { useState } from "react";
import api from "../api";
import LoanTable from "../components/LoanTable";
import AddLoan from "../components/AddLoan";

export default function Loan({
  loans,
  setLoans,
  AlertSucceed,
  succeed,
  AlertFailed,
  failed,
  books,
  members,
  setBooks,
  cards,
}) {
  const [openpopup, setOpenpopup] = useState(false);

  function toggleShow() {
    setOpenpopup(!openpopup);
    !openpopup
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }

  const deleteLoan = (id) => {
    api
      .delete(`/rentbook/delete/${id}/`)
      .then((res) => {
        if (res.status === 200) AlertSucceed();
        else AlertFailed();
        setLoans(loans.filter((loan) => loan.id !== id));
      })
      .catch((error) => AlertFailed());
  };

  const addLoan = (loan) => {
    api
      .post("/rentbook/", loan)
      .then((res) => {
       
        return res.data;
      })
      .then((data) => {
        AlertSucceed();
        console.log(data)
        setLoans([...loans, data.RentBook]);
      })
      .catch((err) => AlertFailed());
  };

  const editLoan = (loanId, updatedLoan) => {
    api
      .put(`/rentbook/update/${loanId}/`, updatedLoan)
      .then((res) => {
       
        return res.data;
      })
      .then((data) => {
        AlertSucceed();
        setLoans(
          loans.map((loan) => (loan.id === loanId ? data.updatedloan : loan))
        );
      })
      .catch((err) => AlertFailed());
  };

  const editBook = (bookId, updatedBook) => {
    api
      .put(`/books/update/${bookId}/`, updatedBook)
      .then((res) => {
    
        return res.data;
      })
      .then((data) => {
        AlertSucceed();
        setBooks(books.map((book) => (book.id === bookId ? data.book : book)));
      })
      .catch((err) => AlertFailed());
  };
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
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
          قائمة الإعارات النشطة
        </h1>
        <input
          type="text"
          placeholder="البحث في الإعارات النشطة"
          value={search}
          onChange={(data) => setSearch(data.target.value)}
          className="bg-neutral-0 w-80 border py-2 px-4 focus:outline-none focus:border-blue-600 focusborder-b-2 transition-colors rtl-cursor rounded text-center shadow-md"
        />

        <AddLoan
          books={books}
          toggleShow={toggleShow}
          openloan={openpopup}
          members={members.filter((member) => {
            const hasCard = cards.some((card) => card.student_id === member.id);
            return hasCard;
          })}
          addLoan={addLoan}
          editBook={editBook}
        />
      </div>
      <LoanTable
        loans={loans.filter((loan) => {
          return loan ? loan.isReturned === false : null;
        })}
        search={search}
        toggleShow={toggleShow}
        openloan={openpopup}
        deleteLoan={deleteLoan}
        members={members}
        books={books}
        editLoan={editLoan}
        editBook={editBook}
        table={"1"}
      />
      <br />
      <hr />
      <div className="flex items-center place-content-between">
        <h1 className="text-right font-semibold text-lg p-4 mx-6 ">
          قائمة الإعارات المنجزة
        </h1>
        <input
          type="text"
          placeholder="البحث في الإعارات المنجزة"
          value={search2}
          onChange={(data) => setSearch2(data.target.value)}
          className="bg-neutral-0 w-80 border py-2 px-4 mx-10 focus:outline-none focus:border-blue-600 focusborder-b-2 transition-colors rtl-cursor rounded text-center shadow-md"
        />
      </div>
      <LoanTable
        loans={loans.filter((loan) => {
          return loan ? loan.isReturned === true : null;
        })}
        search={search2}
        toggleShow={toggleShow}
        openloan={openpopup}
        deleteLoan={deleteLoan}
        members={members}
        books={books}
        editLoan={editLoan}
        editBook={editBook}
        table={"2"}
      />
    </div>
  );
}
