const Pagination = ({
    page,
    totalPages,
    setPage
}) => {

    return (

        <div className="
            flex
            justify-center
            gap-3
            mt-10
        ">

            {
                [...Array(totalPages)]
                .map((_,index)=>(

                    <button

                        key={index}

                        onClick={()=>
                            setPage(index+1)
                        }

                        className={`
                            px-4
                            py-2
                            rounded-lg
                            ${
                                page===index+1
                                ?
                                "bg-black text-white"
                                :
                                "bg-white border"
                            }
                        `}
                    >
                        {index+1}
                    </button>
                ))
            }

        </div>
    );
};

export default Pagination;