import ModalContainer from "../../../../components/ModalContainer"

interface SettingsModalPropsInterface {
    toggleModal: () => void
}

const SettingsModal = ({ toggleModal }: SettingsModalPropsInterface) => {
    return (
        <ModalContainer>
            <p> App Version: 1.0 </p>
            <p className="mt-3"> © 2022 Medata </p>
            <button className="text-red-600 border border-red-600 hover:bg-red-200 p-2 mt-5" onClick={() => toggleModal()}>EXIT</button>
        </ModalContainer>
    )
}

export default SettingsModal
