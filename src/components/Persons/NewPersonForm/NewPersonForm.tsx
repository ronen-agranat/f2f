import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';

import styles from './NewPersonForm.module.css';
import FaceToFace from '../../../services/FaceToFace';
import { AxiosError, AxiosResponse } from 'axios';

interface INewPersonFormValues {
  name?: string | undefined;
  role?: string | undefined;
}

interface INewPersonFormErrors {
  name?: string | undefined;
  role?: string | undefined;
}

const NewPersonForm = () => {
  let history = useHistory();
  return (
    <div className={styles.NewPersonForm}>
      <Formik
        initialValues={{ name: '', role: '', imageUrl: '' }}
        validate={(values: INewPersonFormValues): INewPersonFormErrors => {
          const errors: INewPersonFormErrors = {};
          if (!values.name) {
            errors.name = 'Name is required';
          }
          if (!values.role) {
            errors.role = 'Role is required';
          }

          return errors;
        }}
        onSubmit={(values: INewPersonFormValues, { setSubmitting }) => {
          FaceToFace.post('persons', {
            name: values.name,
            role: values.role,
            imageUrl: 'https://picsum.photos/200/300',
          })
            .then((response: AxiosResponse) => {
              console.log('Got create person response', response);
              history.push('/persons');
              setSubmitting(false);
            })
            .catch((error: AxiosError) => {
              console.error('Something went wrong creating person', error);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2>Add new person</h2>
            <p>
              Required fields are followed by{' '}
              <strong>
                <abbr title="required">*</abbr>
              </strong>
              .
            </p>
            <section>
              <h3>Basic information</h3>
              <p>
                <label htmlFor="name">
                  <span>Name:&nbsp;</span>
                  <strong>
                    <abbr title="required">*</abbr>&nbsp;
                  </strong>
                </label>
                <Field name="name"/>
                <ErrorMessage name="name" component="div"/>
              </p>
              <p>
                <label htmlFor="role">
                  <span>Role:&nbsp;</span>
                  <strong>
                    <abbr title="required">*</abbr>&nbsp;
                  </strong>
                </label>
                <Field name="role"/>
                <ErrorMessage name="role" component="div"/>
              </p>
            </section>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Add person
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPersonForm;
