import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useHistory, useParams } from 'react-router-dom';

import FaceToFace from '../../services/FaceToFace';
import { AxiosError, AxiosResponse } from 'axios';

import styles from './LoginForm.module.css';
import { UserContext } from '../../contexts/UserContext';

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

export const LoginForm = () => {
  let history = useHistory();

  const userContext = useContext(UserContext);

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
              // Most important part: extract and store bearer token into application state
              const bearerToken = response!.data!.accessToken;
              // TODO: How can setBearerToken be undefined?
              if (userContext.setBearerToken) {
                userContext.setBearerToken(bearerToken);
              }
              // Tell Formik that we are done
              setSubmitting(false);
              // Navigate to root page
              history.push('/');
            })
            .catch((error: AxiosError) => {
              console.error('Something went wrong creating person', error);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
