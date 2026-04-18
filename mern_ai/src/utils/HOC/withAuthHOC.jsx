import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const WithAuthHOC = (WrappedComponent) => {
    return function AuthenticatedComponent(props) {
        const { setLogin } = useContext(AuthContext);
        const navigate = useNavigate();

        useEffect(() => {
            const isLogin = localStorage.getItem("isLogin");

            if (!isLogin) {
                setLogin(false);
                navigate("/");
                return;
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default WithAuthHOC;