import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from '../src/components/FormComponent';

describe('Form component', () => {
  test('renders all form fields', () => {
    const { getByLabelText } = render(<Form />);
    expect(getByLabelText('Session Title')).toBeInTheDocument();
    expect(getByLabelText('Session Subtitle')).toBeInTheDocument();
    expect(getByLabelText('Date')).toBeInTheDocument();
    expect(getByLabelText('From *')).toBeInTheDocument();
    expect(getByLabelText('To')).toBeInTheDocument();
    expect(getByLabelText('Description *')).toBeInTheDocument();
    expect(getByLabelText('Speakers')).toBeInTheDocument();
    expect(getByLabelText('Moderators')).toBeInTheDocument();
    expect(getByLabelText('Venue')).toBeInTheDocument();
  });

  test('updates form data when input fields change', () => {
    const { getByLabelText } = render(<Form />);
    const titleInput = getByLabelText('Session Title');
    const subtitleInput = getByLabelText('Session Subtitle');
    const dateInput = getByLabelText('Date');
    const descriptionInput = getByLabelText('Description *');

    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    fireEvent.change(subtitleInput, { target: { value: 'New Subtitle' } });
    fireEvent.change(dateInput, { target: { value: '2022-01-01' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });

    expect(titleInput.value).toBe('New Title');
    expect(subtitleInput.value).toBe('New Subtitle');
    expect(dateInput.value).toBe('2022-01-01');
    expect(descriptionInput.value).toBe('New Description');
  });

  test('displays error message when required field is empty', () => {
    const { getByLabelText, getByText } = render(<Form />);
    const titleInput = getByLabelText('Session Title');
    const dateInput = getByLabelText('Date');

    fireEvent.change(titleInput, { target: { value: '' } });
    fireEvent.change(dateInput, { target: { value: '' } });

    expect(getByText('This field is required.')).toBeInTheDocument();
  });
});