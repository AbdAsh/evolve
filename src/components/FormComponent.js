import { useState, useEffect } from 'react';
import { TextField, Box, Button } from '@mui/material';
import './FormComponent.scss';
import { CustomInput, UploadComponent, Modal, List, Dropdown } from './index';
import stadium from '../assets/stadium.png';
import axios from 'axios';
// Set axios default headers
axios.defaults.baseURL =
  'https://qa-testing-backend-293b1363694d.herokuapp.com/api/v3';
  // NOTE: this is not the best way to set the token, but it's just for demo purposes :)
  // TODO: Should use a better way to set the token using environment variables or something else
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpZCI6MjEyLCJ0eXBlIjoidXNlciIsInJhbiI6IkFQWEVFT0hMWEhSWk1ISlRUWFNZIiwic3RhdHVzIjoxfQ.ZgAWMwcCTYvVTARUT8wjxGCpLn5vRsDEt-zpzIPhsRN4np-sqWZ6YpCOPZsD40MWPjCfAepXdLIRW6JLiJYla8AHTogRMY-UIyqq8KvxhO8euOGVLLm6-jbhws7h4uznwQrc8mb8IywKm0Qagm2i5NdM9bRotWWW3viNXVxAOXfpx5ciRCSLlCAEisC47s5n7GM2ytT2BIeLEnSK1p9XvrF7-1Z-F8yjsKTG29wjejjZcanvY2_j53nR62glm-ZvIhP6jXPLlEaE1jttfOYC3BaJSHbdYdEXzSLzsAaB2HI1ZmtFdat7d 0cKsSvCgu6Z73uzvC6oOtbhywQQfu2lOw';

function Form({ session }) {
  // State variables
  const [formKey, setFormKey] = useState(0);
  const [openSpeakerModal, setOpenSpeakerModal] = useState(false);
  const [openModeratorModal, setOpenModeratorModal] = useState(false);
  const [speakerOptions, setSpeakerOptions] = useState([]);
  const [moderatorOptions, setModeratorOptions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    date: '',
    from: '',
    to: '',
    description: '',
    speakers: [],
    moderators: [],
    venue: '',
  });
  const [errors, setErrors] = useState({
    title: '',
    date: '',
    from: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [toUpdate, setToUpdate] = useState(null);
  const [lastOffset, setLastOffset] = useState(false);

  // Effect to fetch session details
  useEffect(() => {
    if (!session) return;
    axios
      .get(`/session-details/${session}?event_id=8`)
      .then((res) => {
        setFormData({
          ...res.data,
          speakers: res.data.speakers.map((item) => item.id),
          moderators: res.data.moderators.map((item) => item.id),
        });
      })
      .catch((err) => console.log(err));
  }, [session]);

  // Effect to fetch users
  useEffect(() => {
    if (lastOffset) return;
    setLoading(true);
    axios
      .get(`/get-users?event_id=8&offset=${offset}&limit=${limit}`)
      .then((res) => {
        setLastOffset(res.data.last_offset);
        const newOptions = res.data.users.map((option) => ({
          label: `${option.first_name} ${option.last_name}`,
          value: option.id,
          ...option,
        }));
        if (toUpdate === 'speaker')
          setSpeakerOptions((prevOptions) => [...prevOptions, ...newOptions]);
        if (toUpdate === 'moderator')
          setModeratorOptions((prevOptions) => [...prevOptions, ...newOptions]);
        if (!toUpdate) {
          setSpeakerOptions(() => [...newOptions]);
          setModeratorOptions(() => [...newOptions]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [offset, limit, toUpdate, lastOffset]);

  // Function to handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle dropdown change
  const handleDropdownChange = (name, value) => {
    // NOTE: this is not the best way to handle dropdown change, but it's just for demo purposes :)
    // TODO: Should handle dropdown single select type
    if (name === 'from' || name === 'to') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      return;
    }

    // NOTE: this is not the best way to handle dropdown change, but it's just for demo purposes :)
    // TODO: Should handle dropdown multi select type
    if (formData[name].length && formData[name].some((item) => item === value))
      return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: [...prevFormData[name], value],
    }));
  };

  // Function to handle search
  const handleSearch = (value, type) => {
    setLoading(true);
    // if no value is passed, reset the options
    if (value === '') {
      setLoading(false);
      return setToUpdate(type ?? null);
    }
    
    axios
      .get(`/search-users?event_id=8&search=${value}`)
      .then((res) => {
        const newOptions = res.data.users.map((option) => ({
          label: `${option.first_name} ${option.last_name}`,
          value: option.id,
          ...option,
        }));
        if (type === 'speaker') setSpeakerOptions(newOptions);
        if (type === 'moderator') setModeratorOptions(newOptions);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  // Function to handle infinite scrolling
  const increaseOffset = (type) => {
    setToUpdate(type ?? null);
    setOffset((prevOffset) => prevOffset + 1);
  };

  // Function to generate times in 12 hour format
  const times = Array.from(Array(24).keys()).map((item) => {
    const hour = item % 12 || 12;
    const ampm = item < 12 ? 'AM' : 'PM';
    return { label: `${hour}:00 ${ampm}`, value: `${item}:00` };
  });

  // Function to find users by id from the options and return them in the same order
  const findUsersById = (users, ids) =>
    ids.reduce((acc, id) => {
      const user = users.find((user) => user.id === id);
      if (user && !acc.some((u) => u.id === user.id)) acc.push(user);
      return acc;
    }, []);

    // Function to delete speaker from the list
  const deleteSpeaker = (speaker) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      speakers: prevFormData.speakers.filter((item) => item !== speaker.id),
    }));
  };

  // Function to delete moderator from the list
  const deleteModerator = (moderator) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      moderators: prevFormData.moderators.filter(
        (item) => item !== moderator.id
      ),
    }));
  };

  // Function to submit the modal and add the user
  const submitModal = (user) => {
    const { firstName, lastName, email } = user;
    axios
      .post('/create-users', {
        event_id: 8,
        first_name: firstName,
        last_name: lastName,
        email: email,
      })
      .then((res) => {
        setToUpdate(null);
        setOffset(0);
      })
      .catch((err) => console.log(err));
  };

  // Function to validate the form
  const validate = () => {
    const required = Object.keys(errors);
    const newErrors = {};
    // NOTE: this is not the best way to validate, but it's just for demo purposes :)
    // TODO: Should also validate the other fields
    required.forEach((item) => {
      newErrors[item] = !formData[item] ? 'This field is required' : '';

      if (item === 'date' && !/^\d{2}-\d{2}-\d{4}$/.test(formData.date))
        newErrors[item] =
          newErrors[item] ?? 'Date must be in the format DD-MM-YYYY';
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((item) => item === '');
  };

  // Function to submit the form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    axios
      .post('/create-sessions', {
        event_id: 8,
        title: formData.title,
        subtitle: formData.subtitle,
        date: formData.date,
        from: formData.from,
        to: formData.to,
        description: formData.description,
        speaker_ids: formData.speakers,
        moderator_ids: formData.moderators,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  // Function to reset the form
  const handleReset = (event) => {
    event.preventDefault();
    // NOTE: this is not the best way to reset the form, but it's just for demo purposes :)
    // TODO: Should remove sessionId from the url
    setFormKey((prevKey) => prevKey + 1);
    setFormData({
      title: '',
      subtitle: '',
      date: '',
      from: '',
      to: '',
      description: '',
      speakers: [],
      moderators: [],
      venue: '',
    });
    setErrors({
      title: '',
      date: '',
      from: '',
      description: '',
    });
  };

  // Render the component
  return (
    <div className="form-container">
      <Box
        key={formKey}
        component="form"
        className="form p-5"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className="col-4 p-4 buttons-container">
          <Button className="w-100 button black" type="reset">
            Cancel
          </Button>
          <Button className="w-100 button white" type="submit">
            Next
          </Button>
        </div>
        <div className="col-12 py-3 input-container">
          <CustomInput
            label="Session Title"
            required
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            error={errors.title}
          />
        </div>
        <div className="col-12 py-3 input-container">
          <CustomInput
            label="Session Subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12 py-3 input-container">
          <span className="input-label">Thumbnail</span>
          <UploadComponent />
        </div>
        <div className="row col-12  py-3">
          <div className="col-6 ps-0 input-container">
            <CustomInput
              label="Date"
              required
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              error={errors.date}
            />
          </div>
          <div className="col-3 input-container">
            <span className="input-label">
              From <span className="asterisk">*</span>
            </span>
            <Dropdown
              showValue
              options={times}
              onChange={(value) => handleDropdownChange('from', value)}
              error={errors.from}
            />
          </div>
          <div className="col-3 pe-0 input-container">
            <span className="input-label">To</span>
            <Dropdown
              showValue
              options={times}
              onChange={(value) => handleDropdownChange('to', value)}
              initialValue={formData.to}
            />
          </div>
        </div>
        <div className="col-12 py-3 input-container">
          <span className="input-label">
            Description <span className="asterisk">*</span>
          </span>
          <TextField
            className="input-field textarea"
            multiline
            fullWidth
            variant="outlined"
            placeholder="Type details"
            onChange={handleInputChange}
            name="description"
            value={formData.description}
            error={errors.description ? true : false}
            helperText={errors.description}
          />
        </div>
        <div className="col-12 line" />
        <div className="col-12 py-3 input-container">
          <span className="input-label"> Speakers </span>
          <Dropdown
            placeholder="Choose Speakers"
            itemLabel="speaker"
            loading={loading}
            options={speakerOptions}
            showSearch
            showAddOption
            value={formData.speakers}
            onAdd={() => setOpenSpeakerModal(true)}
            onChange={(value) => handleDropdownChange('speakers', value)}
            onScrollEnd={() => increaseOffset('speaker')}
            onSearch={(e) => handleSearch(e, 'speaker')}
          />
          <List
            items={[...findUsersById(speakerOptions, formData.speakers)]}
            onDelete={deleteSpeaker}
          />
        </div>
        <div className="col-12 py-3 input-container">
          <span className="input-label"> Moderators </span>
          <Dropdown
            placeholder="Choose Moderators"
            itemLabel="moderator"
            loading={loading}
            options={moderatorOptions}
            showSearch
            showAddOption
            value={formData.moderators}
            onAdd={() => setOpenModeratorModal(true)}
            onChange={(value) => handleDropdownChange('moderators', value)}
            onScrollEnd={() => increaseOffset('moderator')}
            onSearch={(e) => handleSearch(e, 'moderator')}
          />
          <List
            items={[...findUsersById(moderatorOptions, formData.moderators)]}
            onDelete={deleteModerator}
          />
        </div>
        <div className="col-12 line" />
        {/* NOTE: The Venue is neglected for time purposes */}
        <div className="col-12 py-3 input-container overflow-hidden">
          <span className="input-label"> Venue </span>
          <Dropdown
            placeholder="Choose Venues"
            itemLabel="venue"
            showSearch
            showAddOption
            value={formData.venue}
            onChange={(value) => handleDropdownChange('venue', value)}
          />
          <ul className="p-0 mt-2">
            {['lol'].map((item) => {
              return (
                <li key={item}>
                  <div
                    className="main-info p-0 w-100"
                    style={{ height: '100px' }}
                  >
                    <img src={stadium} alt="avatar" className="h-100" />
                    <div className="col-12 ps-3 input-container">
                      <p className="list-title">Lusail Stadium</p>
                      <p className="list-subtitle m-0">Venue Capacity: 3.000</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Box>
      <Modal
        title="Add Speaker"
        open={openSpeakerModal}
        handleClose={() => setOpenSpeakerModal(false)}
        handleSubmit={submitModal}
      />
      <Modal
        title="Add Moderator"
        open={openModeratorModal}
        handleClose={() => setOpenModeratorModal(false)}
        handleSubmit={submitModal}
      />
    </div>
  );
}

export default Form;
