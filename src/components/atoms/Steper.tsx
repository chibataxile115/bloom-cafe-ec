// NOTE:Material-UI
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectStep } from '../../redux/features/step/stepSlice'

const Steper = () => {
  const steps = ['ようこそ', '商品選択', '注文確認']

  const dispatch = useAppDispatch()
  const stepSelector = useAppSelector(selectStep)

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={stepSelector.stepIndex} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default Steper
