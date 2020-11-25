import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { SdiClose, SdiEdit, styles, DataCard, Loader, Input } from '@sdir/sds';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { setAdditionalCompetence } from '../../../store/actions/action';
import { SystemState, AdditionalCompetence } from '../../../types';
import { Navigation, ButtonWithLink } from '../../Molecules';
import { PageTitle } from '../../Atoms';

const AdditionalCompetenceSummary: React.FC<RouteComponentProps> = ({ history }) => {
  const intl = useIntl();
  const [loading] = useState(false);
  const dispatch = useDispatch();
  const {
    appState: { additionalCompetence }
  } = useSelector((state: SystemState) => state);

  const [isEditAdditionalCompetence, setIsEditAdditionalCompetence] = useState(false);
  const [isEditVessel, setIsEditVessel] = useState(false);
  const [isEditStartDate, setIsEditStartDate] = useState(false);
  const [isEditStopDate, setIsEditStopDate] = useState(false);

  const [changeCompetenceVal, setChangeCompetenceVal] = useState('');
  const [changeVesselVal, setChangeVesselVal] = useState('');
  const [changePeriodStartVal, setChangePeriodStartVal] = useState('');
  const [changePeriodStopVal, setChangePeriodStoptVal] = useState('');

  const changeCompetence = useCallback(
    (val?: string) => {
      dispatch(
        setAdditionalCompetence({
          ...additionalCompetence,
          competenceCode: val || changeCompetenceVal
        } as AdditionalCompetence)
      );
    },
    [additionalCompetence, dispatch, changeCompetenceVal]
  );
  const changeVessel = useCallback(
    (val?: string) => {
      dispatch(
        setAdditionalCompetence({
          ...additionalCompetence,
          vessel: val || changeVesselVal
        } as AdditionalCompetence)
      );
    },
    [additionalCompetence, dispatch, changeVesselVal]
  );
  const changePeriodStart = useCallback(
    (val?: string) => {
      dispatch(
        setAdditionalCompetence({
          ...additionalCompetence,
          periodStartDate: val || changePeriodStartVal
        } as AdditionalCompetence)
      );
    },
    [additionalCompetence, dispatch, changePeriodStartVal]
  );
  const changePeriodStop = useCallback(
    (val?: string) => {
      dispatch(
        setAdditionalCompetence({
          ...additionalCompetence,
          periodStopDate: val || changePeriodStopVal
        } as AdditionalCompetence)
      );
    },
    [additionalCompetence, dispatch, changePeriodStopVal]
  );

  const handleEditClicked = (val: string) => {
    switch (val) {
      case 'competence':
        changeCompetence();
        setIsEditAdditionalCompetence(!isEditAdditionalCompetence);
        break;
      case 'vessel':
        setIsEditVessel(!isEditVessel);
        break;
      case 'startDate':
        changePeriodStart();
        setIsEditStartDate(!isEditStartDate);
        break;
      case 'endDate':
        changePeriodStop();
        setIsEditStopDate(!isEditStopDate);
        break;
      default:
        console.warn('Invalid input');
    }
  };

  const handleNextClicked = useCallback(() => {
    history.push('/registeradditionalcompetence/confirmation');
  }, [history]);

  // eslint-disable-next-line max-len
  const AdditionalCompetencePersonDetails = `${additionalCompetence.person?.firstName} ${additionalCompetence.person?.lastName} - ${additionalCompetence.person?.personNumber}`;

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <PageTitle title={intl.formatMessage({ id: 'registeradditionalcompetence.page.title' })} />

      <H1>{intl.formatMessage({ id: 'registeradditionalcompetence.header.title' })}</H1>
      <CardContainer>
        <DataCard title={AdditionalCompetencePersonDetails}>
          <CardContent>
            <Header>
              {/* Competence */}
              {intl.formatMessage({ id: 'registeradditionalcompetence.card.competence.title' })}
            </Header>
            <LinkAndButton>
              {isEditAdditionalCompetence ? (
                <Input
                  name="competenceChange"
                  label={intl.formatMessage({
                    id: 'registeradditionalcompetence.input.competence'
                  })}
                  type="text"
                  id="competenceChange"
                  onChange={e => {
                    setChangeCompetenceVal(e.target.value);
                    changeCompetence(e.target.value);
                  }}
                />
              ) : (
                <Info>{additionalCompetence.competenceCode}</Info>
              )}
              <ButtonWithLink
                icon={
                  isEditAdditionalCompetence ? (
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
                  isEditAdditionalCompetence
                    ? intl.formatMessage({ id: 'registeradditionalcompetence.card.save' })
                    : intl.formatMessage({ id: 'registeradditionalcompetence.card.change' })
                }
                handleCallback={() => handleEditClicked('competence')}
              />
            </LinkAndButton>

            <Header>
              {/* Vessel */}
              {intl.formatMessage({ id: 'registeradditionalcompetence.card.vessel.title' })}
            </Header>
            <LinkAndButton>
              {isEditVessel ? (
                <Input
                  name="vesselChange"
                  label={intl.formatMessage({
                    id: 'registeradditionalcompetence.card.vessel.title'
                  })}
                  type="text"
                  id="vesselChange"
                  onChange={e => {
                    setChangeVesselVal(e.target.value);
                    changeVessel(e.target.value);
                  }}
                />
              ) : (
                <Info>{additionalCompetence.vessel}</Info>
              )}
              <ButtonWithLink
                icon={
                  isEditVessel ? (
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
                  isEditVessel
                    ? intl.formatMessage({ id: 'registeradditionalcompetence.card.save' })
                    : intl.formatMessage({ id: 'registeradditionalcompetence.card.change' })
                }
                handleCallback={() => handleEditClicked('vessel')}
              />
            </LinkAndButton>
            <Header>
              {/* From date */}
              {intl.formatMessage({ id: 'registeradditionalcompetence.card.fromdate.title' })}
            </Header>
            <LinkAndButton>
              {isEditStartDate ? (
                <Input
                  name="startDateChange"
                  label={intl.formatMessage({
                    id: 'registeradditionalcompetence.input.fromdate'
                  })}
                  type="date"
                  id="startDateChange"
                  onChange={e => {
                    changePeriodStart(e.target.value);
                    setChangePeriodStartVal(e.target.value);
                  }}
                />
              ) : (
                <Info>{additionalCompetence.periodStartDate}</Info>
              )}
              <ButtonWithLink
                icon={
                  isEditStartDate ? (
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
                  isEditStartDate
                    ? intl.formatMessage({ id: 'registeradditionalcompetence.card.save' })
                    : intl.formatMessage({ id: 'registeradditionalcompetence.card.change' })
                }
                handleCallback={() => handleEditClicked('startDate')}
              />
            </LinkAndButton>
            <Header>
              {/* To date */}
              {intl.formatMessage({ id: 'registeradditionalcompetence.card.todate.title' })}
            </Header>
            <LinkAndButton>
              {isEditStopDate ? (
                <Input
                  name="endDateChange"
                  label={intl.formatMessage({
                    id: 'registeradditionalcompetence.input.todate'
                  })}
                  type="date"
                  id="endDateChange"
                  onChange={e => {
                    changePeriodStop(e.target.value);
                    setChangePeriodStoptVal(e.target.value);
                  }}
                />
              ) : (
                <Info>{additionalCompetence.periodStopDate}</Info>
              )}
              <ButtonWithLink
                icon={
                  isEditStopDate ? (
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
                  isEditStopDate
                    ? intl.formatMessage({ id: 'registeradditionalcompetence.card.save' })
                    : intl.formatMessage({ id: 'registeradditionalcompetence.card.change' })
                }
                handleCallback={() => handleEditClicked('endDate')}
              />
            </LinkAndButton>
          </CardContent>
        </DataCard>
      </CardContainer>
      <NavigationBlock>
        <Navigation
          backButtonText={intl.formatMessage({ id: 'link.back.title' })}
          nextButtonText={intl.formatMessage({ id: 'button.next.title' })}
          backButtonLink="/registeradditionalcompetence/competence"
          nextButtonOnClick={() => handleNextClicked()}
        />
      </NavigationBlock>
    </Container>
  );
};

export default AdditionalCompetenceSummary;

const Container = styled.div`
  margin: 3rem 4rem;
`;

const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3rem;
`;

const CardContainer = styled.div`
  width: 50%;
`;

const CardContent = styled.section`
  padding: 3rem;
  min-width: 60rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const Header = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.font.textlight};
  opacity: 0.6;
`;

const NavigationBlock = styled.div`
  width: 50%;
`;

const LinkAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  height: calc(1.5em + 2px);
  margin: 0 0 2rem 0;
`;

const Info = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.font.text};
  margin-bottom: 1rem;
`;
