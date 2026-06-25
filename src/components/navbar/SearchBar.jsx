import {
    Search
}
from "lucide-react";

const SearchBar = ({
    search,
    setSearch,
    handleSearch
}) => {

    return (

        <div className="
            w-full
            flex
            items-center
            bg-white
            rounded-md
            overflow-hidden
            shadow-sm
            border
            border-gray-200
        ">

            <input
                type="text"
                placeholder="
                    Search products...
                "
                value={search}
                onChange={(e)=>
                    setSearch(
                        e.target.value
                    )
                }
                className="
                    flex-1
                    px-5
                    py-3
                    outline-none
                    text-gray-700
                "
            />

            <button

                onClick={handleSearch}

                className="
                    px-5
                    text-blue-600
                    hover:bg-gray-100
                    h-full
                    transition
                "
            >

                <Search size={24}/>

            </button>

        </div>
    );
};

export default SearchBar;