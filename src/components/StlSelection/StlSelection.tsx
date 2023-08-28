import "./stlSelection.scss";
import { useEffect, useState } from "react";

type Options = {
  name: string;
  value: string;
  default?: boolean;
}[];

function StlSelection({
  className,
  options,
  onChange,
}: {
  className?: string;
  options: Options;
  onChange: Function;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    getDefaultOption(options)?.name || "select an option"
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: any) => {
    setSelectedValue(option.name);
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <div className={`custom-dropdown ${className}`}>
      <span className="selected-value" onClick={toggleDropdown}>
        {selectedValue}{" "}
        <img
          className="see_options"
          alt="see options"
          src="/icons/see_more.svg"
        />
      </span>
      {isOpen ? (
        <ul className="dropdown-options">
          {options.map((option: any, i: number) => (
            <li
              data-value={option.value}
              onClick={() => {
                handleOptionClick(option);
              }}
              key={i}
            >
              {option.name}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}

function getDefaultOption(options: Options) {
  return options.find((option) => option.default);
}

export default StlSelection;
