import React, { useState, useEffect } from 'react';
import api from '../api.jsx';
import DeleteYear from "./DeleteYear";
function SchoolYearManager() {
  const [schoolYears, setSchoolYears] = useState([]);
  const [newYear, setNewYear] = useState([]);
  const getYears = () => {
    api
      .get("/schoolyears/")
      .then((res) => res.data)
      .then((data) => {
       // setSchoolYears(data);
       const fetchedYears = data;

      console.log("Fetched years:", fetchedYears);

      // Ensure that fetchedYears is an array
      if (Array.isArray(fetchedYears)) {
        setSchoolYears(fetchedYears);
      }
        
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getYears();
  }, []);
  const addSchoolYear = () => {
    if (newYear && !schoolYears.includes(newYear)) {
      api
      .post("/schoolyear/add/", {year:newYear})
      .then((res) => {
        
        return res.data;
      })
      .then((data) => {
        console.log(data)
        setSchoolYears([...schoolYears, data]);
        setNewYear('');
        
      })
      .catch((err) => alert());
      
    }
  };
  const deleteLoan = (id) => {
   
  };

  const deleteSchoolYear = (yearToDelete) => {
    api
    .delete(`/schoolyear/delete/${yearToDelete}/`)
    .then((res) => {
      
      setSchoolYears(schoolYears.filter(year => year.id !== yearToDelete));
    })
    .catch((error) => alert(error));
    
  };
  const schoolYearsReversed = schoolYears.slice().reverse()
  return (
    <div className=" p-4 mb-6">
      <div className="items-center flex justify-between">
      <h2 className="text-right font-semibold text-lg mb-3">السنوات الدراسية</h2>
      <div className="my-4 flex justify-end">
        <input
          type="text"
          value={newYear}
          onChange={(e) => setNewYear(e.target.value)}
          placeholder="أدخل السنة الدراسية الجديدة"
          className="border rounded-r-md p-2 text-right"
        />
        <button
          onClick={addSchoolYear}
          className="bg-green-500 text-white px-4 py-2 rounded-l-md hover:bg-green-600"
        >
          إضافة
        </button>
      </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto max-h-[400px] border">
        <table className="w-full text-right border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">السنة الدراسية</th>
              <th className="px-4 py-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody >
            {schoolYearsReversed.map((year, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{year.year}</td>
                <td className="px-4 py-2">
                
                  <DeleteYear
          deleteFunc={deleteSchoolYear}
          id={year.id}
          text={"تحذير: حذف السنة الدراسية سيؤدي إلى حذف جميع البيانات المتعلقة بها."}
        />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default SchoolYearManager;