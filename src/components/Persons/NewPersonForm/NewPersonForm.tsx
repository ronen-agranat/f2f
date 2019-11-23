import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import styles from './NewPersonForm.module.css';

interface INewPersonFormValues {
  name?: string | undefined;
}

interface INewPersonFormErrors {
  name?: string | undefined;
}

const NewPersonForm = () => {
  return <div className={styles.NewPersonForm}>
    <Formik
      initialValues={{ name: '', role: '', imageUrl: '' }}
      validate={(values: INewPersonFormValues): INewPersonFormErrors => {
        const errors: INewPersonFormErrors = {};
        if (!values.name) {
          errors.name = 'Name is required';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h1>New person form</h1>
          <label>Name</label>
          <Field type="name" name="name"/>
          <ErrorMessage name="name" component="div"/>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>;
};

export default NewPersonForm;
