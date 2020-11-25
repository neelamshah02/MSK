import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { DataCard, Button } from '@sdir/sds';
import styled from 'styled-components';
import { SystemState } from '../../../types';
import { PageTitle } from '../../Atoms';

const SeagoingConfirmation: React.FC = () => {
  const intl = useIntl();
  const {
    appState: { seagoingPerson }
  } = useSelector((state: SystemState) => state);

  // Insert vessel name here
  const vesselName = 'MS Stavanger';

  const seagoingPersonName = `${seagoingPerson.firstName} ${seagoingPerson.lastName}`;

  return (
    <Container>
      <PageTitle title={intl.formatMessage({ id: 'datacard.seagoing.title' })} />
      <H1>{intl.formatMessage({ id: 'reportseagoing.header.title' })}</H1>
      <TableContainer>
        <DataCard title={intl.formatMessage({ id: 'reportseagoing.cardheader.title' })}>
          <CardContent>
            <FormattedMessage
              id="reportseagoing.confirmation.text"
              values={{
                name: seagoingPersonName,
                vessel: vesselName
              }}
            />
          </CardContent>
        </DataCard>
      </TableContainer>
      <NavigationContainer>
        <Link to="/registerseagoing/person">
          <Button
            type="primary"
            text={intl.formatMessage({ id: 'reportseagoing.addnew.button.title' })}
          />
        </Link>
      </NavigationContainer>
    </Container>
  );
};

export default SeagoingConfirmation;

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
