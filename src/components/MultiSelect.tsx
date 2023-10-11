import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: '0.375rem',
    cursor: 'pointer',
    borderWidth: '2px',
    border: '2px solid #364150',
    backgroundColor: '#364150',
    color: '#ffffff',
    borderColor: '#364150',
    caretColor: 'transparent',
    minHeight: '2.25rem',
    boxShadow: 'none',

    ':hover': {
      borderColor: '#364150',
    },

    ':focus-within': {
      borderColor: 'rgb(79 70 229)',
    },
  }),
  input: (provided: any) => ({
    ...provided,
    color: '#ffffff',
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: '#ffffff',

    ':hover': {
      color: '#ffffff',
    },
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: '#ffffff',

    ':hover': {
      color: '#ffffff',
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#ffffff',
  }),
  option: (provided: any) => ({
    ...provided,
    backgroundColor: '#4A5568',
    color: '#ffffff',
    cursor: 'pointer',

    ':hover': {
      backgroundColor: '#364150',
      color: '#ffffff',
    },
    ':active': {
      backgroundColor: '#364150',
      color: '#ffffff',
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#4A5568',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#ffffff',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: '#ffffff',
    ':hover': {
      backgroundColor: '#1F2C37',
      color: '#ffffff',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#4A5568',
  }),
  noOptionsMessage: (provided: any) => ({
    ...provided,
    color: '#fff',
  }),
  indicatorContainer: (provided: any) => ({
    ...provided,
    color: '#fff',

    ':hover': {
      color: 'rgb(79 70 229)',
    },
  }),
};

function MultiSelect({
  creatable,
  defaultValue,
  onChange,
  options,
  ...props
}: {
  creatable: boolean;
  defaultValue?: { value: string; label: string }[];
  onChange: (data: any) => void;
  options: { value: string; label: string }[];
}) {
  if (creatable)
    return (
      <CreatableSelect
        isMulti
        styles={customStyles}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        {...props}
      />
    );

  return (
    <Select
      isMulti
      styles={customStyles}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      {...props}
    />
  );
}

export default MultiSelect;
