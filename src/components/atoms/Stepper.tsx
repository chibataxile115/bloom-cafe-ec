import React from 'react'
import clsx from 'clsx'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectStep } from '../../redux/features/step/stepSlice'
// HeroIcons
import {
  HomeIcon,
  DocumentDuplicateIcon,
  ExclamationCircleIcon,
  ClipboardCheckIcon,
} from '@heroicons/react/outline'

const Stepper = () => {
  const dispatch = useAppDispatch()
  const stepSelector = useAppSelector(selectStep)

  const stepItems = [
    { name: 'ようこそ', index: 1, svg: <HomeIcon className="h-full w-full" /> },
    {
      name: '商品選択',
      index: 2,
      svg: <DocumentDuplicateIcon className="h-full w-full" />,
    },
    {
      name: 'お客様情報',
      index: 3,
      svg: <ExclamationCircleIcon className="h-full w-full" />,
    },
    {
      name: '注文内容',
      index: 4,
      svg: <ClipboardCheckIcon className="h-full w-full" />,
    },
  ]
  const stepsLength = stepItems.length

  return (
    <div className="p-5">
      <div className="p-5">
        <ul className="flex items-center">
          {stepItems.map((step) => (
            <React.Fragment key={step.index}>
              <li
                key={step.index}
                className={clsx(
                  `relative flex items-center`,
                  stepSelector.stepIndex === step.index
                    ? 'text-white'
                    : 'text-black'
                )}
              >
                <div
                  className={clsx(
                    `h-12 w-12 rounded-full border-2 border-black py-3 transition duration-500 ease-in-out`,
                    stepSelector.stepIndex === step.index
                      ? 'bg-black'
                      : 'bg-white'
                  )}
                >
                  {step.svg}
                </div>
                <div className="absolute top-0 -ml-10 mt-16 w-32 text-center text-xs font-medium uppercase text-black">
                  {step.name}
                </div>
              </li>
              {step.index < stepsLength && (
                <div
                  className={clsx(
                    `flex-auto border-t-2 border-black transition duration-500 ease-in-out`,
                    stepSelector.stepIndex > step.index
                      ? 'border-black'
                      : 'border-white'
                  )}
                ></div>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Stepper
