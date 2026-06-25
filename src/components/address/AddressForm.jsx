import {
    useState
}
from "react";

const AddressForm = ({
    onSubmit,
    initialData
}) => {

    const [formData,setFormData] =
    useState({

        fullName:
        initialData?.fullName || "",

        mobile:
        initialData?.mobile || "",

        addressLine:
        initialData?.addressLine || "",

        city:
        initialData?.city || "",

        state:
        initialData?.state || "",

        pincode:
        initialData?.pincode || ""
    });

    const handleChange =
    (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value
        });
    };

    const handleSubmit =
    (e)=>{

        e.preventDefault();

        onSubmit(formData);
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="
                bg-white
                p-6
                rounded-xl
                shadow-md
            "
        >

            <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    mb-4
                "
            />

            <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    mb-4
                "
            />

            <textarea
                name="addressLine"
                placeholder="Address"
                value={formData.addressLine}
                onChange={handleChange}
                className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    mb-4
                "
            />

            <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    mb-4
                "
            />

            <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    mb-4
                "
            />

            <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    mb-4
                "
            />

            <button
                className="
                    w-full
                    bg-black
                    text-white
                    py-3
                    rounded-lg
                "
            >
                Save Address
            </button>

        </form>
    );
};

export default AddressForm;