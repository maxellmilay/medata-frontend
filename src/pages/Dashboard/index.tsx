import Profile from "./Profile"
import MediaList from "./MediaList"
import MediaInfo from "./MediaInfo"
import MediaFilter from "./MediaFilter"
import { useEffect, useState } from "react"
import { MediaInfoType, MediaItemType } from "../../interface/MediaInterface"
import GeneralModal from '../../components/GeneralModal'
import SettingsModal from "./MediaFilter/components/SettingsModal"
import { fetchMediaTypes, fetchMediaItems, fetchAllMediaData, fetchSingleMediaItem } from '../../services/MediaController'

interface DashboardPropsInterface {
    handleLogoutState: () => void
    email: string
}

function Dashboard({ handleLogoutState, email }: DashboardPropsInterface) {
    const [addModalOn, setAddModalOn] = useState(false)
    const [editModalOn, setEditModalOn] = useState(false)
    const [settingsModalOn, setSettingsModalOn] = useState(false)
    const [mediaList, setMediaList] = useState<MediaItemType[]>([] as MediaItemType[])
    const [currentMedia, setCurrentMedia] = useState<MediaInfoType>({ title: '', owner: '', type: '', synopsis: '', email: '' } as MediaInfoType)
    const [mediaTypes, setMediaTypes] = useState<String[]>([] as String[])
    const [currentMediaType, setCurrentMediaType] = useState<String>('All')
    const [isDropped, setIsDropped] = useState<Boolean>(false)
    const [currentMediaID, setCurrentMediaID] = useState<String>('')

    async function fetchMediaType() {
        const response = await fetchMediaTypes(email)
        setMediaTypes(response)
    }

    async function fetchMedia(type?: String) {
        const queryType = type || currentMediaType
        const response = await fetchMediaItems(queryType, email)
        setMediaList(response as MediaItemType[])

    }

    async function fetchAllMedia() {
        const response = await fetchAllMediaData(email)
        setMediaList(response as MediaItemType[])
    }

    async function handleMediaItemOnClick(id: String) {
        const currentLocalMedia = await fetchSingleMediaItem(id)
        if (currentLocalMedia === undefined)
            return
        setCurrentMedia(currentLocalMedia as MediaInfoType)
        setCurrentMediaID(id)
    }

    function toggleAddModal() {
        setAddModalOn(!addModalOn)
    }

    function toggleEditModal() {
        setEditModalOn(!editModalOn)
    }

    function toggleSettingsModal() {
        setSettingsModalOn(!settingsModalOn)
    }

    function handleResetMedia() {
        setCurrentMedia({ title: '', owner: '', type: '', synopsis: '' } as MediaInfoType)
    }

    useEffect(() => {
        fetchAllMedia()
    }, [])

    return (
        <div className="h-full flex relative">
            <Profile handleLogoutState={handleLogoutState} mediaList={mediaList} fetchMedia={fetchMedia} setCurrentMediaType={setCurrentMediaType} mediaTypes={mediaTypes} fetchMediaType={fetchMediaType} />
            <div className="h-full grow flex flex-col">
                <MediaFilter toggleSettingsModal={toggleSettingsModal} />
                <div className="flex w-full">
                    <MediaList handleMediaItemOnClick={handleMediaItemOnClick} setCurrentMediaID={setCurrentMediaID} currentMedia={currentMedia} toggleEditModal={toggleEditModal} fetchMediaType={fetchMediaType} fetchAllMedia={fetchAllMedia} isDropped={isDropped} setIsDropped={setIsDropped} currentMediaType={currentMediaType} setCurrentMediaType={setCurrentMediaType} mediaTypes={mediaTypes} toggleAddModal={toggleAddModal} fetchMedia={fetchMedia} mediaList={mediaList} setCurrentMedia={setCurrentMedia} />
                    {currentMedia?.title !== '' && <MediaInfo currentMediaID={currentMediaID} handleMediaItemOnClick={handleMediaItemOnClick} currentMedia={currentMedia} />}
                </div>
                <div className="w-full grow" />
            </div>
            {addModalOn && <GeneralModal modalType="ADD" currentMediaType={currentMediaType} currentMedia={currentMedia} fetchMedia={fetchMedia} fetchAllMedia={fetchAllMedia} currentMediaID={currentMediaID} fetchMediaType={fetchMediaType} handleMediaItemOnClick={handleMediaItemOnClick} handleResetMedia={handleResetMedia} toggleModal={toggleAddModal} />}
            {editModalOn && <GeneralModal modalType="EDIT" currentMediaType={currentMediaType} currentMedia={currentMedia} fetchMedia={fetchMedia} fetchAllMedia={fetchAllMedia} currentMediaID={currentMediaID} fetchMediaType={fetchMediaType} handleMediaItemOnClick={handleMediaItemOnClick} handleResetMedia={handleResetMedia} toggleModal={toggleEditModal} />}
            {settingsModalOn && <SettingsModal toggleModal={toggleSettingsModal} />}
        </div>
    )
}

export default Dashboard
