const getInputConfiguration = (
  inputType,
  attributes,
  validation = {},
  value = ""
) => {
  return {
    inputType,
    attributes,
    validation,
    value,
    isValid: false,
    shouldValidate: Object.keys(validation).length > 0, // Check if there are any validation rules to validate against
    touched: false
  };
};

export default getInputConfiguration;
