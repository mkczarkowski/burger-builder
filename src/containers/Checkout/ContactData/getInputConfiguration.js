const getInputConfiguration = (
  inputType,
  attributes,
  validation = {},
  value = "",
) => {
  return {
    inputType,
    attributes,
    validation,
    value,
    isValid: false,
    touched: false
  };
};

export default getInputConfiguration;
