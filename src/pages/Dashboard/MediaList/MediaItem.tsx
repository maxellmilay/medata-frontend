import { current } from "@reduxjs/toolkit"
import axios from "axios"
import { useState } from "react"
import { MediaInfoType, MediaItemType } from "../../../interface/MediaInterface"
import EditIcon from "./components/EditIcon"

type MediaItemProps = {
    mediaItem: MediaItemType
    currentMediaType: String
    setCurrentMedia: React.Dispatch<React.SetStateAction<MediaInfoType>>;
    fetchMedia: (type?: String) => Promise<void>
    fetchAllMedia: () => Promise<void>
    toggleEditModal: () => void
    currentMedia: MediaInfoType
    setCurrentMediaID: React.Dispatch<React.SetStateAction<String>>
    handleMediaItemOnClick: (id: String) => void
}

function MediaItem({ handleMediaItemOnClick, toggleEditModal, mediaItem, setCurrentMedia, fetchMedia, fetchAllMedia }: MediaItemProps) {

    async function handleEditMedia() {
        await handleMediaItemOnClick(mediaItem.id)
        toggleEditModal()
    }

    return (
        <div className="w-full flex px-5 py-5 items-center border bg-gray-100 hover:bg-gray-200" onClick={() => handleMediaItemOnClick(mediaItem.id)}>
            <button className="flex grow">
                <div className="flex flex-col items-start grow">
                    <p className="open-sans text-sm font-bold">{mediaItem.title}</p>
                    <p className="xxs open-sans">{mediaItem.owner}</p>
                </div>
            </button>
            <button className="hover:text-blue-400" onClick={handleEditMedia}><EditIcon /></button>
        </div>
    )
}

export default MediaItem
