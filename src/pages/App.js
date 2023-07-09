import logo from '../assets/logo.svg';
import './App.css';
import Form from '../components/FormComponent.js'


function App() {
  return (
    <div className="App">
      <Form />
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          It is me mario.
        </p>
      </div>
    </div>
  );
}

export default App;
