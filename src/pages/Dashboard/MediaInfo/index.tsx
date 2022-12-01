import { MediaInfoType } from "../../../interface/MediaInterface"
import { useEffect } from 'react'

type MediaInfoProps = {
    currentMedia: MediaInfoType
    handleMediaItemOnClick: (id: String) => void
    currentMediaID: String
}

function MediaInfo({ handleMediaItemOnClick, currentMedia, currentMediaID }: MediaInfoProps) {

    useEffect(() => {
        handleMediaItemOnClick(currentMediaID)
    }, [])

    return (
        <div className="flex flex-col grow w-3/5 px-10 py-5 overflow-auto media-item border scrollbar">
            <div className="flex flex-col text-center items-center mb-3">
                <h1 className="mb-2 text-2xl font-bold">{currentMedia.title}</h1>
                <img src={currentMedia.photoURL} alt="Media" className="block media-pic mb-3" />
                <p className="mb-3 text-xs">{currentMedia.owner}</p>
                <div className="flex mb-3 px-5 py-3 bg-gray-100 rounded">
                    <div className="mr-4 px-1 py-1 bg-white border border-gray-400 rounded">
                        <p>{currentMedia.statusType}</p>
                    </div>
                    <div className="px-1 py-1 bg-white border border-gray-400 rounded">
                        <p>{currentMedia.progress}/{currentMedia.total}</p>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-justify">
                    {currentMedia.synopsis}
                </p>
            </div>
        </div >
    )
}

export default MediaInfo
