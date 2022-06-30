import React from 'react'
// HeroIcons
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/react/outline'

interface Props {
  ClassName: string
  direction: 'up' | 'down'
}

const DropDownButton: React.FC<Props> = (props) => {
  const { ClassName, direction } = props

  return (
    <>
      {direction === 'up' ? (
        <ChevronDoubleUpIcon className={ClassName} />
      ) : (
        <ChevronDoubleDownIcon className={ClassName} />
      )}
    </>
  )
}

export default DropDownButton
