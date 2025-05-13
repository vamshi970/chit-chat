import { FunnelSimple, MagnifyingGlass } from "phosphor-react";

const Search = () => {
  return (
    <div className="flex my-5 rounded-2xl py-2 gap-2 items-center px-3 bg-[#EAF2FE] text-[#709CE6]">
      <MagnifyingGlass size={20} />
      <input
        type="text"
        name="search"
        id="search"
        className="block flex-1 rounded-md border-0
          bg-transparent sm:text-sm placeholder:text-[#709CE6] sm:leading-6 focus:outline-none"
        placeholder="Search"
      />
      <FunnelSimple size={20} className="text-[#676667]" />
    </div>
  );
};

export default Search;
