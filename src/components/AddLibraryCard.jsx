import { useState } from "react";
import Modal from "./Modal";

import PrintLibraryCards from "./PrintLibraryCards";
import SmallMembersTable from "./SmallMembersTable";

export default function AddLibraryCard({
  toggleShow,
  addLibraryCard,
  members,
  cards,
  openpopup,
  addLibraryCards,
}) {
  const [collegeYear, setCollegeYear] = useState("");
  const [students, setStudents] = useState([]);
  const [step, setStep] = useState("1");

  function clearinputs() {
    setStudents([]);
    setCollegeYear("");
    setStep("1");
  }

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (students.length > 0) {
      let newLibraryCards = students.map((student) => ({
        student_id: student.id,
        collegeYear: collegeYear,
      }));

      addLibraryCards(newLibraryCards);
    } else {
      let newLibraryCard1 = {
        student_id: students[0].id,
        collegeYear: collegeYear,
      };
      addLibraryCard(newLibraryCard1);
    }

    toggleShow();
    clearinputs();
  };
  return (
    <div className="">
      <button
        className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg font-custom mx-4 text-white shadow-md"
        onClick={toggleShow}
      >
        إستخراج البطاقات
      </button>

      <Modal open={openpopup} onClose={toggleShow}>
        <div className="m-2 p-5 ">
          {step === "1" && (
            <SmallMembersTable
              members={members.filter((member) => {
                const hasCard = cards.some(
                  (card) => card.student_id === member.id
                );
                return !hasCard;
              })}
              setStudents={setStudents}
              students={students}
              setStep={setStep}
            />
          )}

          {step === "2" && (
            <form onSubmit={handleSubmit} className="flex flex-col p-4">
              <div className="text-right p-2 font-custom">
                يرجى إدخال السنة الدراسية ثم الضغط على إطبع
              </div>
              <br />
              <br />
              <br />

              <div className=" relative p-2 flex gap-3">
                <input
                  type="text"
                  className="bg-neutral-50 w-56 border-b py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer"
                  id="collegeYear"
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={collegeYear}
                  onChange={(data) => setCollegeYear(data.target.value)}
                />
                <label
                  htmlFor="collegeYear"
                  className="absolute right-2 top-3 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  السنة الدراسية
                </label>
                <PrintLibraryCards
                  students={students}
                  collegeYear={collegeYear}
                />
              </div>
              <br />
              <br />
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  checked={isChecked}
                  className="h-4 w-4 cursor-pointer"
                  required
                />
                <span className="mx-2">لقد قمت بطبع جميع البطاقات</span>
              </label>
              <br />
              <div className="flex m-4 p-2 gap-4">
                <button
                  onClick={() => {
                    setStudents([]);
                    setStep("1");
                    setCollegeYear("");
                  }}
                  className=" bg-red-400 hover:bg-red-500 py-2 px-5 rounded-lg font-custom "
                >
                  العودة
                </button>
                <button
                  type="submit"
                  className=" bg-blue-500 hover:bg-blue-600 py-2 px-5 rounded-lg font-custom text-white"
                >
                  تأكيد العملية
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
}
