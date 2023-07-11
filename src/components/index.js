// Importing the necessary components from their respective files
import UploadComponent from './UploadComponent.js'
import CustomInput from './InputComponent.js'
import Dropdown from './DropdownComponent.js'
import List from './ListComponent.js'
import Modal from './ModalComponent.js'

// Exporting the imported components as named exports
export {
  UploadComponent,
  CustomInput,
  Dropdown,
  List,
  Modal
}

// Creating a new Error object with a message to be thrown if a default export is attempted
const message = new Error('Only named imports are allowed');
export default message;
