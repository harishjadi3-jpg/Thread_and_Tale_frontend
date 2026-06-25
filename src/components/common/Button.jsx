const Button = ({

    children,

    onClick,

    className,

    disabled

}) => {

    return (

        <button

            onClick={onClick}

            disabled={disabled}

            className={`
                px-5
                py-3
                rounded-lg
                bg-black
                text-white
                font-semibold
                hover:opacity-90
                transition
                disabled:opacity-50
                ${className}
            `}
        >

            {children}

        </button>
    );
};

export default Button;