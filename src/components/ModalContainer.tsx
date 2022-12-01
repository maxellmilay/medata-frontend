import { ReactNode } from 'react'

interface ModalContainerPropsInterface {
    children: ReactNode
}

const ModalContainer = ({ children }: ModalContainerPropsInterface) => {
    return (
        <div className="bg-zinc-200 bg-opacity-80 fixed inset-0 z-50">
            <div className="flex h-screen justify-center items-center">
                <div className="flex flex-col justify-center items-center bg-white py-12 px-24 border-2 border-black">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalContainer
