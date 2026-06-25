// src/pages/auth/Register.jsx

import {
    useState
}
from "react";

import {
    Link,
    useNavigate
}
from "react-router-dom";

import axios from "axios";

const Register = () => {

    const navigate =
    useNavigate();

    const [formData,setFormData] =
    useState({
        username:"",
        email:"",
        phoneNumber:"",
        password:"",
        dateOfBirth:"",
        gender:"",
        bio:"",
        referralCode:"",
        profileImage:null
    });

    const [loading,setLoading] =
    useState(false);

    const handleChange = (e) => {

        const {
            name,
            value,
            files
        } = e.target;

        setFormData({
            ...formData,
            [name]:
            files
            ?
            files[0]
            :
            value
        });
    };

    const handleSubmit =
    async(e)=>{

        e.preventDefault();

        try{

            setLoading(true);

            const data =
            new FormData();

            Object.keys(formData)
            .forEach((key)=>{
                data.append(
                    key,
                    formData[key]
                );
            });

            await axios.post(
                "http://localhost:8000/api/v1/users/register",
                data,
                {
                    headers:{
                        "Content-Type":
                        "multipart/form-data"
                    }
                }
            );

            navigate("/login");

        }catch(error){

            console.log(error);

        }finally{

            setLoading(false);
        }
    };

    return (

        <div className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gradient-to-br
            from-blue-100
            via-white
            to-blue-200
            px-4
            py-10
        ">

            <div className="
                w-full
                max-w-5xl
                bg-white
                rounded-3xl
                shadow-2xl
                overflow-hidden
                grid
                md:grid-cols-2
            ">

                {/* LEFT */}

                <div className="
                    hidden
                    md:flex
                    flex-col
                    justify-center
                    bg-blue-600
                    text-white
                    p-10
                ">

                    <h1 className="
                        text-5xl
                        font-bold
                        mb-6
                    ">
                        ShopHub
                    </h1>

                    <p className="
                        text-lg
                        leading-relaxed
                    ">
                        Create your account
                        and explore the best
                        shopping experience with
                        amazing deals and offers.
                    </p>

                </div>

                {/* RIGHT */}

                <div className="
                    p-8
                    md:p-10
                ">

                    <h2 className="
                        text-3xl
                        font-bold
                        mb-2
                    ">
                        Create Account
                    </h2>

                    <p className="
                        text-gray-500
                        mb-8
                    ">
                        Register to continue
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="
                            flex
                            flex-col
                            gap-5
                        "
                    >

                        {/* USERNAME */}

                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="
                                border
                                rounded-xl
                                px-4
                                py-3
                                outline-none
                                focus:border-blue-500
                            "
                        />

                        {/* EMAIL */}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="
                                border
                                rounded-xl
                                px-4
                                py-3
                                outline-none
                                focus:border-blue-500
                            "
                        />

                        {/* PHONE */}

                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="
                                border
                                rounded-xl
                                px-4
                                py-3
                                outline-none
                                focus:border-blue-500
                            "
                        />

                        {/* PASSWORD */}

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="
                                border
                                rounded-xl
                                px-4
                                py-3
                                outline-none
                                focus:border-blue-500
                            "
                        />

                        {/* DOB */}

                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="
                                border
                                rounded-xl
                                px-4
                                py-3
                                outline-none
                                focus:border-blue-500
                            "
                        />

                        {/* GENDER */}

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="
                                border
                                rounded-xl
                                px-4
                                py-3
                                outline-none
                                focus:border-blue-500
                                cursor-pointer
                            "
                        >

                            <option value="">
                                Select Gender
                            </option>

                            <option value="male">
                                Male
                            </option>

                            <option value="female">
                                Female
                            </option>

                        </select>

                        {/* BIO */}

                        <textarea
                            name="bio"
                            placeholder="Bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="
                                border
                                rounded-xl
                                px-4
                                py-3
                                outline-none
                                focus:border-blue-500
                                resize-none
                                h-24
                            "
                        />

                        {/* REFERRAL */}

                        <input
                            type="text"
                            name="referralCode"
                            placeholder="Referral Code"
                            value={formData.referralCode}
                            onChange={handleChange}
                            className="
                                border
                                rounded-xl
                                px-4
                                py-3
                                outline-none
                                focus:border-blue-500
                            "
                        />

                        {/* PROFILE IMAGE */}

                        <input
                            type="file"
                            name="profileImage"
                            onChange={handleChange}
                            className="
                                border
                                rounded-xl
                                px-4
                                py-3
                                cursor-pointer
                            "
                        />

                        {/* BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                transition
                                text-white
                                py-3
                                rounded-xl
                                font-semibold
                                cursor-pointer
                            "
                        >

                            {
                                loading
                                ?
                                "Creating Account..."
                                :
                                "Register"
                            }

                        </button>

                    </form>

                    {/* LOGIN */}

                    <p className="
                        mt-6
                        text-center
                        text-gray-600
                    ">

                        Already have an account?

                        <Link
                            to="/login"
                            className="
                                text-blue-600
                                font-semibold
                                ml-2
                                hover:underline
                                cursor-pointer
                            "
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Register;