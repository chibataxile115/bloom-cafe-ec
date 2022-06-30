// バリデーション関連
import * as yup from 'yup'

const OrderFormSchema = () => {
  const schema = yup
    .object({
      // zipcode: yup
      //   .string()
      //   .required('郵便番号は必須項目です。')
      //   .matches(/(?=.*[0-9])/, '数字で入力して下さい。')
      //   .min(7, '7桁の数字で入力してください。')
      //   .max(7, '7桁の数字で入力してください。'),
      // prefectures: yup.string().required('都道府県は必須項目です'),
      // municipalities: yup.string().required('市区町村は必須項目です。'),
      addressBuilding: yup.string().required('番地・建物は必須項目です。'),
      clientName: yup.string().required('お客様名は必須項目です。'),
      phoneNumber: yup
        .string()
        .required('連絡先は必須項目です。')
        .matches(/(?=.*[0-9])/, '数字のみで入力して下さい。')
        .min(10, '電話番号を入力してください。')
        .max(11, '電話番号を入力してください。'),
      deliveryDate: yup.string().required('配達日時を選択してください。'),
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
