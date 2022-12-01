import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from "../redux/store";
import ProgressDropdown from '../components/ProgressDropdown'
import ModalContainer from './ModalContainer';
import { MediaInfoType } from '../interface/MediaInterface'
import ModalInput from './ModalInput';
import { ProgressStatus } from '../enums/ProgressStatus'
import ChevronDown from './ChevronDown'
import { validateInput } from '../services/inputValidation';
import { updateMediaItem, deleteMediaItem, addMediaItem } from "../services/MediaController"

interface GeneralModalInterface {
    modalType: string
    currentMediaType: String
    currentMedia: MediaInfoType
    fetchMedia: (type?: String) => Promise<void>
    fetchAllMedia: () => Promise<void>
    currentMediaID: String
    fetchMediaType: () => Promise<void>
    handleMediaItemOnClick: (id: String) => Promise<void>
    handleResetMedia: () => void
    toggleModal: () => void
}

const GeneralModal = ({ modalType, currentMediaType, currentMedia, fetchMedia, toggleModal, fetchAllMedia, currentMediaID, fetchMediaType, handleMediaItemOnClick, handleResetMedia }: GeneralModalInterface) => {
    const { email } = useSelector((store: RootState) => store.user)
    const [newMedia, setNewMedia] = useState({ title: modalType === "ADD" ? "" : currentMedia?.title, owner: modalType === "ADD" ? "" : currentMedia?.owner, type: modalType === "ADD" ? "" : currentMedia?.type, synopsis: modalType === "ADD" ? "" : currentMedia?.synopsis, statusType: modalType === "ADD" ? ProgressStatus.NONE : currentMedia?.statusType, progress: modalType === "ADD" ? 0 : currentMedia?.progress, total: modalType === "ADD" ? 0 : currentMedia?.total, photoURL: modalType === "ADD" ? "" : currentMedia?.photoURL, email })
    const [isProgressDropped, setIsProgressDropped] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(modalType === "ADD" ? " " : currentMedia?.statusType)

    function handleProgressChange(type: any) {
        setNewMedia({ ...newMedia, statusType: type })
    }

    function handleDropdown() {
        setIsProgressDropped(!isProgressDropped)
    }

    function handleMediaChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewMedia({ ...newMedia, [e.target.name]: e.target.value })
    }

    async function saveUpdatedMedia() {
        const valid = validateInput(newMedia)
        if (!valid)
            return
        await updateMediaItem(currentMediaID, newMedia)
        fetchMediaType()
        currentMediaType === "All" ? fetchAllMedia() : fetchMedia();
        handleMediaItemOnClick(currentMediaID)
        toggleModal();
    }

    async function handleDeleteMedia() {
        await deleteMediaItem(currentMediaID)
        currentMediaType === "All" ? fetchAllMedia() : fetchMedia();
        handleResetMedia()
        toggleModal()
    }

    async function saveNewMedia() {
        const valid = validateInput(newMedia)
        if (!valid)
            return
        await addMediaItem(newMedia)
        fetchMediaType()
        currentMediaType === "All" ? fetchAllMedia() : fetchMedia();
        toggleModal();
    }

    return (
        <ModalContainer>
            <h1 className="mb-6 font-bold text-2xl">{modalType} MEDIA</h1>
            <div className="flex flex-col items-start px-5">
                <ModalInput newMedia={newMedia} handleMediaChange={handleMediaChange} inputType="title" inputValueType="text" />
                <ModalInput newMedia={newMedia} handleMediaChange={handleMediaChange} inputType="owner" inputValueType="text" />
                <ModalInput newMedia={newMedia} handleMediaChange={handleMediaChange} inputType="photoURL" inputValueType="text" />
                <ModalInput newMedia={newMedia} handleMediaChange={handleMediaChange} inputType="type" inputValueType="text" />
                <ModalInput newMedia={newMedia} handleMediaChange={handleMediaChange} inputType="synopsis" inputValueType="text" />
                <div className="relative mb-2 w-full flex items-center">
                    <label htmlFor="statusType" className="mr-2">Status Type: </label>
                    <div className="flex grow justify-center border border-black p-1" onClick={handleDropdown}>
                        <button className="center">{selectedStatus === ' ' ? <ChevronDown /> : selectedStatus}</button>
                    </div>
                    {isProgressDropped && <ProgressDropdown setSelectedStatus={setSelectedStatus} handleDropdown={handleDropdown} handleProgressChange={handleProgressChange} />}
                </div>
                <ModalInput newMedia={newMedia} handleMediaChange={handleMediaChange} inputType="progress" inputValueType="number" />
                <ModalInput newMedia={newMedia} handleMediaChange={handleMediaChange} inputType="total" inputValueType="number" />
            </div>
            <div className='mt-8'>
                <button className="text-green-600 border border-green-600 hover:bg-green-200 p-2 mr-5" onClick={modalType === "EDIT" ? saveUpdatedMedia : saveNewMedia}>SAVE</button>
                {modalType === "EDIT" && <button className="text-gray-600 border border-gray-600 hover:bg-gray-200 p-2 mr-5" onClick={handleDeleteMedia}>DELETE</button>}
                <button className="text-red-600 border border-red-600 hover:bg-red-200 p-2" onClick={() => toggleModal()}>EXIT</button>
            </div>
        </ModalContainer >
    )
}

export default GeneralModal
