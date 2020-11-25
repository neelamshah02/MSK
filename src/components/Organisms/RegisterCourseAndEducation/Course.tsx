/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { Input, SearchBar } from '@sdir/sds';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { setCourseAndEducation } from '../../../store/actions/action';
import { Navigation } from '../../Molecules';
import { SystemState, CourseAndEducation, CourseSearch } from '../../../types';
import ApiServiceContext from '../../../services/contexts/ApiServiceContext';
import { apiUrls } from '../../../services/ApiService';
import { ErrorMessageDiv, PageTitle } from '../../Atoms';

const ReportCourseAndEducation: React.FC<RouteComponentProps> = ({ history }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { apiService } = useContext(ApiServiceContext);
  const [searchResult, setSearchResult] = useState<CourseSearch[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const {
    appState: { courseAndEducation }
  } = useSelector((state: SystemState) => state);
  const handleNextClicked = useCallback(() => {
    history.push('/reportcourseandeducation/participants');
  }, [history]);
  const onSearchResultClick = useCallback(
    (value: string, allCourses: CourseSearch[]) => {
      const result = allCourses.find(i => {
        return i.description === value;
      });
      dispatch(
        setCourseAndEducation({
          ...courseAndEducation,
          course: result
        } as CourseAndEducation)
      );
    },
    [dispatch, courseAndEducation]
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
            setErrorMsg('');
          })
          .catch((error: Error) => {
            console.error(error);
            setSearchResult([]);
            setErrorMsg(error.message);
          });
      }
      return null;
    },
    [apiService]
  );

  return (
    <Container>
      <PageTitle title={intl.formatMessage({ id: 'reportCourse.page.title' })} />
      <H1>{intl.formatMessage({ id: 'reportcourceandeducation.header.title' })}</H1>
      <CourseAndEducationDetails>
        <CourseInput>
          <SearchBar
            placeholder="Søk i søknader"
            searchCallback={searchCall}
            value={courseAndEducation.course?.description}
            searchResults={
              searchResult.length > 0 ? searchResult.map(item => item.description) : []
            }
            onSearchResultClick={value => onSearchResultClick(value, searchResult)}
          />
        </CourseInput>
        {!courseAndEducation.date && (
          <label htmlFor="courseDate">
            {intl.formatMessage({ id: 'reportcourceandeducation.input.datecomplete' })}
          </label>
        )}
        <DateInput>
          <Input
            name="courseDate"
            type="date"
            label={intl.formatMessage({ id: 'reportcourceandeducation.input.datecomplete' })}
            id="courseDate"
            value={courseAndEducation.date}
            onChange={(e: any) => {
              dispatch(
                setCourseAndEducation({
                  ...courseAndEducation,
                  date: e.target.value
                } as CourseAndEducation)
              );
            }}
          />
        </DateInput>
      </CourseAndEducationDetails>
      {errorMsg && <ErrorMessageDiv errorMsg={intl.formatMessage({ id: 'error.noResult' })} />}
      <NavigationBlock>
        <Navigation
          backButtonText={intl.formatMessage({ id: 'link.back.title' })}
          nextButtonText={intl.formatMessage({ id: 'button.next.title' })}
          backButtonLink="/"
          nextButtonOnClick={() => {
            handleNextClicked();
          }}
          nextDisabled={
            courseAndEducation.course === undefined || courseAndEducation.date === undefined
          }
        />
      </NavigationBlock>
    </Container>
  );
};

export default ReportCourseAndEducation;

const Container = styled.div`
  margin: 3rem 4rem;
`;

const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3.5rem;
  margin-bottom: 3rem;
`;

const CourseAndEducationDetails = styled.div``;

const CourseInput = styled.div`
  width: 50%;
  margin-bottom: 3rem;
  @media screen and (max-width: ${({ theme }) => theme.screen.small}) {
    width: 100%;
  }
`;

const DateInput = styled.div`
  width: 300px;
  margin-bottom: 3rem;
  margin-top: 1rem;
  @media screen and (max-width: ${({ theme }) => theme.screen.small}) {
    width: 100%;
  }
`;

const NavigationBlock = styled.div`
  width: 80%;
`;
