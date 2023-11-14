import React, { useState } from 'react';
import Cookies from 'js-cookie';

import { PatientDataProps, SearchBarProps } from '../utils/component';
import { usePatient } from '../store/apiPatient';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { getPatient } = usePatient();
  const token: any = Cookies.get('token');

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async () => {
    if (inputValue.trim() !== '') {
      try {
        const patientData = await getPatient(1, 5, token);
        if (Array.isArray(patientData)) {
          const filteredPatients = patientData
            .filter((patient: PatientDataProps) =>
              patient.name.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((patient: PatientDataProps) => patient.name);

          onSearch(filteredPatients);
        } else {
          console.error('No patient data found.');
        }
      } catch (error) {
        console.error('Error searching for patients:', error);
      }
    }
  };

  return (
    <div className="mb-3">
      <div className="relative mb-4 flex w-full flex-wrap items-end justify-end">
        <input
          className="border-2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          type="text"
          placeholder="Search by Patient Name"
          value={inputValue}
          onChange={handleInputChange}
        />

        <button
          className="relative z-[2] flex items-center bg-health-blue-medium px-6 py-2.5 text-xs ml-2 font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active-bg-primary-800 active:shadow-lg"
          type="button"
          id="button-addon1"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={handleSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
