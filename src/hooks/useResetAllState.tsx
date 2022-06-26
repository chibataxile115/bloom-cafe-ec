import { resetMenue as resetMenueList } from '../redux/features/menue/menueListSlice'
import { resetState as resetSnackbar } from '../redux/features/snackbar/snackbarSlice'
import { resetState as resetStep } from '../redux/features/step/stepSlice'
import { resetCount as resetCartdetail } from '../redux/features/cartdetailSlice'
import { resetState as resetClientInfo } from '../redux/features/clientInfoSlice'
import { resetState as resetMenuePage } from '../redux/features/menuePageSlice'

import { useAppDispatch } from '../redux/app/hooks'

export const useResetAllState = () => {
  const dispatch = useAppDispatch()

  const resetAllState = () => {
    dispatch(resetMenueList())
    dispatch(resetSnackbar())
    dispatch(resetStep())
    dispatch(resetCartdetail())
    dispatch(resetClientInfo())
    dispatch(resetMenuePage())
  }

  return { resetAllState }
}
