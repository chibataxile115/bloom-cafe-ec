// バリデーション関連
import * as yup from 'yup'

const OrderFormSchema = () => {
  const schema = yup
    .object({
      zipcode: yup
        .string()
        .required('必須項目です。')
        .min(7, '7桁の数字で入力してください。')
        .max(7, '7桁の数字で入力してください。'),
      prefectures: yup
        .string()
        .required('必須項目です')
        .matches(/(?=.)/, '入力して下さい。'),
      municipalities: yup
        .string()
        .required('必須項目です。')
        .matches(/(?=.)/, '入力して下さい。'),
      addressBuilding: yup
        .string()
        .required('必須項目です。')
        .matches(/(?=.)/, '入力して下さい。'),
      clientName: yup
        .string()
        .required('必須項目です。')
        .matches(/(?=.)/, '入力して下さい。'),
      phoneNumber: yup
        .string()
        .required('必須項目です。')
        .matches(/(?=.)/, '入力して下さい。'),
      deliveryDate: yup
        .string()
        .required('配達日時を選択してください。')
        .matches(/(?=.)/, '配達時間を選択してください。'),
      deliveryTime: yup
        .string()
        .required('配達時間を選択してください。')
        .min(5, '配達時間を選択してください。')
        .max(5, '配達時間を選択してください。。'),
    })
    .required()

  return schema
}

export default OrderFormSchema
