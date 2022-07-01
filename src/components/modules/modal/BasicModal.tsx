interface Props {
  children: React.ReactNode
  isOpenModal: boolean
}

const BasicModal: React.FC<Props> = (props) => {
  const { children, isOpenModal } = props

  return (
    <>
      {isOpenModal && (
        <div
          className="
          fixed
          top-0 left-0 z-10
          flex
          h-full w-full
          items-center
          justify-center
          bg-gray-600 bg-opacity-30
          "
        >
          <div
            className="
            flex
            max-h-[90%]
            max-w-[95%] flex-col
            rounded-md bg-white
            py-10
            px-2 shadow-2xl
          "
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default BasicModal
