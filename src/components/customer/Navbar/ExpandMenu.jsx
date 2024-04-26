import { useState } from 'react'

export default function ExpandMenu({ labelName, children }) {
  const [isExpanded, setIsExpanded] = useState(false);


  return (
    <div className="w-full px-2 py-2 bg-gray-50 hover:bg-gray-100 hover:text-black rounded-lg">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
      >
        <p className="text-sm md:text-base ">{labelName}</p>
        <i className={`fa-solid text-sm md:text-base ${isExpanded ? "fa-minus" : "fa-plus"}`}></i>
      </div>
      <div
        className={`mt-2 flex flex-col space-y-1 ${isExpanded ? "" : "hidden"}`}
      >
        {children}
      </div>
    </div>
  );
}
