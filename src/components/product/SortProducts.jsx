const SortProducts = ({
    sort,
    setSort
}) => {

    return (

        <select

            value={sort}

            onChange={(e)=>
                setSort(
                    e.target.value
                )
            }

            className="
                border
                p-3
                rounded-lg
            "
        >

            <option value="">
                Sort By
            </option>

            <option value="lowtohigh">
                Price Low To High
            </option>

            <option value="hightolow">
                Price High To Low
            </option>

        </select>
    );
};

export default SortProducts;