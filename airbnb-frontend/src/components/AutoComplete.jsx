import { useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import useOutsideClick from "../hooks/useOutsideClick";

export const AutoComplete = ({ values, handleClick, display, setDisplay }) => {
  const autoCompleteRef = useRef();
  useOutsideClick(autoCompleteRef,setDisplay);
  return (
    <div ref={autoCompleteRef} className={display ? "autocomplete" : "hidden"}>
      {values.map((value) => {
        return (
          <button
            onClick={() => handleClick(value.address)}
            className="autocomplete-value"
            key={value._id}
          >
            <div>
              <FaLocationDot />
              <p>{value.address}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
