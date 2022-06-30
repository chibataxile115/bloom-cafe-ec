import React from 'react'
// HeroIcons
import { ArrowSmRightIcon, ArrowSmLeftIcon } from '@heroicons/react/outline'

interface Props {
  ClassName: string
  direction: 'left' | 'right'
}

const ArrowButton: React.FC<Props> = (props) => {
  const { ClassName, direction } = props

  return (
    <>
      {direction === 'left' ? (
        <ArrowSmLeftIcon className={ClassName} />
      ) : (
        <ArrowSmRightIcon className={ClassName} />
      )}
    </>
  )
}

export default ArrowButton
