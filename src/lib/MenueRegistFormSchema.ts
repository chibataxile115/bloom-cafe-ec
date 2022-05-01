// バリデーション関連
import * as yup from 'yup'

const MenueRegistFormSchema = () => {
  const schema = yup
    .object({
      name: yup.string().required('商品名は必須項目です。'),
      plice: yup
        .string()
        .required('パスワードは必須項目です。')
        .matches(/(?=.*[0-9])/, '数字を含めてください。')
        .min(3, '最低100円以上で入力して下さい。'),
      category: yup.string().required('カテゴリーは必須項目です。'),
      menueIDL: yup
        .string()
        .required('メニューIDは必須項目です。')
        .matches(/(?=.*[a-z])/, '英小文字で入力して下さい。'),
      menueIDR: yup
        .string()
        .required('メニューIDは必須項目です。')
        .matches(/(?=.*[0-9])/, '数字で入力して下さい。'),
    })
    .required()

  return schema
}

export default MenueRegistFormSchema
