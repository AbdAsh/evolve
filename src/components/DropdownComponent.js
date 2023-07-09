import React, { useState, useEffect, useRef } from 'react';
import './FormComponent.scss';
import './DropdownComponent.scss';
import { TextField } from '@mui/material';

function Dropdown({ options, initialValue, onChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
    setOffset(0);
  }, [options, searchTerm]);

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
    onChange(option);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setOffset(0);
    setLimit(10);
  };

  const handleAddOption = () => {
    const newOption = prompt('Enter a new option:');
    if (newOption) {
      setFilteredOptions((prevOptions) => [...prevOptions, newOption]);
      setSelectedOption(newOption);
    }
  };

  return (
    <div className="input-container dropdown" ref={dropdownRef}>
      <TextField
        fullWidth
        className="input-field"
        placeholder="Choose Speakers"
      />
      <ul>
        <li className="search-dropdown">
          <TextField
            fullWidth
            className="input-field"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search..."
          />
        </li>
        <div className="dropdown-list">
          <li className="add-option" onClick={handleAddOption}>
            Add new option <span className="plus">+</span>
          </li>
          {filteredOptions.slice(offset, limit).map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={selectedOption === option ? 'active' : ''}
            >
              {option}
            </li>
          ))}
          {filteredOptions.length === 0 && <li>No options found</li>}
          {filteredOptions.length > limit && <li>Loading more options...</li>}
        </div>
      </ul>
    </div>
  );
}

export default Dropdown;
