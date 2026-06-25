const categories = [

    "All",
    "Men",
    "Women",
    "Electronics",
    "Shoes"
];

const CategoryFilter = ({
    selected,
    setSelected
}) => {

    return (

        <div className="
            flex
            gap-3
            flex-wrap
        ">

            {
                categories.map((category)=>(

                    <button

                        key={category}

                        onClick={()=>
                            setSelected(category)
                        }

                        className={`
                            px-4
                            py-2
                            rounded-lg
                            border
                            ${
                                selected===category
                                ?
                                "bg-black text-white"
                                :
                                "bg-white"
                            }
                        `}
                    >
                        {category}
                    </button>
                ))
            }

        </div>
    );
};

export default CategoryFilter;