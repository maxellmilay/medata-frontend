import Logout from "./components/Logout"
import { logout } from "../../../services/auth"
import { useNavigate } from "react-router-dom"
import { FrontendRoute } from "../../../enums/Routes"

interface MiscPropsInterface {
    handleLogoutState: () => void
}

function Misc({ handleLogoutState }: MiscPropsInterface) {
    const navigate = useNavigate()
    function handleLogoutButtonClick() {
        logout()
        handleLogoutState()
        navigate(FrontendRoute.LOGIN)
    }

    return (
        <div className="flex px-5 py-6 justify-center friend-list border-t">
            <button className="flex items-center hover:text-red-400" onClick={handleLogoutButtonClick} >
                <Logout />
                <p>Logout</p>
            </button>
        </div>
    )
}

export default Misc
