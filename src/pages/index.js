import './index.scss';
import Form from '../components/FormComponent.js';
import { useLocation } from "react-router-dom";

function IndexPage() {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("sessionId");
  // ids: 135, 136
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
      </div>
      <Form session={id} />
    </div>
  );
}

export default IndexPage;
