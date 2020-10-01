import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

import TextInput from '../../formComponents/TextInput';
import StyledButton from '../../commonComponents/Button';

const LoginPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  max-width: 300px;
  padding: 30px;
  box-shadow: 0px 0px 18px -6px rgba(0, 0, 0, 0.75);
  width: 100%;
  border-radius: 25px;
`;

const Login = () => {
  const initialLoginValues = {
    email: '',
    password: '',
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email not valid.')
      .required('This field is required.'),
    password: Yup.string()
      .min(8, 'Your password must be at least 8 characteres.')
      .required('This field is required.'),
  });

  const loginSubmit = (values) => {
    console.log(values);
  };

  return (
    <LoginPageWrapper>
      <FormWrapper>
        <Formik
          initialValues={initialLoginValues}
          onSubmit={loginSubmit}
          validationSchema={loginSchema}
        >
          <Form>
            <TextInput label='Your email' name='email' type='email' />
            <TextInput label='Your password' name='password' type='password' />
            <StyledButton type='submit' fullWidth>
              Login
            </StyledButton>
          </Form>
        </Formik>
      </FormWrapper>
    </LoginPageWrapper>
  );
};

export default Login;
