import {
    Navigate
}
from "react-router-dom";

import {
    useAppSelector
}
from "../../redux/hooks/reduxHooks";

const ProtectedRoute = ({
    children
}) => {

    const {
        isAuthenticated
    } = useAppSelector(
        state=>state.auth
    );

    if(!isAuthenticated){

        return (
            <Navigate to="/login" />
        );
    }

    return children;
};

export default ProtectedRoute;