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
import UploadComponent from './UploadComponent';
import CustomInput from './InputComponent';
const Modal = ({ title, open = true, handleSubmit, handleClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAdd = (event) => {
    handleSubmit({ firstName, lastName, email });
    handleClose();
  };

  return (
    <Dialog className="ModalComponent" open={open} onClose={handleClose}>
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
          />
        </div>
        <div className="col-12 input-container">
          <CustomInput
            label="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div className="col-12 input-container">
          <CustomInput
            label="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      </DialogContent>
      <DialogActions className="p-5 justify-content-around ">
        <Button className='button black' onClick={handleClose}>
          Cancel
        </Button>
        <Button className="button white" onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
