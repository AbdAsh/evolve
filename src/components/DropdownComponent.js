import React, { useState, useEffect, useRef } from 'react';
import './FormComponent.scss';
import './DropdownComponent.scss';
import { TextField } from '@mui/material';

function Dropdown({
  showSearch,
  showAddOption,
  showValue,
  placeholder,
  itemLabel,
  options,
  initialValue,
  loading,
  error,
  onChange,
  onAdd,
  onSearch,
  onScrollEnd,
}) {
  // State variables
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hasOptions = options && options.length > 0;

  // Effect to match the initial value to the option object
  useEffect(() => {
    if (initialValue && hasOptions) {
      const option = options.find((option) => option.value === initialValue);
      setSelectedOption(option);
    }
  }, [hasOptions, options, initialValue]);

  // Effect to handle infinite scrolling
  useEffect(() => {
    if (isOpen && hasOptions && onScrollEnd){
      const dropdown =  dropdownRef.current;
      const handleScroll = () => {
        if (dropdown.scrollTop + dropdown.clientHeight + 10 >= dropdown.scrollHeight) {
          onScrollEnd();
        }
      };
      dropdown.addEventListener('scroll', handleScroll);
      return () => dropdown.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen, hasOptions, onScrollEnd]);

  // Function to handle option click
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  // Function to handle input change for search
  const handleInputChange = (event) => {
    onSearch ? onSearch(event.target.value) : console.log('no onSearch prop') ;
  };

  // Function to handle adding a new option
  const handleAddOption = () => {
    onAdd();
  };

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Render the dropdown component
  return (
    <div className="input-container dropdown mb-0">
      {/* Dropdown field */}
      <div
        className="position-relative dropdown-field"
        onClick={toggleDropdown}
      >
        {/* Text field for selected option */}
        <TextField
          fullWidth
          className="input-field pe-none user-select-none"
          placeholder={placeholder}
          key={selectedOption?.value}
          value={showValue && selectedOption ? selectedOption.label : ''}
          error={error ? true : false}
          helperText={!isOpen && error ? error : null}
        />
        {/* Dropdown icon */}
        <i
          className={`fas fa-chevron-${
            isOpen && hasOptions ? 'up' : 'down'
          } dropdown-icon`}
        />
      </div>
      {/* Dropdown options */}
      {isOpen && (
        <ul>
          {/* Search bar */}
          {showSearch && (
            <li className="search-dropdown">
              <TextField
                fullWidth
                className="input-field"
                onChange={handleInputChange}
                placeholder="Search..."
              />
            </li>
          )}
          {/* Dropdown list */}
          <div className="dropdown-list" ref={dropdownRef}>
            {/* Loading background */}
            {loading && <div className="background-dim"/>}
            {/* Add option button */}
            {showAddOption && (
              <li className="add-option" onClick={handleAddOption}>
                Add new {itemLabel ?? 'option'} <span className="plus">+</span>
              </li>
            )}
            {/* Dropdown options */}
            {options.map((option, i) => (
              <li
                key={i}
                onClick={() => handleOptionClick(option)}
                className={selectedOption === option ? 'active' : ''}
              >
                {option.label}
              </li>
            ))}
          </div>
          {/* No options found */}
          {options.length === 0 && <li>No options found</li>}
          {/* Loading more options */}
          {loading && <li>Loading more options...</li>}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
