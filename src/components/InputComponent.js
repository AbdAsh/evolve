// Importing the TextField component from the MUI library
import { TextField } from "@mui/material";

// Importing the styles for the component
import "./FormComponent.scss";

// Defining the CustomInput component as a function that takes in props
function CustomInput(props) {
  // Destructuring the props object to get the necessary values
  const { label, required, name, value, error, onChange } = props;

  // Returning the JSX for the component
  return (
    <>
      {/* Displaying the label for the input, with an asterisk if it's required */}
      <span className="input-label">
        {label} {required && <span className="asterisk">*</span>}
      </span>

      {/* Rendering the TextField component with the necessary props */}
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

// Exporting the CustomInput component as the default export of the module
export default CustomInput;