interface AddMediaButtonPropsInterface {
    toggleAddModal: () => void
}

function AddMediaButton({ toggleAddModal }: AddMediaButtonPropsInterface) {
    return (
        <div className="flex add-item-button justify-center items-center border-t">
            <button className="px-7 py-2 rounded-md border hover:bg-slate-100 cursor-pointer" onClick={toggleAddModal}>Add Media</button>
        </div>
    )
}
export default AddMediaButton
