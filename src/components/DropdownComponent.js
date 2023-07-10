import React, { useState, useEffect, useRef } from 'react';
import './FormComponent.scss';
import './DropdownComponent.scss';
import { TextField } from '@mui/material';

function Dropdown({
  showSearch,
  showAddOption,
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
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hasOptions = options && options.length > 0;

  useEffect(() => {
    // match the initial value to the option object
    if (initialValue && hasOptions) {
      const option = options.find((option) => option.value === initialValue);
      setSelectedOption(option);
    }
  }, [hasOptions, options, initialValue]);

  useEffect(() => {
    if (isOpen && hasOptions){
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


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    onSearch ? onSearch(event.target.value) : console.log('no onSearch prop') ;
  };

  const handleAddOption = () => {
    onAdd();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="input-container dropdown mb-0">
      <div
        className="position-relative dropdown-field"
        onClick={toggleDropdown}
      >
        <TextField
          fullWidth
          className="input-field pe-none user-select-none"
          placeholder={placeholder}
          key={selectedOption?.value}
          error={error ? true : false}
          helperText={!isOpen && error ? error : null}
        />
        <i
          className={`fas fa-chevron-${
            isOpen && hasOptions ? 'up' : 'down'
          } dropdown-icon`}
        />
      </div>
      {isOpen && (
        <ul>
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
          <div className="dropdown-list" ref={dropdownRef}>
            {loading && <div className="background-dim"/>}
            {showAddOption && (
              <li className="add-option" onClick={handleAddOption}>
                Add new {itemLabel ?? 'option'} <span className="plus">+</span>
              </li>
            )}
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
            {options.length === 0 && <li>No options found</li>}
            {loading && <li>Loading more options...</li>}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
