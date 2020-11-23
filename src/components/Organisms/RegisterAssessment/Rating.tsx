import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Navigation } from '../../Molecules';
import { SystemState } from '../../../types';

const SeagoingTime: React.FC<RouteComponentProps> = ({ history }) => {
  const intl = useIntl();

  const {
    appState: { assessmentDetails }
  } = useSelector((state: SystemState) => state);

  const submitAssessment = useCallback(() => history.push('/registerassessor/confirmation'), [
    history
  ]);

  // eslint-disable-next-line max-len
  const PersonDetails = `${assessmentDetails.person?.firstName} ${assessmentDetails.person?.lastName} - ${assessmentDetails.person?.personNumber}`;
  return (
    <Container>
      <H1>{intl.formatMessage({ id: 'assessment.heading' })}</H1>
      {PersonDetails}
      <NavigationBlock>
        <Navigation
          backButtonText={intl.formatMessage({ id: 'link.back.title' })}
          nextButtonText={intl.formatMessage({ id: 'button.next.title' })}
          backButtonLink="/registerassessor/person"
          nextButtonOnClick={() => submitAssessment()}
        />
      </NavigationBlock>
    </Container>
  );
};
export default SeagoingTime;

const Container = styled.div`
  margin: 3rem 4rem;
`;
const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3.5rem;
  margin-bottom: 3rem;
`;

const NavigationBlock = styled.div`
  width: 100%;
`;
