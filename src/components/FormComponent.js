import { TextField, Box } from '@mui/material';
import './FormComponent.scss';
import UploadComponent from './UploadComponent';
import Dropdown from './DropdownComponent';
function Form(props) {
  // const { inputs } = props
  return (
    <div className="form-container">
      <h1 className="form-title">Form</h1>
      <Box component="form" className="form p-5">
        <div className="col-12 input-container">
          <span className="input-label">
            Session Title <span className="asterisk">*</span>
          </span>
          <TextField className="input-field" fullWidth variant="outlined" />
        </div>
        <div className="col-12 input-container">
          <span className="input-label"> Session Subtitle</span>
          <TextField className="input-field" fullWidth variant="outlined" />
        </div>
        <div className="col-12 input-container">
          <span className="input-label">Thumbnail</span>
          <UploadComponent />
        </div>
        <div className="row col-12">
          <div className="col-6 ps-0 input-container">
            <span className="input-label">
              Date<span className="asterisk">*</span>
            </span>
            <TextField className="input-field" fullWidth variant="outlined" />
          </div>
          <div className="col-3 input-container">
            <span className="input-label">
              From<span className="asterisk">*</span>
            </span>
            <TextField className="input-field" fullWidth variant="outlined" />
          </div>
          <div className="col-3 pe-0 input-container">
            <span className="input-label">
              Till<span className="asterisk">*</span>
            </span>
            <TextField className="input-field" fullWidth variant="outlined" />
          </div>
        </div>
        <div className="col-12 input-container">
          <span className="input-label">
            {' '}
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
