interface Props {
  children: React.ReactNode
  isOpenModal: boolean
}

const AdminBasicModal: React.FC<Props> = (props) => {
  const { children, isOpenModal } = props

  return (
    <>
      {isOpenModal && (
        <div
          className="
          fixed
          top-0 left-0 z-10
          flex
          h-full w-full items-center
          justify-center
          bg-gray-600 bg-opacity-30

          "
        >
          <div
            className="
            flex
            max-h-[90%]
            min-w-[500px] flex-col overflow-y-scroll
            rounded-md
            bg-white p-10 shadow-2xl
          "
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default AdminBasicModal
