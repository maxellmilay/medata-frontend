import { MediaInfoType } from '../interface/MediaInterface'

interface ModalInputPropsInterface {
  newMedia: MediaInfoType
  handleMediaChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputType: string
  inputValueType: string
}

const ModalInput = ({ newMedia, handleMediaChange, inputType, inputValueType }: ModalInputPropsInterface) => {

  return (
    <div className="flex items-center mb-2 w-full flex">
      <label htmlFor={inputType} className="mr-2">{inputType.charAt(0).toUpperCase() + inputType.slice(1)}: </label>
      <input type={inputValueType} id={inputType} name={inputType} value={newMedia[inputType as keyof MediaInfoType]} onChange={e => handleMediaChange(e)} className="grow border border-black p-1" />
    </div>
  )
}

export default ModalInput
