// Make a new file called index.js in the components folder

import UploadComponent from './UploadComponent.js'
import CustomInput from './InputComponent.js'
import Dropdown from './DropdownComponent.js'
import List from './ListComponent.js'
import Modal from './ModalComponent.js'

export {
  UploadComponent,
  CustomInput,
  Dropdown,
  List,
  Modal
}

const message = new Error('Only named imports are allowed');
export default message;
