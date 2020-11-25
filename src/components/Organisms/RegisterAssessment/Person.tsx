import React, { useState, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { Loader } from '@sdir/sds';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { setAssessmentDetails } from '../../../store/actions/action';
import { Navigation, FormInput } from '../../Molecules';
import { SystemState, PersonDetails, AssessmentDetails } from '../../../types';
import { apiUrls } from '../../../services/ApiService';
import ApiServiceContext from '../../../services/contexts/ApiServiceContext';
import { ErrorMessageDiv, PageTitle } from '../../Atoms';

const ReportSeagoing: React.FC<RouteComponentProps> = ({ history }) => {
  const { apiService } = useContext(ApiServiceContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const intl = useIntl();
  const dispatch = useDispatch();
  const {
    appState: { assessmentDetails }
  } = useSelector((state: SystemState) => state);

  const initialValues = {
    personNumber: assessmentDetails.person?.personNumber || '',
    firstName: assessmentDetails.person?.firstName || '',
    lastName: assessmentDetails.person?.lastName || ''
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
                setAssessmentDetails({
                  ...assessmentDetails,
                  person: {
                    personNumber: data.personNumber,
                    firstName: data.firstName,
                    middleName: data.middleName,
                    lastName: data.lastName
                  }
                } as AssessmentDetails)
              );
          })
          .then(() => history.push('/registerassessor/rating'))
          .catch((error: Error) => {
            console.error(error);

            dispatch(
              setAssessmentDetails({
                ...assessmentDetails,
                person: {
                  personNumber: values.personNumber,
                  firstName: values.firstName,
                  lastName: values.lastName
                }
              } as AssessmentDetails)
            );
            setErrorMsg(error.message);
            setLoading(false);
          });
      }
    },
    [history, dispatch, assessmentDetails, apiService]
  );

  const validateGetPerson = useCallback((values: PersonDetails) => {
    const errors: any = {};
    const requiredText = 'Requied Field';
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

      <H1>{intl.formatMessage({ id: 'assessment.heading' })}</H1>
      <Formik
        initialValues={initialValues}
        validate={validateGetPerson}
        onSubmit={handleNextClicked}
      >
        {() => (
          <Form>
            <InputDiv>
              <Field
                name="personNumber"
                label={intl.formatMessage({
                  id: 'reportseagoing.input.personnumber'
                })}
                type="number"
                component={FormInput}
              />
              <Field
                name="firstName"
                label={intl.formatMessage({
                  id: 'reportseagoing.input.firstname'
                })}
                type="text"
                component={FormInput}
              />
              <Field
                name="lastName"
                label={intl.formatMessage({
                  id: 'reportseagoing.input.lastname'
                })}
                type="text"
                component={FormInput}
              />
            </InputDiv>
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
        )}
      </Formik>
    </Container>
  );
};

export default ReportSeagoing;

const Container = styled.div`
  margin: 3rem 4rem;
`;

const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3.5rem;
  margin-bottom: 3rem;
`;

const InputDiv = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 300px 100px;
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;
  @media screen and (max-width: ${({ theme }) => theme.screen.medium}) {
    grid-template-columns: 1fr;
    margin-top: 3rem;
    width: 100%;
  }
  @media screen and (max-width: ${({ theme }) => theme.screen.small}) {
    grid-template-columns: 1fr;
    margin-top: 3rem;
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
