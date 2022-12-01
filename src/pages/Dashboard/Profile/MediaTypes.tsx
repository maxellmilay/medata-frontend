import axios from "axios"
import React, { useEffect, useState } from "react"

type MediaTypeProps = {
    fetchMediaType: () => Promise<void>
    mediaTypes: String[]
    setCurrentMediaType: React.Dispatch<React.SetStateAction<String>>
    fetchMedia(type?: String): Promise<void>
}

function MediaTypes({ mediaTypes, fetchMediaType, setCurrentMediaType, fetchMedia }: MediaTypeProps) {
    useEffect(() => {
        fetchMediaType()
    }, [])

    function handleChangeMediaType(type: String) {
        setCurrentMediaType(type)
        fetchMedia(type)
    }

    return (
        <div className="w-full px-10 py-3.5 media-types border-b">
            <h3 className="mb-1 font-bold open-sans">
                TYPES
            </h3>
            <div className="flex flex-col items-start first-letter:overflow-auto scrollbar w-full media-type-list">
                {mediaTypes.map((type: String) => {
                    return <button key={type as React.Key} className="mt-1 text-xs open-sans w-full hover:bg-gray-100" onClick={() => handleChangeMediaType(type)}>{type}</button>
                })}
            </div>
        </div>
    )
}
export default MediaTypes
