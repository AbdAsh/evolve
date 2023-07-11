import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../components/ModalComponent';

describe('Modal', () => {
  let wrapper;
  const handleSubmit = jest.fn();
  const handleClose = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Modal
        title="Add User"
        open={true}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    );
  });

  it('renders the title', () => {
    expect(wrapper.find('DialogTitle').text()).toEqual('Add User');
  });

  it('renders the first name input', () => {
    expect(wrapper.find('CustomInput[label="First Name"]').exists()).toBe(true);
  });

  it('renders the last name input', () => {
    expect(wrapper.find('CustomInput[label="Last Name"]').exists()).toBe(true);
  });

  it('renders the email input', () => {
    expect(wrapper.find('CustomInput[label="Email"]').exists()).toBe(true);
  });

  it('calls the handleSubmit function when the Add button is clicked', () => {
    wrapper.find('Button.white').simulate('click');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('calls the handleClose function when the Cancel button is clicked', () => {
    wrapper.find('Button.black').simulate('click');
    expect(handleClose).toHaveBeenCalled();
  });
});