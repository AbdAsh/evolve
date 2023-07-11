import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import './ModalComponent.scss';
import './ModalComponent.scss';
import {UploadComponent, CustomInput} from './index';

// Define a functional component called Modal that takes in props
const Modal = ({ title, open = true, handleSubmit, handleClose }) => {
  // Define state variables for first name, last name, email, and errors
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Define event handlers for when the first name, last name, and email inputs change
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Define a function to validate the inputs and set the errors state variable
  const validate = () => {
    const newErrors = {};
    newErrors.firstName = firstName ? '' : 'This field is required';
    newErrors.lastName = lastName ? '' : 'This field is required';
    newErrors.email = email ? '' : 'This field is required';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((item) => item === '');
  };
  
  // Define an event handler for when the "Add" button is clicked
  const handleAdd = (event) => {
    event.preventDefault();
    if (!validate()) return;
    handleSubmit({ firstName, lastName, email });
    close();
  };

  // Define a function to reset the state variables and close the modal
  const close = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setErrors({
      firstName: '',
      lastName: '',
      email: ''
    });
    handleClose();
  };

  // Render the modal component with the appropriate inputs and buttons
  return (
    <Dialog className="ModalComponent" open={open} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div className="col-12 input-container text-center pb-4">
          <span className="input-label pb-4">Photo</span>
          <UploadComponent />
        </div>
        <div className="col-12 input-container">
          <CustomInput
            label="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            required
            error={errors.firstName}
          />
        </div>
        <div className="col-12 input-container">
          <CustomInput
            label="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            required
            error={errors.lastName}
          />
        </div>
        <div className="col-12 input-container">
          <CustomInput
            label="Email"
            value={email}
            onChange={handleEmailChange}
            required
            error={errors.email}
          />
        </div>
      </DialogContent>
      <DialogActions className="p-5 justify-content-around ">
        <Button className='button black' onClick={close}>
          Cancel
        </Button>
        <Button className="button white" onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Export the Modal component as the default export of this module
export default Modal;
