import React from 'react';

export const options = [
    { value: 'MS', label: 'MS' },
    { value: 'WS', label: 'WS' },
    { value: 'MD', label: 'MD' },
    { value: 'WD', label: 'WD' },
    { value: 'XD', label: 'XD' }
]

export const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

export const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

export const selectStyle = {
    container: (provided) => ({
        ...provided,
        display: 'inline-block',
        width: '250px',
        minHeight: '1px',
        textAlign: 'left',
        border: 'none',
    }),
    control: (provided) => ({
        ...provided,
        borderRadius: '0',
        minHeight: '1px',
        height: '42px',
    }),
    input: (provided) => ({
        ...provided,
        minHeight: '1px',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        minHeight: '1px',
        paddingTop: '0',
        paddingBottom: '0',
        color: '#757575',
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        minHeight: '1px',
        height: '24px',
    }),
    clearIndicator: (provided) => ({
        ...provided,
        minHeight: '1px',
    }),
    valueContainer: (provided) => ({
        ...provided,
        minHeight: '1px',
        height: '40px',
        paddingTop: '0',
        paddingBottom: '0',
    }),
    singleValue: (provided) => ({
        ...provided,
        minHeight: '1px',
        paddingBottom: '2px',
    }),
  };

export const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);