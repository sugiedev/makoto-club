import Select from "react-select";

export type Props = {
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
};

// interface CustomSelectProps {
//   options: SelectOptions;
// }

export const MultipleSelect = ({
  placeholder,
  options,
}: {
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
}) => {
  return (
    <Select
      options={options}
      placeholder={placeholder}
      isMulti
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
};
