import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dropdown from '../components/DropdownComponent';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

describe('Dropdown component', () => {
  it('renders without crashing', () => {
    render(<Dropdown options={options} />);
  });

  it('displays the selected option', () => {
    const { getByPlaceholderText } = render(
      <Dropdown options={options} initialValue="option2" showValue />
    );
    expect(getByPlaceholderText('Select an option')).toHaveValue('Option 2');
  });

  it('opens the dropdown when clicked', () => {
    const { getByText, getByPlaceholderText } = render(
      <Dropdown options={options} showValue placeholder="Select an option" />
    );
    fireEvent.click(getByPlaceholderText('Select an option'));
    expect(getByText('Option 1')).toBeVisible();
    expect(getByText('Option 2')).toBeVisible();
    expect(getByText('Option 3')).toBeVisible();
  });

  it('closes the dropdown when an option is selected', () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
      <Dropdown options={options} showValue placeholder="Select an option" />
    );
    fireEvent.click(getByPlaceholderText('Select an option'));
    fireEvent.click(getByText('Option 2'));
    expect(queryByText('Option 1')).toBeNull();
    expect(queryByText('Option 2')).toBeNull();
    expect(queryByText('Option 3')).toBeNull();
  });

  it('calls the onChange function when an option is selected', () => {
    const handleChange = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Dropdown options={options} showValue placeholder="Select an option" onChange={handleChange} />
    );
    fireEvent.click(getByPlaceholderText('Select an option'));
    fireEvent.click(getByText('Option 2'));
    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('displays an error message when there is an error', () => {
    const { getByText, getByPlaceholderText } = render(
      <Dropdown options={options} showValue placeholder="Select an option" error="Error message" />
    );
    expect(getByPlaceholderText('Select an option')).toHaveClass('Mui-error');
    expect(getByText('Error message')).toBeVisible();
  });

  it('displays a search bar when showSearch is true', () => {
    const { getByPlaceholderText } = render(
      <Dropdown options={options} showSearch placeholder="Select an option" />
    );
    expect(getByPlaceholderText('Search...')).toBeVisible();
  });

  it('calls the onSearch function when the search input changes', () => {
    const handleSearch = jest.fn();
    const { getByPlaceholderText } = render(
      <Dropdown options={options} showSearch placeholder="Select an option" onSearch={handleSearch} />
    );
    fireEvent.change(getByPlaceholderText('Search...'), { target: { value: 'Option 2' } });
    expect(handleSearch).toHaveBeenCalledWith('Option 2');
  });

  it('displays an "Add new option" button when showAddOption is true', () => {
    const handleAdd = jest.fn();
    const { getByText } = render(
      <Dropdown options={options} showAddOption itemLabel="item" onAdd={handleAdd} />
    );
    expect(getByText('Add new item +')).toBeVisible();
  });

  it('calls the onAdd function when the "Add new option" button is clicked', () => {
    const handleAdd = jest.fn();
    const { getByText } = render(
      <Dropdown options={options} showAddOption itemLabel="item" onAdd={handleAdd} />
    );
    fireEvent.click(getByText('Add new item +'));
    expect(handleAdd).toHaveBeenCalled();
  });

  it('displays a "No options found" message when there are no options', () => {
    const { getByText, getByPlaceholderText } = render(
      <Dropdown options={[]} showValue placeholder="Select an option" />
    );
    fireEvent.click(getByPlaceholderText('Select an option'));
    expect(getByText('No options found')).toBeVisible();
  });

  it('displays a "Loading more options..." message when loading is true', () => {
    const { getByText, getByPlaceholderText } = render(
      <Dropdown options={options} showValue placeholder="Select an option" loading />
    );
    fireEvent.click(getByPlaceholderText('Select an option'));
    expect(getByText('Loading more options...')).toBeVisible();
  });
});