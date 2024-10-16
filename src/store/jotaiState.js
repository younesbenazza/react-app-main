import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { fetchLatestSchoolYearId } from './schoolYearApi'; // We'll create this next

// Define the schoolYearId atom
export const schoolYearIdAtom = atom(null);

// Custom hook for using the schoolYearId state with automatic initialization
export function useSchoolYearId() {
  const [schoolYearId, setSchoolYearId] = useAtom(schoolYearIdAtom);

  useEffect(() => {
    const initializeSchoolYearId = async () => {
      const latestId = await fetchLatestSchoolYearId();
      setSchoolYearId(latestId);
    };

    if (schoolYearId === null) {
      initializeSchoolYearId();
    }
  }, [schoolYearId, setSchoolYearId]);

  const updateSchoolYearId = (newId) => {
    setSchoolYearId(newId);
  };

  return {
    schoolYearId,
    updateSchoolYearId,
  };
}