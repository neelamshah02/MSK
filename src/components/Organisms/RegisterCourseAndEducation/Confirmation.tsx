import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { DataCard, Button } from '@sdir/sds';
import styled, { ThemeContext } from 'styled-components';
import { useSelector } from 'react-redux';
import { SystemState } from '../../../types';

const SeagoingConfirmation: React.FC = () => {
  const intl = useIntl();
  const {
    appState: { courseAndEducation }
  } = useSelector((state: SystemState) => state);
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <H1>{intl.formatMessage({ id: 'reportseagoing.header.title' })}</H1>
      <TableContainer>
        <DataCard title={intl.formatMessage({ id: 'reportseagoing.cardheader.title' })}>
          <CardContent>
            <FormattedMessage
              id="reportcourceandeducation.confirmation.text"
              values={{
                participants: courseAndEducation.participants?.length,
                course: courseAndEducation.course.description
              }}
            />
          </CardContent>
        </DataCard>
      </TableContainer>
      <NavigationContainer>
        <Link to="/reportcourseandeducation/course">
          <Button
            type="primary"
            text={intl.formatMessage({ id: 'reportseagoing.addnew.button.title' })}
            color={theme.colors.backgroud.secondary}
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
  background: ${({ theme }) => theme.colors.backgroud.secondary};
  border-radius: 6px;
  display: block;
`;

const NavigationContainer = styled.div`
  width: 60%;
  position: relative;
  text-align: right;
`;
