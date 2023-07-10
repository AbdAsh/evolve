import { TextField } from "@mui/material";
import "./FormComponent.scss";
function CustomInput(props) {
  const { label, required, name, value, error, onChange } = props;
  return (
    <>
      <span className="input-label">
        {label} {required && <span className="asterisk">*</span>}
      </span>
      <TextField
        className="input-field"
        fullWidth
        variant="outlined"
        onChange={(e) => onChange(e)}
        name={name}
        value={value}
        key={name}
        error={error ? true : false}
        helperText={error}
      />
    </>
  );
};

export default CustomInput;