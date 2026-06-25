import {
    ShieldCheck
}
from "lucide-react";

import API
from "../../api/axios";

const UsersTable = ({
    users,
    refreshUsers
}) => {

    const makeUserAdmin =
    async(userId)=>{

        try{

            await API.post(
                "/makeadmin",
                { userId }
            );

            alert(
                "User promoted to admin"
            );

            refreshUsers();

        }catch(error){

            console.log(error);
        }
    };

    return (

        <div className="
            overflow-x-auto
            bg-white
            rounded-xl
            shadow-md
        ">

            <table className="
                w-full
            ">

                <thead className="
                    bg-black
                    text-white
                ">

                    <tr>

                        <th className="p-4">
                            Username
                        </th>

                        <th className="p-4">
                            Email
                        </th>

                        <th className="p-4">
                            Role
                        </th>

                        <th className="p-4">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        users.map((user)=>(

                            <tr
                                key={user._id}
                                className="
                                    border-b
                                "
                            >

                                <td className="
                                    p-4
                                ">
                                    {
                                        user.username
                                    }
                                </td>

                                <td className="
                                    p-4
                                ">
                                    {
                                        user.email
                                    }
                                </td>

                                <td className="
                                    p-4
                                ">
                                    {
                                        user.role
                                    }
                                </td>

                                <td className="
                                    p-4
                                ">

                                    {
                                        user.role
                                        !== "admin"
                                        &&
                                        <button

                                            onClick={()=>{

                                                makeUserAdmin(
                                                    user._id
                                                );
                                            }}

                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                bg-black
                                                text-white
                                                px-4
                                                py-2
                                                rounded-lg
                                            "
                                        >

                                            <ShieldCheck
                                                size={18}
                                            />

                                            Make Admin

                                        </button>
                                    }

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
};

export default UsersTable;