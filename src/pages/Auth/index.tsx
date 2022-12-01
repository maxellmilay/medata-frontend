import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FrontendRoute } from "../../enums/Routes";
import { login } from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface AuthPropsInterface {
    isLoggedIn: boolean
    handleLogin(): Promise<void>
}

function Auth({ handleLogin, isLoggedIn }: AuthPropsInterface) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate(FrontendRoute.DASHBOARD)
        }
    }, [isLoggedIn])



    return (
        <div className="h-screen w-screen grid place-items-center login-container">
            <div className="flex items-center flex-col ">
                <p className="mb-2 text-3xl">MEDATA</p>
                <p className="mb-16 italic">store media progress</p>
                <button onClick={handleLogin} className="border border-black p-6 flex hover:bg-slate-200">LOGIN WITH GOOGLE</button>
            </div>
        </div>
    )
}

export default Auth;
