type TypeDropDownProps = {
    mediaTypes: String[]
    setCurrentMediaType: React.Dispatch<React.SetStateAction<String>>
    fetchMedia: (type?: String) => Promise<void>
    handleDrop: () => void
    fetchAllMedia: () => Promise<void>
}

function TypeDropDown({ fetchAllMedia, mediaTypes, setCurrentMediaType, fetchMedia, handleDrop }: TypeDropDownProps) {

    function handleTypeDropDownClick(type: String) {
        setCurrentMediaType(type)
        fetchMedia(type)
        handleDrop()
    }

    function handleAllTypeDropDownClick() {
        setCurrentMediaType('All')
        fetchAllMedia()
        handleDrop()
    }

    return (
        <div className="flex flex-col absolute bg-white top-20 w-full items-center border-b">
            <button className="w-full py-2 border-y hover:bg-slate-200" onClick={handleAllTypeDropDownClick}>All</button>
            {mediaTypes.map((type) => {
                return (
                    <button className="w-full py-2 border-y hover:bg-slate-200" onClick={() => handleTypeDropDownClick(type)}>{type}</button>
                )
            })}
        </div>
    )
}

export default TypeDropDown
