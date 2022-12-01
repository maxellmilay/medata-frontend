import Settings from "./components/Settings"

interface MediaFilterPropsInterface {
    toggleSettingsModal: () => void
}

function MediaFilter({ toggleSettingsModal }: MediaFilterPropsInterface) {
    return (
        <div className="w-full flex items-center media-filter px-5 border-b">
            <div className="flex mx-auto">
                <h2 className="text-md open-sans-bold">Store Media Progress </h2>
            </div>
            <div className="flex ml-6">
                <button onClick={toggleSettingsModal} className="hover:text-blue-400">
                    <Settings />
                </button>
            </div>
        </div>
    )
}

export default MediaFilter
