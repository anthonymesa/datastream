import { useEffect, useRef } from "react"
import LoginPage from "../../features/LoginPage/LoginPage"
import Datashed from "../../features/Datashed/Datashed"
import { LoggedInSelector, beginSession, logIn } from "./SessionManagerSlice"
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function SessionManager() {
    const userLoggedIn = useSelector(LoggedInSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if(Cookies.get('session')) {
            dispatch(beginSession({}))
        }
    }, [])

    return userLoggedIn ?
        (<Datashed />)
        : (<LoginPage />)
}