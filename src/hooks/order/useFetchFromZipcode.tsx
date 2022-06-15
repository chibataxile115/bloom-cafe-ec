import React from 'react'
import axios from 'axios'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectClientInfo,
  updateInfo,
} from '../../redux/features/clientInfoSlice'
import {
  selectSnackBar,
  changeState as changeStateForSnackBar,
} from '../../redux/features/snackbar/snackbarSlice'

export const useFetchFromZipcode = () => {
  const dispatch = useAppDispatch()
  const clientInfoSelector = useAppSelector(selectClientInfo)
  const snackBarSelector = useAppSelector(selectSnackBar)

  const fetchZipcode = async () => {
    await axios
      .get('https://zipcloud.ibsnet.co.jp/api/search', {
        params: {
          zipcode: clientInfoSelector.zipcode,
        },
      })
      .then((res) => {
        if (res.data.results) {
          const result = res.data.results[0]

          console.log(`address1 : [${result['address1']}]`)
          console.log(`address2 : [${result['address2']}]`)

          dispatch(
            updateInfo({
              ...clientInfoSelector,
              prefectures: result['address1'],
              municipalities: result['address2'],
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          changeStateForSnackBar({
            ...snackBarSelector,
            isOpenTheMenueRegistSnackbar: true,
            mode: 'error',
          })
        )
        setTimeout(() => {
          dispatch(
            changeStateForSnackBar({
              ...snackBarSelector,
              isOpenTheMenueRegistSnackbar: false,
            })
          )
        }, 3000)
      })
  }
  return { fetchZipcode }
}
