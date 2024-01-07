interface ModalLayoutProps {
    isOpen: boolean,
    handleOpen: () => void
    children: React.ReactNode
}

const ModalLayout: React.FC<ModalLayoutProps> = ({ isOpen, handleOpen, children }) => {
  return (
    <div className={`z-50 absolute ${isOpen ? 'flex' : 'hidden'} w-screen h-screen top-0 left-0 justify-center items-center`}>
      <div onClick={handleOpen} className='-z-10 absolute w-screen h-screen bg-black bg-opacity-50 top-0 left-0'></div>
      {children}
    </div>
  )
}

export default ModalLayout