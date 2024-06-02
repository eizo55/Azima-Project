import { useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";

import "../Styles/dropdown.css";

const Dropdown = ({
  label,
  list,
  multiSelect = false,
  onChange,
  value = [],
}) => {
  /*   const [selectedOption, setSelectedOption] = useState(
    list ? list[0].name : ""
  );

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
 */
  const colourStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      color: "white",
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        color: isSelected ? "white" : "rgb(86, 17, 113)",
      };
    },
  };

  return (
    <div className="dropdown-container">
      <label htmlFor="dropdown">{label}</label>
      <Select
        className="dropdown"
        id="dropdown"
        value={value && value?.length > 0 ? value.map((val) => val) : []}
        name={label}
        options={list}
        isMulti={multiSelect}
        styles={colourStyles}
        onChange={onChange}
      />
      {/*   <select
        className="dropdown"
        id="dropdown"
        value={selectedOption}
        onChange={handleDropdownChange}
        multiple={multiSelect}
      >
        {list &&
          list.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
      </select> */}
    </div>
  );
};

export default Dropdown;
