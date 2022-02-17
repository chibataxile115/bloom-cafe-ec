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
        helperText="配達日を選択してください"
      ></TextField>
    </div>
  )
}
export default FormItem
