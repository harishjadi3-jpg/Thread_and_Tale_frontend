import {
    Trash2,
    Pencil
}
from "lucide-react";

const AddressCard = ({

    address,

    onDelete,

    onEdit,

    onSetDefault

}) => {

    return (

        <div className="
            bg-white
            p-5
            rounded-xl
            shadow-md
            mb-5
        ">

            <div className="
                flex
                justify-between
                items-start
            ">

                <div>

                    <h2 className="
                        text-xl
                        font-bold
                    ">
                        {address.fullName}
                    </h2>

                    <p className="
                        mt-2
                        text-gray-500
                    ">
                        {address.addressLine}
                    </p>

                    <p>
                        {address.city},
                        {" "}
                        {address.state}
                    </p>

                    <p>
                        {address.pincode}
                    </p>

                    <p>
                        {address.mobile}
                    </p>

                    {
                        address.isDefault
                        &&
                        <span className="
                            inline-block
                            mt-3
                            bg-black
                            text-white
                            text-sm
                            px-3
                            py-1
                            rounded-full
                        ">
                            Default
                        </span>
                    }

                </div>

                <div className="
                    flex
                    gap-3
                ">

                    <button
                        onClick={()=>
                            onEdit(address)
                        }
                    >
                        <Pencil />
                    </button>

                    <button
                        onClick={()=>
                            onDelete(address._id)
                        }
                    >
                        <Trash2 />
                    </button>

                </div>

            </div>

            {
                !address.isDefault
                &&
                <button

                    onClick={()=>
                        onSetDefault(
                            address._id
                        )
                    }

                    className="
                        mt-5
                        border
                        px-4
                        py-2
                        rounded-lg
                    "
                >
                    Set As Default
                </button>
            }

        </div>
    );
};

export default AddressCard;