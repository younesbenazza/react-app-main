import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Logout from "../Logout.jsx";
import api from '../../api.jsx';

function AcademicYearDropdown() {
  const [years, setYears] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [academicYear, setAcademicYear] = useState(null); // Track the selected academic year
  const [error, setError] = useState(null); // Track errors
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Function to fetch academic years from the API
  const getYears = async () => {
    try {
      console.log("Fetching academic years from API...");
      const res = await api.get("/schoolyears/");
      const fetchedYears = res.data;

      console.log("Fetched years:", fetchedYears);

      // Ensure that fetchedYears is an array
      if (Array.isArray(fetchedYears)) {
        setYears(fetchedYears);

        // Find the current year
        const currentYear = fetchedYears.find(year => year.is_current);
        if (currentYear) {
          setAcademicYear(currentYear);
          console.log("Current academic year set to:", currentYear);
        } else if (fetchedYears.length > 0) {
          // If no current year is set, default to the first year in the list
          setAcademicYear(fetchedYears[0]);
          console.log("No current year found. Defaulting to:", fetchedYears[0]);
        }
      } else {
        throw new Error('Invalid data format received from the API.');
      }
    } catch (err) {
      console.error('Error fetching school years:', err);
      setError(err.message || 'Failed to fetch school years');
      alert(err.message || 'Failed to fetch school years');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update a school year to be current
  const updateSchoolYear = async (yearId, updatedData) => {
    try {
      console.log(`Updating school year with ID ${yearId}...`, updatedData);
      const res = await api.put(`/schoolyear/update/${yearId}/`, updatedData);
      if (res.status === 200) {
        console.log("School year updated successfully:", res.data.school_year);
        // After updating, refetch the list to ensure data consistency
        await getYears();
        window.location.reload()
      } else {
        throw new Error('Failed to update school year');
      }
    } catch (err) {
      console.error('Error updating school year:', err);
      setError(err.message || 'An error occurred while updating the school year');
      alert(err.message || 'An error occurred while updating the school year');
    }
  };

  // Fetch academic years on component mount
  useEffect(() => {
    getYears();
  }, []);

  // Handle the selection of a year
  const handleYearSelect = (year) => {
    if (year.is_current) {
      console.log("Selected year is already the current year:", year);
      setIsOpen(false); // No need to update if it's already current
      return;
    }

    const updatedData = { ...year, is_current: true }; // Mark as current
    updateSchoolYear(year.id, updatedData);
    setIsOpen(false); // Close the dropdown after selection
  };

  // Handle dropdown toggle with debug
  const toggleDropdown = () => {
    console.log(`Dropdown toggled. Was open: ${isOpen}`);
    setIsOpen(prev => !prev);
  };

  return (
    <div className="dropdown relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        السنة الدراسية: {academicYear?.year || 'اختر السنة الدراسية'}
        <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {isLoading ? (
              <div className="px-4 py-2 text-sm text-gray-700">جارٍ التحميل...</div>
            ) : years.length > 0 ? (
              years.map((year) => (
                <button
                  key={year.id}
                  onClick={() => handleYearSelect(year)}
                  className={`block w-full text-right px-4 py-2 text-sm ${
                    year.is_current
                      ? 'bg-indigo-100 text-indigo-700 cursor-default' // Changed from cursor-not-allowed
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  role="menuitem"
                  // Removed the disabled attribute
                >
                  {year.year || 'سنة غير معروفة'}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-700">لا توجد سنوات دراسية متاحة</div>
            )}
          </div>
        </div>
      )}
      
      {/* Display error message below the dropdown if any */}
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <div className="font-custom p-3 flex justify-between items-center bg-white shadow-sm z-50">
      <h1 className="text-xl font-semibold text-gray-800">لوحة التحكم</h1>
      <div className="flex items-center space-x-4">
        <AcademicYearDropdown />
        <p className='mx-2'></p>
        <Logout />
      </div>
    </div>
  );
}

export default Header;