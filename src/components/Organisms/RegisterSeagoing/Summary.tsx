import React, { useCallback, useState, useContext } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { DataCard, DataTable, Loader } from '@sdir/sds';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { SeagoingTableHeader } from '../../../helpers/dummyData';
import { Navigation } from '../../Molecules';
import { SystemState } from '../../../types';
import ApiServiceContext from '../../../services/contexts/ApiServiceContext';
import { apiUrls } from '../../../services/ApiService';
import { ErrorMessageDiv, PageTitle } from '../../Atoms';
import { errorHandler } from '../../../helpers/FormHelper';

const SeagoingSummary: React.FC<RouteComponentProps> = ({ history }) => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { oidc } = useSelector((state: SystemState) => state);

  const { apiService } = useContext(ApiServiceContext);
  const {
    appState: { seagoingPerson, seagoingDetails }
  } = useSelector((state: SystemState) => state);

  const sendSegoingDetails = useCallback(() => {
    let org = '';
    if (typeof oidc.user?.profile?.organizationNumbers === 'string') {
      org = oidc.user?.profile?.organizationNumbers;
    }
    const payload = seagoingDetails.map(item => {
      return {
        person: {
          id: seagoingPerson.personNumber,
          firstName: seagoingPerson.firstName,
          middleName: null,
          lastName: seagoingPerson.lastName
        },
        organization: {
          organizationNumber: org || oidc.user?.profile?.organizationNumbers[0]
        },
        vessel: {
          imoNumber: '8811209',
          callSign: 'LAUI',
          name: 'TJØTTA',
          id: '1123'
        },
        activity: {
          occupationCode: {
            code: item.occupation.code,
            description: item.occupation.description
          },
          hours: +item.hours,
          signOnDate: new Date(item.startDate),
          signOffDate: new Date(item.endDate)
        },
        optional: null
      };
    });
    setLoading(true);

    apiService
      .post(apiUrls.reportSeagoingBatch, payload)
      .then((response: AxiosResponse) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error(response.statusText);
        } else {
          history.push('/registerseagoing/confirmation');
        }
      })
      .catch((e: Error) => {
        errorHandler(e, setErrorMsg, intl.formatMessage({ id: 'error.general' }));
      })
      .finally(() => setLoading(false));
  }, [history, apiService, seagoingDetails, seagoingPerson, oidc, intl]);

  // eslint-disable-next-line max-len
  const SeagoingPersonDetails = `${seagoingPerson.firstName} ${seagoingPerson.lastName} - ${seagoingPerson.personNumber}`;
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <PageTitle title={intl.formatMessage({ id: 'datacard.seagoing.title' })} />
      <H1>{intl.formatMessage({ id: 'reportseagoing.header.title' })}</H1>
      <TableContainer>
        <DataCard
          onEditClicked={() => history.push('/registerseagoing/time')}
          editable
          title={SeagoingPersonDetails}
        >
          <DataTable columns={SeagoingTableHeader} data={seagoingDetails} />
        </DataCard>
      </TableContainer>
      {errorMsg && <ErrorMessageDiv errorMsg={errorMsg} />}
      <NavigationBlock>
        <Navigation
          backButtonText={intl.formatMessage({ id: 'link.back.title' })}
          nextButtonText={intl.formatMessage({ id: 'button.send.title' })}
          nextButtonOnClick={() => sendSegoingDetails()}
          backButtonLink="/registerseagoing/time"
        />
      </NavigationBlock>
    </Container>
  );
};

export default SeagoingSummary;

const Container = styled.div`
  margin: 3rem 4rem;
`;

const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3.5rem;
  margin-bottom: 3rem;
`;

const NavigationBlock = styled.div`
  width: 80%;
`;

const TableContainer = styled.div`
  width: 80%;
`;
