import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useHistory } from 'react-router-dom';

import FaceToFace, { authResponseToAuthTokens } from '../../services/FaceToFace';
import { AxiosError, AxiosResponse } from 'axios';

import styles from './LoginForm.module.css';
import { setAuthTokens } from 'axios-jwt';

// TODO: Touchpoint for adding fields; not DRY
interface LoginFormValues {
  username?: string | undefined;
  password?: string | undefined;
}

// TODO: Touchpoint for adding fields; not DRY
interface LoginFormErrors {
  username?: string | undefined;
  password?: string | undefined;
}

interface ILoginFormProps {
  setIsAuthenticated: (arg0: boolean) => void;
}

export const LoginForm = (props: ILoginFormProps) => {
  let history = useHistory();

  const [error, setError] = useState('');

  return (
    <div className={styles.LoginForm}>
      {/* TODO show loading message */}
      {/* TODO Touchpoint for adding fields */}
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validate={(values: LoginFormValues): LoginFormErrors => {
          const errors: LoginFormErrors = {};
          if (!values.username) {
            errors.username = 'Username is required';
          }
          if (!values.password) {
            errors.password = 'Password is required';
          }

          return errors;
        }}
        onSubmit={(values: LoginFormValues, { setSubmitting }) => {
          FaceToFace.post('/auth/login', {
            // TODO: Need to touch every time adding new fields; not DRY
            username: values.username,
            password: values.password,
          })
            .then((response: AxiosResponse) => {
              // TODO: Bit of spaghetti code; can this all be moved into FaceToFace service client?

              setAuthTokens(authResponseToAuthTokens(response.data));

              // Tell Formik that we are done
              setSubmitting(false);

              props.setIsAuthenticated(true);

              // Navigate to root page
              history.push('/');
            })
            .catch((error: AxiosError) => {
              setError(`Network error while logging in: ${error.message}`);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            { Boolean(error) ? <p style={{color: 'red'}}>{error}</p> : null }
            <h2>
              {'Welcome! Please login to your account'}
            </h2>
            <p>
              Required fields are followed by{' '}
              <strong>
                <abbr title="required">*</abbr>
              </strong>
                  .
            </p>
            <section>
              <h3>Credentials</h3>
              <p>
                <label htmlFor="username">
                  <span>Username:&nbsp;</span>
                  <strong>
                    <abbr title="required">*</abbr>&nbsp;
                  </strong>
                </label>
                <Field name="username" />
                {/*TODO div cannot appear within p*/}
                <ErrorMessage name="username" component="div" />
              </p>
              <p>
                <label htmlFor="password">
                  <span>Password:&nbsp;</span>
                  <strong>
                    <abbr title="required">*</abbr>&nbsp;
                  </strong>
                </label>
                <Field name="password" type="password"/>
                <ErrorMessage name="password" component="div" />
              </p>
            </section>
            <div>
              <button type="submit" disabled={isSubmitting}>
                {'Login'}
              </button>

              <Link to={`/users/create`}>
                Create a new account
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
