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
  initialLimit,
  error,
  onChange,
  onAdd
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(initialLimit);
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
    const filtered = hasOptions
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
    setFilteredOptions(filtered);
    setOffset(0);
  }, [options, searchTerm, hasOptions]);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    dropdown.addEventListener('scroll', handleScroll);
    return () => dropdown.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const dropdown = dropdownRef.current;
    if (dropdown.scrollTop + dropdown.clientHeight >= dropdown.scrollHeight) {
      setLimit((prevLimit) => prevLimit + 10);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSearchTerm('');
    onChange(option.value);
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setOffset(0);
    setLimit(initialLimit);
  };

  const handleAddOption = () => {
    onAdd();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="input-container dropdown mb-0" ref={dropdownRef}>
      <div
        className="position-relative dropdown-field"
        onClick={toggleDropdown}
      >
        <TextField
          fullWidth
          className="input-field pe-none user-select-none"
          placeholder={placeholder}
          value={selectedOption?.label}
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
      {isOpen && hasOptions && (
        <ul>
          {showSearch && (
            <li className="search-dropdown">
              <TextField
                fullWidth
                className="input-field"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search..."
              />
            </li>
          )}
          <div className="dropdown-list">
            {showAddOption && (
              <li className="add-option" onClick={handleAddOption}>
                Add new {itemLabel ?? 'option'} <span className="plus">+</span>
              </li>
            )}
            {filteredOptions.slice(offset, limit).map((option, i) => (
              <li
                key={i}
                onClick={() => handleOptionClick(option)}
                className={selectedOption === option ? 'active' : ''}
              >
                {option.label}
              </li>
            ))}
            {filteredOptions.length === 0 && <li>No options found</li>}
            {filteredOptions.length > limit && <li>Loading more options...</li>}
          </div>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
