import React from "react";
import PropTypes from "prop-types";
import "./CustomButton.css";

const CustomButton = ({ text, type, onClick, disabled }) => {
  return (
    <button className={`custom-button ${type}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

// Define PropTypes for component props validation
CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["solid", "outline"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool, // Added disabled prop validation
};

// Default props
CustomButton.defaultProps = {
  type: "solid",
  onClick: () => {},
  disabled: false, // Default is false (button is enabled by default)
};

export default CustomButton;
