import { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import './FormComponent.scss';
import { CustomInput, UploadComponent, Modal, List, Dropdown } from './index';
import stadium from '../assets/stadium.png';
import axios from 'axios';
// set axios default headers
axios.defaults.baseURL =
  'https://qa-testing-backend-293b1363694d.herokuapp.com/api/v3';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpZCI6MjEyLCJ0eXBlIjoidXNlciIsInJhbiI6IkFQWEVFT0hMWEhSWk1ISlRUWFNZIiwic3RhdHVzIjoxfQ.ZgAWMwcCTYvVTARUT8wjxGCpLn5vRsDEt-zpzIPhsRN4np-sqWZ6YpCOPZsD40MWPjCfAepXdLIRW6JLiJYla8AHTogRMY-UIyqq8KvxhO8euOGVLLm6-jbhws7h4uznwQrc8mb8IywKm0Qagm2i5NdM9bRotWWW3viNXVxAOXfpx5ciRCSLlCAEisC47s5n7GM2ytT2BIeLEnSK1p9XvrF7-1Z-F8yjsKTG29wjejjZcanvY2_j53nR62glm-ZvIhP6jXPLlEaE1jttfOYC3BaJSHbdYdEXzSLzsAaB2HI1ZmtFdat7d 0cKsSvCgu6Z73uzvC6oOtbhywQQfu2lOw';
function Form(props) {
  const [openSpeakerModal, setOpenSpeakerModal] = useState(false);
  const [openModeratorModal, setOpenModeratorModal] = useState(false);
  const [speakerOptions, setSpeakerOptions] = useState([]);
  const [moderatorOptions, setModeratorOptions] = useState([]);
  const [formData, setFormData] = useState({
    sessionTitle: '',
    sessionSubtitle: '',
    date: '',
    from: '',
    to: '',
    description: '',
    speakers: [],
    moderators: [],
    venue: '',
  });
  const [errors, setErrors] = useState({
    sessionTitle: '',
    date: '',
    from: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [toUpdate, setToUpdate] = useState(null);
  const [lastOffset, setLastOffset] = useState(false);

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

  // useEffect(() => {
  // const session = {
  //   sessionTitle: 'Session Title',
  //   sessionSubtitle: 'Session Subtitle',
  //   date: '2021-10-10',
  //   from: '12:00',
  //   to: '13:00',
  //   description: 'Session Description',
  //   speakers: [
  //     { avatar: null, title: 'John Doe', subtitle: 'CEO' },
  //     { avatar: null, title: 'Jane Doe', subtitle: 'CEO' },
  //   ],
  //   moderators: [
  //     { avatar: null, title: 'John Doe', subtitle: 'CEO' },
  //     { avatar: null, title: 'Jane Doe', subtitle: 'CEO' },
  //   ],
  //   venue: {
  //     avatar: null,
  //     title: 'Lusail Stadium',
  //     subtitle: 'Venue Capacity: 3.000',
  //   },
  // };
  // setFormData(session);
  // }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name, value) => {
    if (formData[name].length && formData[name].some((item) => item === value))
      return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: [...prevFormData[name], value],
    }));
  };

  const validate = () => {
    const required = ['sessionTitle', 'date', 'from', 'description'];
    const newErrors = {};
    required.forEach((item) => {
      newErrors[item] = !formData[item] ? 'This field is required' : '';
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((item) => item === '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    console.log(formData);
  };

  const handleSearch = (value, type) => {
    setLoading(true);
    // if no value is passed, reset the options
    if (!value) {
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

  const increaseOffset = (type) => {
    setToUpdate(type ?? null);
    setOffset((prevOffset) => prevOffset + 1);
  };

  const times = Array.from(Array(24).keys()).map((item) => {
    const hour = item % 12 || 12;
    const ampm = item < 12 ? 'AM' : 'PM';
    return { label: `${hour}:00 ${ampm}`, value: `${item}:00` };
  });

  const findUsersById = (users, ids) =>
    ids.reduce((acc, id) => {
      const user = users.find((user) => user.id === id);
      if (user && !acc.some((u) => u.id === user.id)) acc.push(user);
      return acc;
    }, []);

  const deleteSpeaker = (speaker) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      speakers: prevFormData.speakers.filter((item) => item !== speaker.id),
    }));
  };

  const deleteModerator = (moderator) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      moderators: prevFormData.moderators.filter(
        (item) => item !== moderator.id
      ),
    }));
  };

  return (
    <div className="form-container">
      <Box component="form" className="form p-5" onSubmit={handleSubmit}>
        <div className="col-12 py-3 input-container">
          {CustomInput({
            label: 'Session Title',
            required: true,
            name: 'sessionTitle',
            value: formData.sessionTitle,
            onChange: handleInputChange,
            error: errors.sessionTitle,
          })}
        </div>
        <div className="col-12 py-3 input-container">
          {CustomInput({
            label: 'Session Subtitle',
            name: 'sessionSubtitle',
            value: formData.sessionSubtitle,
            onChange: handleInputChange,
          })}
        </div>
        <div className="col-12 py-3 input-container">
          <span className="input-label">Thumbnail</span>
          <UploadComponent />
        </div>
        <div className="row col-12  py-3">
          <div className="col-6 ps-0 input-container">
            {CustomInput({
              label: 'Date',
              required: true,
              name: 'date',
              value: formData.date,
              onChange: handleInputChange,
              error: errors.date,
            })}
          </div>
          <div className="col-3 input-container">
            <span className="input-label">
              From <span className="asterisk">*</span>
            </span>
            <Dropdown
              options={times}
              initialValue={formData.from}
              onChange={(value) => handleDropdownChange('from', value)}
              error={errors.from}
            />
          </div>
          <div className="col-3 pe-0 input-container">
            <span className="input-label">To</span>
            <Dropdown
              options={times}
              value={formData.to}
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
        <button type="submit">Submit</button>
      </Box>
      <Modal
        title="Add Speaker"
        open={openSpeakerModal}
        handleClose={() => setOpenSpeakerModal(false)}
        handleSubmit={(data) => console.log(data)}
      />
      <Modal
        title="Add Moderator"
        open={openModeratorModal}
        handleClose={() => setOpenModeratorModal(false)}
        handleSubmit={(data) => console.log(data)}
      />
    </div>
  );
}

export default Form;
