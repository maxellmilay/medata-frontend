import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FrontendRoute } from '../../../enums/Routes'

const Redirect = () => {
    const navigate = useNavigate()

    function handleRedirect() {
        navigate(FrontendRoute.LOGIN)
    }

    useEffect(() => {
        handleRedirect()
    })

    return (
        <div>

        </div>
    )
}

export default Redirect
