const AuthLayout = ({
    children
}) => {

    return (

        <div className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gradient-to-r
            from-black
            to-gray-800
        ">

            <div className="
                bg-white
                dark:bg-gray-800
                w-full
                max-w-md
                p-8
                rounded-2xl
                shadow-2xl
            ">

                {children}

            </div>

        </div>
    );
};

export default AuthLayout;