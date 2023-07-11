import './index.scss';
import Form from '../components/FormComponent.js';
import { useLocation } from "react-router-dom";

function IndexPage() {
  // Get the search query parameters from the current URL
  const search = useLocation().search;
  // Extract the value of the 'sessionId' parameter from the query string
  const id = new URLSearchParams(search).get("sessionId");
  // Render the following JSX code
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
      {/* Render the Form component and pass the session ID as a prop */}
      <Form session={id} />
    </div>
  );
}

export default IndexPage;
