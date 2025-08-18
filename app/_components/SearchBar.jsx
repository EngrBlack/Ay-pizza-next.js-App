import { HiMagnifyingGlass } from "react-icons/hi2";

function SearchBar() {
  return (
    <form
      action=" "
      className="justify-self-end flex items-center gap-2 w-[85%] sm:w-[70%] md:w-[60%] lg:w-[40%]"
    >
      <input
        type="text"
        name="query"
        id="query"
        className="input rounded-full py-1.5 md:py-2 w-full"
        placeholder="Search"
      />
      <button>
        <HiMagnifyingGlass className="  text-xl sm:text-2xl stroke-2 " />
      </button>
    </form>
  );
}

export default SearchBar;
