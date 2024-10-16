import { useState } from "react";
import Modal from "./Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ar from "date-fns/locale/ar";
import moment from "moment";

export default function AddMember({ addMember, toggleShow, openmember }) {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [birthplace, setBirthplace] = useState("");
  const [classnum, setClassnum] = useState("");

  function clearinputs() {
    setLastname("");
    setFirstname("");
    setBirthplace("");
    setBirthdate("");
    setClassnum("");
  }
  return (
    <div className="">
      <button
        className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg font-custom mx-6 text-white shadow-md"
        onClick={toggleShow}
      >
        إضافة تلميذ
      </button>
      <Modal open={openmember} onClose={toggleShow}>
        <div className="m-2 p-5">
          <div className="text-right p-2 font-custom">
            يرجى إدخال معلومات التلميذ
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newMember = {
                first_name: firstname,
                last_name: lastname,
                birth_date: moment(birthdate).format("YYYY-MM-DD"),
                birth_place: birthplace,
                class_num: classnum,
              };
              addMember(newMember);
              toggleShow();
              clearinputs();
            }}
            className="flex flex-col p-4 my-3"
          >
            <div className="p-2 flex flex-row gap-3 my-2">
              <div className="relative my-2">
                <input
                  type="text"
                  className="bg-neutral-50 w-56 border-b py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer"
                  id="firstname"
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={firstname}
                  onChange={(data) => setFirstname(data.target.value)}
                />
                <label
                  htmlFor="firstname"
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  الإسم
                </label>
              </div>
              <div className="relative my-2">
                <input
                  type="text"
                  className="bg-neutral-50 w-56 border-b py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer"
                  id="lastname"
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={lastname}
                  onChange={(data) => setLastname(data.target.value)}
                />
                <label
                  htmlFor="lastname"
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  اللقب
                </label>
              </div>
            </div>

            <div className="p-2 flex gap-3 my-2">
              <DatePicker
                selected={birthdate}
                onChange={(date) => setBirthdate(date)}
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
                  id="birthplace"
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={birthplace}
                  onChange={(data) => setBirthplace(data.target.value)}
                />
                <label
                  htmlFor="birthplace"
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  مكان الإزدياد
                </label>
              </div>
            </div>
            <div className="flex gap-3 p-2">
              <div className="relative my-2">
                <input
                  type="text"
                  className="bg-neutral-50 w-56 border-b py-1 focus:outline-none focus:border-blue-600 focus:border-b-2 transition-colors  peer "
                  id="classname"
                  autoComplete="off"
                  placeholder=" "
                  required
                  value={classnum}
                  onChange={(data) => setClassnum(data.target.value)}
                />
                <label
                  htmlFor="classname"
                  className="absolute right-2 top-1 font-custom cursor-text peer-focus:text-xs peer-focus:-top-3  transition-all peer-focus:text-blue-500 text-neutral-600 custom-input"
                >
                  القسم
                </label>
              </div>
            </div>
            <div className=" m-4 p-2 gap-4">
              <button className=" bg-blue-400 hover:bg-blue-500 py-2 px-5 rounded-lg font-custom">
                أضف
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
