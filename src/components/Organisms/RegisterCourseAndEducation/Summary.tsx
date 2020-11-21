import React, { useCallback, useState, useContext } from 'react';
import { DataCard, DataTable, Loader } from '@sdir/sds';
import { RouteComponentProps } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AxiosResponse } from 'axios';
import { SystemState } from '../../../types';
import { Navigation } from '../../Molecules';
import { CourseAndEducationHeader } from '../../../helpers/dummyData';
import { apiUrls } from '../../../services/ApiService';
import ApiServiceContext from '../../../services/contexts/ApiServiceContext';
import { ErrorMessageDiv } from '../../Atoms';
import { errorHandler } from '../../../helpers/FormHelper';

const CourseAndEducationSummary: React.FC<RouteComponentProps> = ({ history }) => {
  const intl = useIntl();
  const {
    appState: { courseAndEducation }
  } = useSelector((state: SystemState) => state);
  const { oidc } = useSelector((state: SystemState) => state);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { apiService } = useContext(ApiServiceContext);

  let data = [] as any;
  if (courseAndEducation.participants && courseAndEducation.participants.length > 0)
    data = courseAndEducation.participants.map(participant => {
      const name = `${participant.firstName} ${participant.lastName}`;
      const { personNumber } = participant;
      const { course, date } = courseAndEducation;
      return {
        name,
        course: course?.description,
        personNumber,
        date
      };
    });

  const sendCourseDetails = useCallback(() => {
    let org = '';
    if (typeof oidc.user?.profile?.organizationNumbers === 'string') {
      org = oidc.user?.profile?.organizationNumbers;
    }
    setLoading(true);
    const payload = courseAndEducation.participants.map(participant => {
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
    });
    apiService
      .post(apiUrls.reportCourses, payload)
      .then((response: AxiosResponse) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error(response.statusText);
        } else {
          history.push('/reportcourseandeducation/confirmation');
        }
      })
      .catch((e: Error) => {
        errorHandler(e, setErrorMsg, intl.formatMessage({ id: 'error.general' }));
      })
      .finally(() => setLoading(false));
  }, [history, apiService, oidc.user, courseAndEducation, intl]);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <H1>{intl.formatMessage({ id: 'reportcourceandeducation.header.title' })}</H1>
      <TableContainer>
        {data.length > 0 && (
          <DataCard
            onEditClicked={() => history.push('/reportcourseandeducation/participants')}
            editable
            title={intl.formatMessage({ id: 'reportcourceandeducation.summary.cardheader.title' })}
          >
            <DataTable columns={CourseAndEducationHeader} data={data} />
          </DataCard>
        )}
      </TableContainer>
      {errorMsg && <ErrorMessageDiv errorMsg={intl.formatMessage({ id: 'error.general' })} />}
      <NavigationBlock>
        <Navigation
          backButtonText={intl.formatMessage({ id: 'link.back.title' })}
          nextButtonText={intl.formatMessage({ id: 'button.send.title' })}
          backButtonLink="/reportcourseandeducation/participants"
          nextButtonOnClick={() => sendCourseDetails()}
        />
      </NavigationBlock>
    </Container>
  );
};

export default CourseAndEducationSummary;

const Container = styled.div`
  margin: 3rem 4rem;
`;

const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3.5rem;
  font-weight: 500;
  margin-bottom: 3rem;
`;

const NavigationBlock = styled.div`
  width: 80%;
`;

const TableContainer = styled.div`
  width: 80%;
`;
