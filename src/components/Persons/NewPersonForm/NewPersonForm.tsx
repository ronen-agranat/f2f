import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory, useParams } from 'react-router-dom';

import styles from './NewPersonForm.module.css';
import FaceToFace from '../../../services/FaceToFace';
import { AxiosError, AxiosResponse } from 'axios';
import { Person } from '../../../interfaces/person.interface';

interface INewPersonFormValues {
  name?: string | undefined;
  role?: string | undefined;
  phone?: string | undefined;
  team?: string | undefined;
}

interface INewPersonFormErrors {
  name?: string | undefined;
  role?: string | undefined;
  phone?: string | undefined;
  team?: string | undefined;
}

interface IPersonParams {
  id?: string | undefined;
}

const NewPersonForm = () => {
  let history = useHistory();
  const params = useParams<IPersonParams>();

  const editMode = Boolean(params.id);

  const personId = Number(params.id);
  const [person, setPersonState] = useState<Person>({
    id: -1,
    name: '',
    role: '',
    imageUrl: '',
    phone: '',
    team: '',
  });
  const [personLoaded, setPersonLoaded] = useState(false);

  useEffect(() => {
    if (editMode && !personLoaded) {
      FaceToFace.get(`/persons/${personId}`)
        .then((response: AxiosResponse<Person>) => {
          setPersonState(response.data);
          setPersonLoaded(true);
        })
        .catch((error: AxiosError) => {
          console.error('Something went wrong with fetching data', error);
        });
    }
  }, [personLoaded, personId, editMode]);

  return (
    <div className={styles.NewPersonForm}>
      {/* TODO show loading message */}
      {editMode && !personLoaded ? null :
        <Formik
          initialValues={{
            name: person.name,
            role: person.role,
            imageUrl: person.imageUrl,
            phone: person.phone,
            team: person.team,
          }}
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
            // POST /people        -- if adding new person
            // PUT  /people/:id    -- if editing existing person
            const submitMethod = editMode ? FaceToFace.put : FaceToFace.post;
            const path = editMode ? `/persons/${person.id}` : `/persons/`;
            submitMethod(path, {
              // TODO: Need to touch every time adding new fields; not DRY
              name: values.name,
              role: values.role,
              phone: values.phone,
              team: values.team,
              imageUrl: 'https://picsum.photos/200/300',
            })
              .then((response: AxiosResponse) => {
                console.log('Got create person response', response);
                // TODO Check id of added person and navigate there
                setSubmitting(false);
                history.push('/persons/');
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
                {editMode ? `Edit ${person.name}` : 'Add new person'}
              </h2>
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
                  {/*TODO div cannot appear within p*/}
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
                <p>
                  <label htmlFor="phone">
                    <span>Phone:&nbsp;</span>
                  </label>
                  <Field name="phone"/>
                  <ErrorMessage name="phone" component="div"/>
                </p>
                <p>
                  <label htmlFor="team">
                    <span>Team:&nbsp;</span>
                  </label>
                  <Field name="team"/>
                  <ErrorMessage name="team" component="div"/>
                </p>
              </section>
              <div>
                <button type="submit" disabled={isSubmitting}>
                  {editMode ? 'Update person' : 'Add person'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      }
    </div>
  );
};

export default NewPersonForm;
