import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';

import FaceToFace from '../../services/FaceToFace';
import { AxiosError, AxiosResponse } from 'axios';

import styles from './CreateUserForm.module.css';

// TODO: Touchpoint for adding fields; not DRY
interface CreateUserFormValues {
  username?: string | undefined;
  password?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  imageUrl?: string | undefined;
  phone?: string | undefined;
}

// TODO: Touchpoint for adding fields; not DRY
interface CreateUserFormErrors {
  username?: string | undefined;
  password?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  imageUrl?: string | undefined;
  phone?: string | undefined;
}

export const CreateUserForm = () => {
  let history = useHistory();
  return (
    <div className={styles.CreateUserForm}>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validate={(values: CreateUserFormValues): CreateUserFormErrors => {
          const errors: CreateUserFormErrors = {};
          if (!values.username) {
            errors.username = 'Username is required';
          }
          if (!values.password) {
            errors.password = 'Password is required';
          }

          return errors;
        }}
        onSubmit={(values: CreateUserFormValues, { setSubmitting }) => {
          FaceToFace.post('/users', {
            username: values.username,
            password: values.password,
            name: values.name,
            email: values.email,
            imageUrl: values.imageUrl,
            phone: values.phone
          })
            .then((response: AxiosResponse) => {
              console.debug('Got create user response', response);
              // Tell Formik that we are done
              setSubmitting(false);
              // Navigate to root page
              history.push('/');
            })
            .catch((error: AxiosError) => {
              console.error('Something went wrong creating user', error);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2>
              {'Create new account'}
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
            <section>
              <h3>Personal information</h3>
              <p>
                <label htmlFor="name">
                  <span>Name:&nbsp;</span>
                  <strong>
                    <abbr title="required">*</abbr>&nbsp;
                      </strong>
                </label>
                <Field name="name" />
                {/*TODO div cannot appear within p*/}
                <ErrorMessage name="name" component="div" />
              </p>
              <p>
                <label htmlFor="email">
                  <span>Email:&nbsp;</span>
                  <strong>
                    <abbr title="required">*</abbr>&nbsp;
                  </strong>
                </label>
                <Field name="email"/>
                <ErrorMessage name="email" component="div" />
              </p>
              <p>
                <label htmlFor="phone">
                  <span>Phone:&nbsp;</span>
                </label>
                <Field name="phone"/>
                <ErrorMessage name="phone" component="div" />
              </p>
            </section>
            <div>
              <button type="submit" disabled={isSubmitting}>
                {'Create account'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
