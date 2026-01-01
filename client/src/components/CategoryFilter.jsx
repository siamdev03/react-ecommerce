import React from "react";

const CategoryFilter = ({ categories, selected, onChange }) => {
  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      <button
        onClick={() => onChange("")}
        className={`px-4 py-2 rounded ${
          selected === "" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded ${
            selected === cat ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
