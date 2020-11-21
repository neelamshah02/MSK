/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useState, useContext } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { Form, Formik, FieldArray, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Input, Loader, SearchBar, styles, SdiAdd, SdiClose, SdiEdit } from '@sdir/sds';
import { AxiosResponse } from 'axios';
import { ErrorMessageDiv } from '../../Atoms';
import { setCourseAndEducation } from '../../../store/actions/action';
import { Navigation, ButtonWithLink, FormInput } from '../../Molecules';
import { CourseAndEducation, SystemState, PersonDetails } from '../../../types';
import { apiUrls } from '../../../services/ApiService';
import ApiServiceContext from '../../../services/contexts/ApiServiceContext';
import { errorHandler } from '../../../helpers/FormHelper';

interface CourseSearch {
  code: string;
  description: string;
  comment: string;
}

const CourseAndEducationRegistration: React.FC<RouteComponentProps> = ({ history }) => {
  const {
    appState: { courseAndEducation }
  } = useSelector((state: SystemState) => state);
  const { oidc } = useSelector((state: SystemState) => state);
  const [isEditDate, setIsEditDate] = useState(false);
  const [changeDateVal, setChangeDateVal] = useState('');
  const [isEditCourse, setIsEditCourse] = useState(false);
  const [searchResult, setSearchResult] = useState<CourseSearch[]>([]);

  const intl = useIntl();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const [resultError, setResultError] = useState('');

  const [loading, setLoading] = useState(false);
  const { apiService } = useContext(ApiServiceContext);

  const initialValues = () => {
    if (courseAndEducation.participants && courseAndEducation.participants.length > 0) {
      return { users: courseAndEducation.participants as PersonDetails[] };
    }
    return {
      users: [
        {
          personNumber: '',
          firstName: '',
          lastName: ''
        }
      ] as PersonDetails[]
    };
  };

  const handleNextClicked = useCallback(
    (values: any) => {
      if (
        values.users &&
        values.users[0].personNumber &&
        values.users[0].firstName &&
        values.users[0].lastName
      ) {
        setLoading(true);
        let org = '';
        if (typeof oidc.user?.profile?.organizationNumbers === 'string') {
          org = oidc.user?.profile?.organizationNumbers;
        }

        apiService
          .put(apiUrls.externalLookupList, values.users)
          .then((response: AxiosResponse) => {
            if (response.status >= 400 && response.status < 600)
              throw new Error(response.statusText);
            else return response.data;
          })
          .then((data: PersonDetails[]) => {
            if (data.length > 0)
              dispatch(
                setCourseAndEducation({
                  ...courseAndEducation,
                  participants: data
                })
              );
          })
          .then(() => {
            const payloadForPreValidationCall = courseAndEducation?.participants?.map(
              participant => {
                return {
                  identificationNumber: participant.personNumber,
                  completedAt: new Date(courseAndEducation.date),
                  lastName: participant.lastName,
                  course: {
                    educationCode: {
                      code: courseAndEducation.course?.code,
                      description: courseAndEducation.course?.description,
                      comment: ''
                    },
                    institution: {
                      organizationNumber: org || oidc.user?.profile?.organizationNumbers[0],
                      legalEntityId: 0,
                      name: '',
                      isActive: true,
                      courses: []
                    },
                    completedDate: new Date(courseAndEducation.date)
                  },
                  document: {}
                };
              }
            );
            apiService
              .post(apiUrls.validateCourse, payloadForPreValidationCall)
              .then((response: AxiosResponse) => {
                if (response.status >= 400 && response.status < 600)
                  throw new Error(response.statusText);

                setLoading(false);
              })
              .then(() => history.push('/reportcourseandeducation/summary'));
          })
          .catch((e: any) => {
            errorHandler(e, setErrorMsg, intl.formatMessage({ id: 'error.general' }));
            dispatch(
              setCourseAndEducation({
                ...courseAndEducation,
                participants: values.users
              })
            );
            setLoading(false);
          });
      }
    },
    [history, dispatch, courseAndEducation, apiService, oidc, intl]
  );

  const onSearchResultClick = useCallback(
    value => {
      const result = searchResult.find(i => {
        return i.description === value;
      });
      dispatch(
        setCourseAndEducation({
          ...courseAndEducation,
          course: result
        } as CourseAndEducation)
      );
      setIsEditCourse(!isEditCourse);
    },
    [dispatch, courseAndEducation, isEditCourse, searchResult]
  );

  const searchCall = useCallback(
    async (value: string) => {
      if (value.length > 2) {
        return apiService
          .get(apiUrls.courseSearch(value))
          .then((response: AxiosResponse) => {
            if (response.status >= 400 && response.status < 600) {
              setSearchResult([]);
              throw new Error(response.statusText);
            } else return response.data;
          })
          .then((data: CourseSearch[]) => {
            if (data.length > 0) setSearchResult(data);
            setResultError('');
          })
          .catch((error: Error) => {
            console.error(error);
            setSearchResult([]);
            setResultError(error.message);
          });
      }
      return null;
    },
    [apiService]
  );
  const changeDate = useCallback(
    (val?: string) => {
      dispatch(
        setCourseAndEducation({
          ...courseAndEducation,
          date: val || changeDateVal
        } as CourseAndEducation)
      );
      setIsEditDate(!isEditDate);
    },
    [courseAndEducation, isEditDate, dispatch, changeDateVal]
  );

  const changeCourse = useCallback(() => {
    setIsEditCourse(!isEditCourse);
  }, [isEditCourse]);

  const validateParticipants = useCallback((values: any) => {
    const requiredText = 'Requied Field';
    const errors: any = {
      users: []
    };

    values.users.forEach(item => {
      const err: any = {};
      if (!item.personNumber) err.personNumber = requiredText;
      if (!item.firstName) err.firstName = requiredText;
      if (!item.lastName) err.lastName = requiredText;
      errors.users.push(err);
    });

    return errors;
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <H1>{intl.formatMessage({ id: 'reportcourceandeducation.header.title' })}</H1>
      <Card>
        <Header>{intl.formatMessage({ id: 'reportcourceandeducation.card.course.title' })}</Header>
        <LinkAndButton>
          {isEditCourse ? (
            <SearchBar
              placeholder="Søk i søknader"
              searchCallback={searchCall}
              value={courseAndEducation.course?.description}
              searchResults={
                searchResult.length > 0 ? searchResult.map(item => item.description) : []
              }
              onSearchResultClick={value => onSearchResultClick(value)}
            />
          ) : (
            <Info>{courseAndEducation.course?.description}</Info>
          )}
          <ButtonWithLink
            icon={
              isEditCourse ? (
                <SdiClose
                  color={styles.colors.primary}
                  size="l"
                  style={{ width: '2rem', height: '2rem' }}
                />
              ) : (
                <SdiEdit
                  color={styles.colors.primary}
                  size="l"
                  style={{ width: '2rem', height: '2rem' }}
                />
              )
            }
            linkType="button"
            linkText={
              isEditCourse
                ? intl.formatMessage({ id: 'reportcourceandeducation.card.save' })
                : intl.formatMessage({ id: 'reportcourceandeducation.card.change' })
            }
            handleCallback={() => changeCourse()}
          />
        </LinkAndButton>

        <Header>{intl.formatMessage({ id: 'reportcourceandeducation.card.date.title' })}</Header>

        <LinkAndButton>
          {isEditDate ? (
            <Input
              name="dateChange"
              label={intl.formatMessage({
                id: 'reportcourceandeducation.input.datecomplete'
              })}
              type="date"
              id="dateChange"
              onChange={e => {
                setChangeDateVal(e.target.value);
                changeDate(e.target.value);
              }}
            />
          ) : (
            <Info>{courseAndEducation.date}</Info>
          )}
          <ButtonWithLink
            icon={
              isEditDate ? (
                <SdiClose
                  color={styles.colors.primary}
                  size="l"
                  style={{ width: '2rem', height: '2rem' }}
                />
              ) : (
                <SdiEdit
                  color={styles.colors.primary}
                  size="l"
                  style={{ width: '2rem', height: '2rem' }}
                />
              )
            }
            linkType="button"
            linkText={
              isEditDate
                ? intl.formatMessage({ id: 'reportcourceandeducation.card.save' })
                : intl.formatMessage({ id: 'reportcourceandeducation.card.change' })
            }
            handleCallback={() => changeDate()}
          />
        </LinkAndButton>
      </Card>
      <Formik
        initialValues={initialValues()}
        onSubmit={handleNextClicked}
        validate={validateParticipants}
      >
        {({ values }) => {
          return (
            <Form>
              <FieldArray
                name="users"
                render={({ remove, push }) => (
                  <div>
                    {values.users.length > 0 &&
                      values.users.map((i, k) => (
                        <div className="row" key={i.personNumber + k}>
                          <InputDiv>
                            <Field
                              name={`users.${k}.personNumber`}
                              label={intl.formatMessage({
                                id: 'reportseagoing.input.personnumber'
                              })}
                              type="text"
                              component={FormInput}
                            />
                            <Field
                              name={`users.${k}.firstName`}
                              label={intl.formatMessage({
                                id: 'reportseagoing.input.firstname'
                              })}
                              type="text"
                              component={FormInput}
                            />
                            <Field
                              name={`users.${k}.lastName`}
                              label={intl.formatMessage({
                                id: 'reportseagoing.input.lastname'
                              })}
                              type="text"
                              component={FormInput}
                            />
                            {values.users.length > 1 && (
                              <RemoveButton type="button" onClick={() => remove(k)}>
                                X
                              </RemoveButton>
                            )}
                          </InputDiv>
                        </div>
                      ))}
                    <ButtonWithLink
                      icon={
                        <SdiAdd
                          color={styles.colors.primary}
                          size="l"
                          style={{ width: '2rem', height: '2rem' }}
                        />
                      }
                      linkType="button"
                      handleCallback={() => push({ personNumber: '', firstName: '', lastName: '' })}
                      linkText={intl.formatMessage({
                        id: 'reportcourceandeducation.button.addmore.title'
                      })}
                    />
                  </div>
                )}
              />
              {errorMsg && (
                <ErrorMessageDiv
                  errorMsg={intl.formatMessage({ id: 'reportseagoing.error.message' })}
                />
              )}
              {resultError && (
                <ErrorMessageDiv errorMsg={intl.formatMessage({ id: 'error.noResult' })} />
              )}
              <NavigationBlock>
                <Navigation
                  backButtonText={intl.formatMessage({ id: 'link.back.title' })}
                  nextButtonText={intl.formatMessage({ id: 'button.next.title' })}
                  backButtonLink="/reportcourseandeducation/course"
                  nextButtonOnClick={() => handleNextClicked(values)}
                />
              </NavigationBlock>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
export default CourseAndEducationRegistration;

const Container = styled.div`
  margin: 3rem 4rem;
`;

const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3.5rem;
  margin-bottom: 3rem;
`;

const Card = styled.section`
  padding: 3rem;
  width: fit-content;
  min-width: 60rem;
  box-shadow: ${({ theme }) => theme.card.boxShadow};
  border-radius: ${({ theme }) => theme.card.borderRadius};
  margin-bottom: ${({ theme }) => theme.card.marginBottom};
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const Header = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.font.textlight};
  margin-bottom: 0.5rem;
`;

const Info = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.font.text};
  margin-right: 2rem;
`;

const LinkAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  height: calc(1.5em + 2px);
  margin: 0 0 4rem 0;
`;

const NavigationBlock = styled.div`
  width: 80%;
`;
const RemoveButton = styled.button`
  height: 3rem;
  width: 3rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.alert.errorHot};
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
