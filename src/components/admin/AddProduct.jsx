import {
    useState
}
from "react";

import API
from "../../api/axios";

const AddProduct = () => {

    const [title,setTitle] =
    useState("");

    const [price,setPrice] =
    useState("");

    const [description,
        setDescription] =
    useState("");

    const [images,setImages] =
    useState([]);

    const handleSubmit =
    async(e)=>{

        e.preventDefault();

        const formData =
        new FormData();

        formData.append(
            "title",
            title
        );

        formData.append(
            "price",
            price
        );

        formData.append(
            "description",
            description
        );

        for(let i=0;
            i<images.length;
            i++
        ){

            formData.append(
                "images",
                images[i]
            );
        }

        await API.post(
            "/addproduct",
            formData,
            {
                headers:{
                    "Content-Type":
                    "multipart/form-data"
                }
            }
        );

        alert("Product Added");
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="
                bg-white
                p-6
                rounded-xl
                shadow-lg
            "
        >

            <h2 className="
                text-2xl
                font-bold
                mb-5
            ">
                Add Product
            </h2>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e)=>
                    setTitle(
                        e.target.value
                    )
                }
                className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    mb-4
                "
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e)=>
                    setPrice(
                        e.target.value
                    )
                }
                className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    mb-4
                "
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e)=>
                    setDescription(
                        e.target.value
                    )
                }
                className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    mb-4
                "
            />

            <input
                type="file"
                multiple
                onChange={(e)=>
                    setImages(
                        e.target.files
                    )
                }
                className="
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
                Add Product
            </button>

        </form>
    );
};

export default AddProduct;