import { TextField, Box } from '@mui/material';
import './FormComponent.scss';
import UploadComponent from './UploadComponent';
import Dropdown from './DropdownComponent';
import List from './ListComponent';
import stadium from '../assets/stadium.png';
function Form(props) {
  // const { inputs } = props
  const CustomInput = (props) => {
    return (
      <>
        <span className="input-label">
          {props.label} {props.required && <span className="asterisk">*</span>}
        </span>
        <TextField
          className="input-field"
          fullWidth
          variant="outlined"
          onChange={props.onChange}
        />
      </>
    );
  };
  return (
    <div className="form-container">
      <Box component="form" className="form p-5">
        <div className="col-12 py-3 input-container">
          <CustomInput label="Session Title" required />
        </div>
        <div className="col-12 py-3 input-container">
          <CustomInput label="Session Subtitle" />
        </div>
        <div className="col-12 py-3 input-container">
          <span className="input-label">Thumbnail</span>
          <UploadComponent />
        </div>
        <div className="row col-12  py-3">
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
        <div className="col-12 py-3 input-container">
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
        <div className="col-12 py-3 input-container">
          <span className="input-label"> Speakers </span>
          <Dropdown
            placeholder="Choose Speakers"
            itemLabel="speaker"
            options={['lol', 'lmao', 'ye']}
            showSearch
            showAddOption
          />
          <List
            items={[
              { title: 'lol', subtitle: 'lmao' },
              { title: 'lol', subtitle: 'lmao' },
            ]}
          />
        </div>
        <div className="col-12 py-3 input-container">
          <span className="input-label"> Moderators </span>
          <Dropdown
            placeholder="Choose Moderators"
            itemLabel="moderator"
            options={['lol', 'lmao', 'ye']}
            showSearch
            showAddOption
          />
          <List
            items={[
              { title: 'lol', subtitle: 'lmao' },
              { title: 'lol', subtitle: 'lmao' },
            ]}
          />
        </div>
        <div className="col-12 line" />
        <div className="col-12 py-3 input-container">
          <span className="input-label"> Venue </span>
          <Dropdown
            placeholder="Choose Venues"
            itemLabel="venue"
            options={['lol', 'lmao', 'ye']}
            showSearch
            showAddOption
          />
          <ul>
            {['lol'].map((item) => {
              return (
                <li>
                  <div className="main-info p-0 w-100" style={{height: "100px"}}>
                    <img
                      src={stadium}
                      alt="avatar"
                      className="h-100"
                    />
                    <div className="col-12 ps-3 input-container">
                    <p className="list-title">Lusail Stadium</p>
                    <p className="list-subtitle m-0">Venue Capacity: 3.000</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Box>
    </div>
  );
}

export default Form;
