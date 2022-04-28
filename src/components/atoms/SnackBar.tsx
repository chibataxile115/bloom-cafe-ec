import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import clsx from 'clsx'

interface Props {
  message: string
  isOpen: boolean
  mode: 'success' | 'error'
  // direction: 'up' | 'down' | 'right' | 'left'
  anchorVertical?: 'top' | 'bottom'
  anchorHorizon?: 'center' | 'left' | 'right'
}

const SnackBar: React.FC<Props> = (props) => {
  const {
    message,
    isOpen,
    mode = 'success',
    anchorVertical = 'top',
    anchorHorizon = 'right',
  } = props

  return (
    <div>
      <Snackbar
        open={isOpen}
        // onClose={handleClose}
        key={anchorVertical + anchorHorizon}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: anchorVertical, horizontal: anchorHorizon }}
      >
        <div
          className="
          flex flex-row
          items-center
          justify-center rounded-md
          bg-gray-100 p-4 font-bold
          text-gray-700
          "
        >
          <div
            className={clsx(
              `mr-2 rounded-full p-1 text-gray-100`,
              mode === 'success' ? `bg-green-500` : `bg-red-400`
            )}
          >
            {mode === 'success' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          <p>{message}</p>
        </div>
      </Snackbar>
    </div>
  )
}

export default SnackBar
