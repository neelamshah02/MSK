import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { Loader } from '@sdir/sds';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { setAdditionalCompetence } from '../../../store/actions/action';
import { FormInput, Navigation } from '../../Molecules';
import { SystemState, PersonDetails, AdditionalCompetence } from '../../../types';
import { apiUrls } from '../../../services/ApiService';
import ApiServiceContext from '../../../services/contexts/ApiServiceContext';
import { ErrorMessageDiv, PageTitle } from '../../Atoms';

const AdditionalCompetencePersonPage: React.FC<RouteComponentProps> = ({ history }) => {
  const { apiService } = useContext(ApiServiceContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const intl = useIntl();
  const dispatch = useDispatch();
  const {
    appState: { additionalCompetence }
  } = useSelector((state: SystemState) => state);

  const initialValues = {
    personNumber: additionalCompetence.person?.personNumber || '',
    firstName: additionalCompetence.person?.firstName || '',
    lastName: additionalCompetence.person?.lastName || ''
  };

  const handleNextClicked = useCallback(
    (values: PersonDetails) => {
      if (values.personNumber && values.firstName && values.lastName) {
        setLoading(true);
        apiService
          .get(apiUrls.externalLookup(values.personNumber, values.firstName, values.lastName))
          .then((response: AxiosResponse) => {
            if (response.status >= 400 && response.status < 600)
              throw new Error(response.statusText);
            else return response.data;
          })
          .then((data: PersonDetails) => {
            setLoading(false);
            if (data.personNumber)
              dispatch(
                setAdditionalCompetence({
                  ...additionalCompetence,
                  person: {
                    personNumber: data.personNumber,
                    firstName: data.firstName,
                    middleName: data.middleName,
                    lastName: data.lastName
                  }
                } as AdditionalCompetence)
              );
          })
          .then(() => history.push('/registeradditionalcompetence/competence'))
          .catch((error: Error) => {
            console.error(error);
            dispatch(
              setAdditionalCompetence({
                ...additionalCompetence,
                person: {
                  personNumber: values.personNumber,
                  firstName: values.firstName,
                  middleName: values.middleName,
                  lastName: values.lastName
                }
              } as AdditionalCompetence)
            );
            setErrorMsg(error.message);
            setLoading(false);
          });
      }
    },
    [history, dispatch, additionalCompetence, apiService]
  );

  const validateAdditionalCompetencePerson = useCallback((values: PersonDetails) => {
    const requiredText = 'Requied Field';
    const errors: any = {};
    if (!values.personNumber) errors.personNumber = requiredText;
    if (!values.firstName) errors.firstName = requiredText;
    if (!values.lastName) errors.lastName = requiredText;
    return errors;
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <PageTitle title={intl.formatMessage({ id: 'registeradditionalcompetence.page.title' })} />

      <H1>{intl.formatMessage({ id: 'registeradditionalcompetence.header.title' })}</H1>
      <Formik
        initialValues={initialValues}
        validate={validateAdditionalCompetencePerson}
        onSubmit={handleNextClicked}
      >
        <Form>
          <ParticipantSection>
            <Field
              name="personNumber"
              label={intl.formatMessage({
                id: 'registeradditionalcompetence.input.personnumber'
              })}
              type="number"
              component={FormInput}
            />
            <Field
              name="firstName"
              label={intl.formatMessage({
                id: 'registeradditionalcompetence.input.firstname'
              })}
              type="text"
              component={FormInput}
            />
            <Field
              name="lastName"
              label={intl.formatMessage({
                id: 'registeradditionalcompetence.input.lastname'
              })}
              type="text"
              component={FormInput}
            />
          </ParticipantSection>
          {errorMsg && (
            <ErrorMessageDiv
              errorMsg={intl.formatMessage({ id: 'reportseagoing.error.message' })}
            />
          )}
          <NavigationBlock>
            <Navigation
              backButtonText={intl.formatMessage({ id: 'link.back.title' })}
              nextButtonText={intl.formatMessage({ id: 'button.next.title' })}
              backButtonLink="/"
            />
          </NavigationBlock>
        </Form>
      </Formik>
    </Container>
  );
};

export default AdditionalCompetencePersonPage;

const Container = styled.div`
  margin: 3rem 4rem;
`;

const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3.5rem;
  margin-bottom: 3rem;
`;

const ParticipantSection = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 300px;
  grid-column-gap: 3rem;
  @media screen and (max-width: ${({ theme }) => theme.screen.medium}) {
    grid-template-columns: 1fr;
    width: 100%;
  }
  @media screen and (max-width: ${({ theme }) => theme.screen.small}) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const NavigationBlock = styled.div`
  width: 80%;
  @media screen and (max-width: ${({ theme }) => theme.screen.medium}) {
    width: 100%;
  }
  @media screen and (max-width: ${({ theme }) => theme.screen.small}) {
    width: 100%;
  }
`;
