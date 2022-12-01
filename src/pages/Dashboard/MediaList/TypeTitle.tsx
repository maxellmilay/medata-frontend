import TypeDropDown from "./TypeDropDown"
import ChevronDown from '../../../components/ChevronDown'

type TypeTitleProps = {
    mediaTypes: String[]
    currentMediaType: String
    setCurrentMediaType: React.Dispatch<React.SetStateAction<String>>
    fetchMedia: (type?: String) => Promise<void>
    isDropped: Boolean
    setIsDropped: React.Dispatch<React.SetStateAction<Boolean>>
    fetchAllMedia: () => Promise<void>
}

function TypeTitle({ fetchAllMedia, mediaTypes, currentMediaType, setCurrentMediaType, fetchMedia, isDropped, setIsDropped }: TypeTitleProps) {

    function handleDrop() {
        setIsDropped(!isDropped)
    }

    return (
        <div className="flex items-center font-bold h-20 border-b relative w-full">
            <button className="flex h-full items-center w-full pr-7 hover:bg-gray-200" onClick={handleDrop}>
                <h1 className="ml-10 mr-auto open-sans font-bold">{currentMediaType}</h1>
                <ChevronDown />
            </button>
            {isDropped && <TypeDropDown fetchAllMedia={fetchAllMedia} handleDrop={handleDrop} mediaTypes={mediaTypes} setCurrentMediaType={setCurrentMediaType} fetchMedia={fetchMedia} />}
        </div>

    )
}

export default TypeTitle
