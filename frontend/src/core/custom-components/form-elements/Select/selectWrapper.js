import React from 'react';
import Select from 'react-select';
import _ from 'lodash';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const customStyles = {
  control: () => ( {
    display: 'flex',
    alignItems: 'center',
    border: 0,
    height: 'auto',
    minWidth: '50px',
    background: 'transparent',
    ':hover': { boxShadow: 'none' },
  } ),
  clearIndicator: provided => ( {
    ...provided,
    cursor: 'pointer',
    color: '#6c757d',
    padding: '0 8px'
  } ),
  singleValue: provided => ( {
    ...provided,
    marginLeft: 0,
  } ),
  valueContainer: provided => ( {
    ...provided,
    padding: '1px 8px 1px 0',
    cursor: 'pointer',
  } ),
  menu: provided => ( {
    ...provided,
    zIndex: '2000'
  } ),
  container: provided => ( {
    ...provided,
    height: 'auto !important',
    minHeight: '32px !important',
    padding: '0 !important',
  } ),
  input: provided => ( {
    ...provided,
    marginLeft: 0,
    paddingBottom: '4.7px',
  } ),
  placeholder: provided => ( {
    ...provided,
    marginLeft: 0,
    paddingBottom: '4.7px',
  } ),
  indicatorSeparator: provided => ( {
    ...provided,
    width: 0,
  } ),
  multiValueRemove: provided => ( {
    ...provided,
    cursor: 'pointer',
  } ),
};

function SelectWrapper( { inputRef, isMulti, value, options, ...props } ) {

  return (
    <Select
      isClearable={true}
      classNamePrefix="react-select"
      styles={customStyles}
      components={{
        DropdownIndicator: arrowProps => (
          arrowProps.isFocused ? <ArrowDropUpIcon className="pointer"/> :
            <ArrowDropDownIcon className="pointer"/>
        ),
        NoOptionsMessage: () => <div className="p-2 text-muted">No results found</div>,
      }}
      isMulti={isMulti}
      options={options}
      {...props}
      value={isMulti ? value.map( item => ( {
          value: item,
          label: _.get( options.find( o => o.value === item ), 'label' ),
        } ) )
        : value && {
        value,
        label: _.get( options.find( o => o.value === value ), 'label' ),
      }
      }
    />
  );
}

export default SelectWrapper;
