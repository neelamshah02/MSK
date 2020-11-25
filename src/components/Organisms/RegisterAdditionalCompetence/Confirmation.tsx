import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { DataCard, Button } from '@sdir/sds';
import styled from 'styled-components';
import { SystemState } from '../../../types';
import { PageTitle } from '../../Atoms';

const AdditionalCompetenceConfirmation: React.FC = () => {
  const intl = useIntl();
  const {
    appState: { additionalCompetence }
  } = useSelector((state: SystemState) => state);

  // Insert vessel name here
  const vesselName = additionalCompetence.vessel;

  const additionalCompetencePersonName = `${additionalCompetence.person?.firstName}  ${additionalCompetence.person?.lastName}`;

  return (
    <Container>
      <PageTitle title={intl.formatMessage({ id: 'registeradditionalcompetence.page.title' })} />
      <H1>{intl.formatMessage({ id: 'registeradditionalcompetence.header.title' })}</H1>
      <TableContainer>
        <DataCard
          title={intl.formatMessage({
            id: 'registeradditionalcompetence.confirmation.header.title'
          })}
        >
          <CardContent>
            <FormattedMessage
              id="registeradditionalcompetence.confirmation.text"
              values={{
                person: additionalCompetencePersonName,
                vessel: vesselName,
                competence: additionalCompetence.competenceCode
              }}
            />
          </CardContent>
        </DataCard>
      </TableContainer>
      <NavigationContainer>
        <Link to="/registeradditionalcompetence/person">
          <Button
            type="primary"
            text={intl.formatMessage({ id: 'registeradditionalcompetence.addnew.button.title' })}
          />
        </Link>
      </NavigationContainer>
    </Container>
  );
};

export default AdditionalCompetenceConfirmation;

const Container = styled.div`
  margin: 3rem 4rem;
`;

const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3.5rem;
  margin-bottom: 3rem;
`;

const TableContainer = styled.div`
  width: 60%;
`;

const CardContent = styled.div`
  padding: 2em;
  background: white;
  border-radius: 6px;
  display: block;
`;

const NavigationContainer = styled.div`
  width: 60%;
  position: relative;
  text-align: right;
`;
