interface ModalLayoutProps {
    isOpen: boolean,
    handleOpen: () => void
    children: React.ReactNode
}

const ModalLayout: React.FC<ModalLayoutProps> = ({ isOpen, handleOpen, children }) => {
  return (
    <div className={`z-50 absolute ${isOpen ? 'block' : 'hidden'} w-screen h-screen top-0 left-0`}>
      <div onClick={handleOpen} className='absolute w-screen h-screen bg-black bg-opacity-50 top-0 left-0'></div>
      {children}
    </div>
  )
}

export default ModalLayout