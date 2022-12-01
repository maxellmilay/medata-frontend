import { useEffect } from "react"
import { MediaItemType, MediaInfoType } from "../../../interface/MediaInterface"
import MediaItem from "./MediaItem"
import TypeTitle from "./TypeTitle"
import AddMediaButton from "./AddIMediaButton"

type MediaListProps = {
    fetchMedia: (type?: String) => Promise<void>
    mediaList: MediaItemType[]
    setCurrentMedia: React.Dispatch<React.SetStateAction<MediaInfoType>>
    mediaTypes: String[]
    currentMediaType: String
    setCurrentMediaType: React.Dispatch<React.SetStateAction<String>>
    isDropped: Boolean
    setIsDropped: React.Dispatch<React.SetStateAction<Boolean>>
    fetchAllMedia: () => Promise<void>
    fetchMediaType: () => Promise<void>
    toggleEditModal: () => void
    toggleAddModal: () => void
    currentMedia: MediaInfoType
    setCurrentMediaID: React.Dispatch<React.SetStateAction<String>>
    handleMediaItemOnClick: (id: String) => void
}

function MediaList({ handleMediaItemOnClick, setCurrentMediaID, currentMedia, toggleEditModal, fetchMediaType, fetchAllMedia, toggleAddModal, fetchMedia, mediaList, setCurrentMedia, mediaTypes, currentMediaType, setCurrentMediaType, isDropped, setIsDropped }: MediaListProps) {

    useEffect(() => {
        fetchMediaType()
        currentMediaType === "All" ? fetchAllMedia() : fetchMedia();
    }, [])

    return (
        <div className="flex flex-col w-2/5 max-w-4xl border-b border-r">
            <TypeTitle fetchAllMedia={fetchAllMedia} isDropped={isDropped} setIsDropped={setIsDropped} mediaTypes={mediaTypes} currentMediaType={currentMediaType} setCurrentMediaType={setCurrentMediaType} fetchMedia={fetchMedia} />
            <div className="flex flex-col media-list overflow-auto scrollbar">
                {mediaList.map((item: MediaItemType, index) => {
                    return <MediaItem key={index} handleMediaItemOnClick={handleMediaItemOnClick} setCurrentMediaID={setCurrentMediaID} currentMedia={currentMedia} toggleEditModal={toggleEditModal} fetchAllMedia={fetchAllMedia} currentMediaType={currentMediaType} fetchMedia={fetchMedia} mediaItem={item} setCurrentMedia={setCurrentMedia} />
                })}
            </div>
            <AddMediaButton toggleAddModal={toggleAddModal} />
        </div>
    )
}

export default MediaList
