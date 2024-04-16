import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

export function DateInput({ required, label, disabled, meta, ...inputProps }) {
  return (
    <FormControl
      isRequired={required}
      isDisabled={disabled}
      isInvalid={!!meta.error && meta.touched}
    >
      <FormLabel>{label}</FormLabel>
      <Input type="datetime-local" {...inputProps} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

DateInput.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};
