import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

const Input = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = true,
  className = "",
}) => {
  const sharedStyles =
    "focus:outline-none focus:shadow-outline-blue block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out focus:border-blue-300 sm:text-sm sm:leading-5";

  const commonProps = {
    disabled,
    placeholder,
    required,
    value,
    className: classnames(sharedStyles, className),
    onChange,
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label className="block text-sm font-medium leading-none text-gray-800">
          {label}
        </label>
      )}
      <div className="mt-1 rounded-md shadow-sm">
        {type === "textarea" ? (
          <textarea {...commonProps} />
        ) : (
          <input type={type} {...commonProps} />
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.node,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default Input;
