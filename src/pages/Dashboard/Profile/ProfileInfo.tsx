import { useEffect, useState } from "react"
import { StatusNumbers } from "../../../interface/MediaInterface"
import axios from 'axios'
import { MediaItemType } from '../../../interface/MediaInterface'
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

interface ProfileInfoPropsInterface {
    mediaList: MediaItemType[]
}

function ProfileInfo({ mediaList }: ProfileInfoPropsInterface) {
    const [statusNumbers, setStatusNumbers] = useState<StatusNumbers>()

    const { displayName, email, profileImage } = useSelector((store: RootState) => store.user)

    async function fetchStatusInfo(userEmail?: String) {
        const response = await axios.get(`http://localhost:5000/v1/media/status/?email=${userEmail}`)
        const responseStatusNumbers = response.data
        setStatusNumbers(responseStatusNumbers)
    }

    useEffect(() => {
        fetchStatusInfo(email)
    }, [mediaList])

    return (
        <div className="w-full flex flex-col items-center px-5 py-5 profile-info border-b">
            <img src={profileImage} referrerPolicy="no-referrer" alt="ProfPic" className="w-32 h-32"></img>
            <h3 className="mt-5 font-bold open-sans-bold">{displayName}</h3>
            <p className="open-sans text-xs">{email}</p>
            <div className="flex mt-2.5 mb-1">
                <div className="flex flex-col items-center w-20">
                    <p className="font-bold open-sans text-sm">{statusNumbers?.completed}</p>
                    <p className="xxs open-sans">Completed</p>
                </div>
                <div className="flex flex-col items-center w-20">
                    <p className="font-bold open-sans text-sm">{statusNumbers?.inProgress}</p>
                    <p className="xxs open-sans">In Progress</p>
                </div>
            </div>
            <div className="flex flex-col items-center w-20">
                <p className="font-bold open-sans text-sm">{statusNumbers?.total}</p>
                <p className="xxs open-sans">Total Media</p>
            </div>
        </div>
    )
}

export default ProfileInfo
