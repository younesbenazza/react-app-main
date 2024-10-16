import { useState } from "react";
import Modal from "./Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ar from "date-fns/locale/ar";
import moment from "moment";

export default function EditArchive({
  archive,
  editArchive,
  toggleShow,
  openarchive,
}) {
  const [lastname, setLastname] = useState(archive.last_name);
  const [firstname, setFirstname] = useState(archive.first_name);
  const [birthdate, setBirthdate] = useState(archive.birth_date);
  const [birthplace, setBirthplace] = useState(archive.birth_place);
  const [classname, setClassname] = useState(archive.class_name);
  const [documentname, setDocumentname] = useState(archive.document_name);

  function clearinputs() {
    setLastname("");
    setFirstname("");
    setBirthplace("");
    setBirthdate("");
    setClassname("");
    setDocumentname("");
  }
  return (
    <div className="">
      <button className="w-8 h-8" onClick={toggleShow}>
        <img src="/static/build/icons/edit.png" alt="" />
      </button>
      <Modal open={openarchive} onClose={toggleShow}>
        <div className="m-2 p-5">
          <div className="text-right p-2 font-custom">
            يرجى تغيير معلومات الملف
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const updatedArchive = {
                first_name: firstname,
                last_name: lastname,
                birth_date: birthdate,
                birth_place: birthplace,
                class_name: classname,
                document_name: documentname,
              };
              editArchive(archive.id, updatedArchive);
              toggleShow();
              clearinputs();
            }}
            className="flex flex-col p-4 my-3"
          >
            <span className="p-3 font-custom">معلومات الشخص :</span>

            <div className="p-2 flex flex-row gap-3 my-2">
              <div className="relative my-2">
                <input
                  type="text"
                  className="bg-neutral-50 w-56 border-b py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer"
                  id={"firstname" + archive.id}
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={firstname}
                  onChange={(data) => setFirstname(data.target.value)}
                />
                <label
                  htmlFor={"firstname" + archive.id}
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  الإسم
                </label>
              </div>
              <div className="relative my-2">
                <input
                  type="text"
                  className="bg-neutral-50 w-56 border-b py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer"
                  id={"lastname" + archive.id}
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={lastname}
                  onChange={(data) => setLastname(data.target.value)}
                />
                <label
                  htmlFor={"lastname" + archive.id}
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  اللقب
                </label>
              </div>
            </div>

            <div className="p-2 flex gap-3 my-2">
              <DatePicker
                selected={birthdate}
                onChange={(date) =>
                  setBirthdate(moment(date).format("YYYY-MM-DD"))
                }
                locale={ar}
                dateFormat="yyyy/MM/dd"
                className="bg-neutral-50 w-56 border-b my-1 py-1 px-2 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors text-right placeholder-neutral-600 font-custom cursor-pointer"
                placeholderText="تاريخ الإزدياد"
                required
                showYearDropdown
                showMonthDropdown
                scrollableYearDropdown
                maxDate={new Date()}
              />
              <div className="relative my-2">
                <input
                  type="text"
                  className="bg-neutral-50 border-b w-56 py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer"
                  id={"birthplace" + archive.id}
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={birthplace}
                  onChange={(data) => setBirthplace(data.target.value)}
                />
                <label
                  htmlFor={"birthplace" + archive.id}
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  مكان الإزدياد
                </label>
              </div>
            </div>
            <span className="p-3 font-custom">مكان تواجد ملفه :</span>

            <div className="flex gap-3 p-2">
              <div className="relative my-2">
                <input
                  type="text"
                  className="bg-neutral-50 w-56 border-b py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer "
                  id={"classname" + archive.id}
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={classname}
                  onChange={(data) => setClassname(data.target.value)}
                />
                <label
                  htmlFor={"classname" + archive.id}
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  رقم الصنف
                </label>
              </div>
              <div className="relative my-2">
                <input
                  type="text"
                  className="bg-neutral-50 w-56 border-b py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer "
                  id={"documentname" + archive.id}
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={documentname}
                  onChange={(data) => setDocumentname(data.target.value)}
                />
                <label
                  htmlFor={"documentname" + archive.id}
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  رقم الوثيقة
                </label>
              </div>
            </div>
            <div className=" m-4 p-2 gap-4">
              <button className=" bg-blue-400 hover:bg-blue-500 py-2 px-5 rounded-lg font-custom">
                تعديل
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
