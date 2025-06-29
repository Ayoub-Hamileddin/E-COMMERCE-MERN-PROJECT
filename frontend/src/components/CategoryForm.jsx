import React from "react";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  handleDelete,
  buttonText = "submit",
}) => {
  return (
    <div className="p3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="py-2 px-4 border rounded-lg w-full "
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-between">
          <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
            {buttonText}
          </button>
          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-500 px-4 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:red-pink-500 focus:ring-opacity-50 "
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
