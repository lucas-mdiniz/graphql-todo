import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const FieldWrapper = styled.div`
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  min-height: 40px;
  border: 1px solid #bcbcbc;
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
  display: block;
  width: 100%;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  display: block;
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: #980000;
  background: #ffd3d3;
  padding: 5px;
  border-radius: 5px;
  margin-top: 10px;
`;

const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <FieldWrapper>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </FieldWrapper>
  );
};

export default TextInput;
