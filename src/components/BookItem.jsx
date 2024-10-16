import { useState } from "react";
import EditBook from "./EditBook";
import Delete from "./Delete";

export default function BookItem({ book, deleteBook, editBook }) {
  const [openpopup, setOpenpopup] = useState(false);

  function toggleShow() {
    setOpenpopup(!openpopup);
  }

  var status;
  if (book.statu == "available") {
    status = (
      <div className="bg-green-200 px-2 py-1 rounded-lg text-center cursor-default">
        متاح
      </div>
    );
  } else if (book.statu == "rented") {
    status = (
      <div className="bg-blue-200 px-2 py-1 rounded-lg text-center cursor-default">
        مستعار
      </div>
    );
  } else if (book.statu == "lost") {
    status = (
      <div className="bg-red-200 px-2 py-1 rounded-lg text-center cursor-default">
        ضائع
      </div>
    );
  }
  return (
    <tr className="bg-white border font-custom hover:bg-neutral-50 ">
      <td className="p-3 text-sm text-center text-gray-700 ">{book.id} </td>
      <td className="p-3 text-sm text-right text-gray-700">{book.title} </td>
      <td className="p-3 text-sm text-right text-gray-700">{book.category} </td>
      <td className="p-3 text-sm text-right text-gray-700">{book.author} </td>

      <td className="p-3 text-sm text-right text-gray-700 ">
        {book.published_date}
      </td>
      <td className="p-3 text-sm text-right text-gray-700">
        {book.class_number}
      </td>
      <td className="p-3 text-sm text-right text-gray-700">
        {book.entry_date}
      </td>
      <td className="p-3 text-sm text-right text-gray-700 ">
        <span>{book.price} دج</span>
      </td>
      <td className="p-3 text-sm  text-gray-700 ">{status}</td>
      <td className="p-3 flex items-center justify-center gap-4">
        <EditBook
          book={book}
          toggleShow={toggleShow}
          openbook={openpopup}
          editBook={editBook}
        />
        <Delete
          deleteFunc={deleteBook}
          id={book.id}
          text={"هل أنت متأكد من رغبتك في حذف الكتاب؟"}
        />
      </td>
    </tr>
  );
}
