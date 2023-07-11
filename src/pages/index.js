import './index.scss';
import Form from '../components/FormComponent.js';
import { Button } from '@mui/material';

function IndexPage() {
  // get route query params
  return (
    <div className="App">
      <div className="row p-3 justify-content-between page-header">
        <div className="col-auto back-nav">
          <div className="back-icon">
            <i className="fas fa-chevron-left pe-2"></i>
            <span>All Session</span>
          </div>
          <div className="ps-3 page-title">
            <h6 className="ps-3 text-white">New Sessions</h6>
          </div>
        </div>
        <div className="col-4 d-flex align-items-center">
          <Button className="w-100 button black" type="reset">
            Reset
          </Button>
          <Button className="w-100 button white ms-3" type="submit">
            Save
          </Button>
        </div>
      </div>
      <Form />
    </div>
  );
}

export default IndexPage;
