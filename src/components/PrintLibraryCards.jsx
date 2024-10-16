import React from "react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";

const A4_HEIGHT = 297;

const LibraryCardTemplate = React.forwardRef((props, ref) => {
  const cardHeight = `${A4_HEIGHT / 4}mm`;

  return (
    <div
      ref={ref}
      style={{ height: cardHeight, direction: "rtl" }}
      className="border border-black  "
    >
      <div className="flex place-content-between">
        <p className="px-2">المكتبة</p>
        <p className="px-2  ">ثانوية عريبي الهواري</p>
      </div>
      <hr />
      <div className="flex place-content-between my-1">
        <p className="self-end px-2">الرقم : {props.student.id} </p>
        <h1 className="self-center text-xl font-bold">بطاقة المكتبة</h1>
        <div className="border border-black w-20 h-24 mx-3 "></div>
      </div>
      <p className="px-2">اللقب : {props.student.last_name} </p>
      <p className="px-2">الإسم : {props.student.first_name} </p>
      <p className="px-2">تاريخ الإزدياد : {props.student.birth_date} </p>
      <p className="px-2">القسم : {props.student.class_num} </p>
      <p className="px-2">السنة الدراسية : {props.collegeYear} </p>
    </div>
  );
});

const PrintLibraryCards = ({ students, collegeYear }) => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <button className="bg-green-500 hover:bg-green-600 py-2 px-10 mx-8 rounded-lg font-custom text-white">
            إطبع
          </button>
        )}
        content={() => componentRef.current}
        documentTitle="بطاقات أعضاء المكتبة"
        copyStyles={true}
      />
      <div ref={componentRef} className="printable">
        {students.map((student) => (
          <LibraryCardTemplate
            key={student.id}
            student={student}
            collegeYear={collegeYear}
          />
        ))}
      </div>
    </div>
  );
};

export default PrintLibraryCards;
