import ProfileInfo from "./ProfileInfo"
import MediaTypes from "./MediaTypes"
import Misc from "./Misc"
import { MediaItemType } from "../../../interface/MediaInterface"

type ProfileProps = {
    fetchMediaType: () => Promise<void>
    mediaTypes: String[]
    setCurrentMediaType: React.Dispatch<React.SetStateAction<String>>
    fetchMedia(type?: String): Promise<void>
    mediaList: MediaItemType[]
    handleLogoutState: () => void
}

function Profile({ handleLogoutState, mediaList, mediaTypes, fetchMediaType, setCurrentMediaType, fetchMedia }: ProfileProps) {
    return (
        <div className="h-full relative flex flex-col profile border-r">
            <div className="w-full flex profile-header border-b">
                <h2 className="m-auto source-sans-pro text-xl tracking-widest text-black font-bold">MEDATA</h2>
            </div>
            <ProfileInfo mediaList={mediaList} />
            <MediaTypes fetchMedia={fetchMedia} setCurrentMediaType={setCurrentMediaType} mediaTypes={mediaTypes} fetchMediaType={fetchMediaType} />
            <div className="width-full grow" />
            <Misc handleLogoutState={handleLogoutState} />
        </div>
    )
}

export default Profile
