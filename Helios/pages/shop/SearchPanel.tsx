const SearchPanel = () => {
  return (
    <div
      className="flex flex-col p-4 pl-6 gap-2 h-[154px]
       bg-white border-t-2 border-gray-200"
    >
      <div className="text-sm">
        First-level Menu / <b>Current Page</b>
      </div>
      <div className="text-lg">
        <b>Search Items</b>
      </div>
      <SearchBar />
    </div>
  );
};

function SearchBar() {
  return (
    <div className="flex flex-row px-48">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search store"
          className="w-full h-[40px] px-3 py-2 leading-tight text-gray-700 bg-white border appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="flex h-[40px] justify-center items-center px-4 py-2 text-white bg-blue-500 border-blue-500  hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        <svg
          className="w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Search
      </button>
    </div>
  );
}

export default SearchPanel;
