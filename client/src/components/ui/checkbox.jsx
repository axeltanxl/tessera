import React, { useState, useEffect } from 'react';

const Checkbox = ({handleSelect, ticket}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // console.log(isChecked);
    handleSelect(ticket, isChecked)
  }, [isChecked])
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggleCheckbox}
        className="relative peer shrink-0
          appearance-none w-6 h-6 border border-[#B4C1DB] bg-white rounded-sm
          mt-1 mr-1 hover:cursor-pointer"
      />
      <svg
        className={`absolute w-4 h-4 mt-[-25px] ml-[3px] ${isChecked ? 'block' : 'hidden'}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </label>
  );
}

export default Checkbox;