import React from "react";
import PropTypes from "prop-types";
import { default as ReactSelect } from "react-select";

const colorStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? 'hsl(0, 0%, 90%)' : 'transparent',
        color: '#000000',
        cursor: isDisabled ? 'not-allowed' : 'default',
        
      };
    },
    
  };
const MultiSelect = props => {
  if (props.allowSelectAll) {
    return (
      <ReactSelect
        {...props}
        options={[props.allOption, ...props.options]}
        onChange={(selected, event) => {
          if (selected !== null && selected.length > 0) {
            if (selected[selected.length - 1].value === props.allOption.value) {
                
              return props.onChange([props.allOption, ...props.options]);
            }
            let result = [];
            if (selected.length === props.options.length) {
              if (selected.includes(props.allOption)) {
                result = selected.filter(
                  option => option.value !== props.allOption.value
                );
              } else if (event.action === "select-option") {
                result = [props.allOption, ...props.options];
              }
              return props.onChange(result);
            }
          }

          return props.onChange(selected);
        }}
        styles={colorStyles}
        hideSelectedOptions = {props.hideSelectedOptions}
      />
    );
  }

  return <ReactSelect {...props} />;
};

MultiSelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })
};

MultiSelect.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*"
  }
};

export default MultiSelect;
