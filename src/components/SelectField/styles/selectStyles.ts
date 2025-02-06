import { StylesConfig } from 'react-select';

const selectStyles: StylesConfig = {
  container: (provided) => ({
    ...provided,
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent',
    height: '50px',
    border: state.isFocused ? '2px solid #F0B90B' : '1px solid #474D57',
    boxShadow: state.isFocused ? '#F0B90B' : 'none',
    '&:hover': {
      borderColor: '#F0B90B',
    },
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: '#474D57',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#303852' : state.isFocused ? '#303852' : '#2a3045',
    color: state.isSelected ? '#fff' : '#000',
    '&:active': {
      backgroundColor: '#303852',
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    backgroundColor: '#303852',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
    borderRadius: '8px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#333',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#aaa',
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff',
  }),
};

export default selectStyles;
