// NOTE: Material UI
import TextField from '@mui/material/TextField'

const FormItem = () => {
  return (
    <div className=" mt-3 flex w-full justify-start pt-3">
      <TextField
        size="small"
        fullWidth
        margin="normal"
        type="time"
        helperText="配達時間を選択してください"
      ></TextField>
      <TextField
        size="small"
        fullWidth
        margin="normal"
        type="date"
        helperText="配達日を選択してください"
      ></TextField>
      <TextField
        size="small"
        fullWidth
        margin="normal"
        helperText="電話番号を入力してください"
      ></TextField>
      <TextField
        size="small"
        label="名前"
        fullWidth
        margin="normal"
        helperText="お客様名、会社名を入力してください"
      ></TextField>
      <TextField
        size="small"
        fullWidth
        margin="normal"
        helperText="配達先住所を入力してください"
      ></TextField>
      <TextField
        size="small"
        fullWidth
        margin="normal"
        helperText="備考を入力してください"
      ></TextField>
    </div>
  )
}
export default FormItem
