import { TextField, Box } from '@mui/material';
import './FormComponent.scss';
import UploadComponent from './UploadComponent';
import Dropdown from './DropdownComponent';
function Form(props) {
  // const { inputs } = props
  const CustomInput = (props) => {
    return (
      <>
        <span className="input-label">
          {props.label} {props.required && <span className="asterisk">*</span>}
        </span>
        <TextField className="input-field" fullWidth variant="outlined" onChange={props.onChange} />
      </>
    );
  }
  return (
    <div className="form-container">
      <h1 className="form-title">Form</h1>
      <Box component="form" className="form p-5">
        <div className="col-12 input-container">
          <CustomInput label="Session Title" required />
        </div>
        <div className="col-12 input-container">
          <CustomInput label="Session Subtitle" />
        </div>
        <div className="col-12 input-container">
          <span className="input-label">Thumbnail</span>
          <UploadComponent />
        </div>
        <div className="row col-12">
          <div className="col-6 ps-0 input-container">
          <CustomInput label="Date" required />
          </div>
          <div className="col-3 input-container">
            <CustomInput label="From" required />
          </div>
          <div className="col-3 pe-0 input-container">
            <CustomInput label="To" required />
          </div>
        </div>
        <div className="col-12 input-container">
          <span className="input-label">
            Description <span className="asterisk">*</span>{' '}
          </span>
          <TextField
            className="input-field textarea"
            multiline
            fullWidth
            variant="outlined"
            placeholder="Type details"
          />
        </div>
        <div className="col-12 line" />
        <div className="col-12 input-container">
          <span className="input-label"> Speakers </span>
          <Dropdown options={['lol', 'lmao', 'ye']} />
          
        </div>
      </Box>
    </div>
  );
}

export default Form;
