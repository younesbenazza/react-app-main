import AddBook from "../components/AddBook";
import BookTable from "../components/BookTable";
import { useState, useEffect } from "react";
import api from "../api";

function Books({
  books,
  setBooks,
  AlertSucceed,
  succeed,
  AlertFailed,
  failed,
}) {
  const [openpopup, setOpenpopup] = useState(false);

  function toggleShow() {
    setOpenpopup(!openpopup);
  }

  const deleteBook = (id) => {
    api
      .delete(`/books/delete/${id}/`)
      .then((res) => {
        if (res.status === 200) AlertSucceed();
        else AlertFailed();
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((error) => AlertFailed());
  };

  const addBook = (book) => {
    api
      .post("/books/add/", book)
      .then((res) => {
        
        return res.data;
      })
      .then((data) => {
        setBooks([...books, data.New_Book]);
        AlertSucceed();
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
        setBooks(books.map((book) => (book.id === bookId ? data.book : book)));
        AlertSucceed();
      })
      .catch((err) => AlertFailed());
  };

  const [search, setSearch] = useState("");
  return (
    <div className="font-custom">
      {succeed && (
        <div className="flex justify-center ">
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
      <div className="">
        <div className="flex items-center place-content-between">
          <h1 className="text-right font-semibold text-lg p-4 mx-6 ">
            قائمة الكتب
          </h1>
          <input
            type="text"
            placeholder="البحث عن الكتب"
            value={search}
            onChange={(data) => setSearch(data.target.value)}
            className="bg-neutral-0 w-80 border py-2 px-4 focus:outline-none focus:border-blue-600 focusborder-b-2 transition-colors rtl-cursor rounded text-center shadow-md"
          />
          <AddBook
            addBook={addBook}
            toggleShow={toggleShow}
            openbook={openpopup}
          />
        </div>
        <BookTable
          books={books}
          search={search}
          toggleShow={toggleShow}
          openbook={openpopup}
          deleteBook={deleteBook}
          editBook={editBook}
        />
      </div>
    </div>
  );
}

export default Books;
