/* eslint-disable react/jsx-wrap-multilines */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import {
  SdiClipboardCheck,
  SdiReportDetailed,
  SdiRopeKnot,
  SdiShipMoving,
  SdiSchoolHat
} from '@sdir/sds';
import { IconTile } from '../Molecules';
import { TileTitle } from '../Atoms';
import { SystemState } from '../../types';
import { Role } from '../../common/enum';

const MainMenuCardPanel: React.FC = () => {
  const intl = useIntl();
  const theme = useContext(ThemeContext);

  const {
    appState: { user }
  } = useSelector((state: SystemState) => state);
  return (
    <Section>
      <MenuPanel>
        {(user.role === Role.EducationCenter || user.role === Role.Admin) && (
          <Link to="/reportcourseandeducation/course">
            <IconTile
              tileTitle={
                <TileTitle title={intl.formatMessage({ id: 'menucard.icontile.course.title' })} />
              }
              tileBody={
                <IconContainer>
                  <SdiSchoolHat color={theme.colors.primary} size="l" />
                </IconContainer>
              }
            />
          </Link>
        )}
        {(user.role === Role.VesselOwner || user.role === Role.Admin) && (
          <Link to="/registeradditionalcompetence/person">
            <IconTile
              tileTitle={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <TileTitle
                  title={intl.formatMessage({ id: 'menucard.icontile.competence.title' })}
                />
              }
              tileBody={
                <IconContainer>
                  <SdiRopeKnot color={theme.colors.primary} size="l" style={{ width: '7.5em' }} />
                </IconContainer>
              }
            />
          </Link>
        )}
        {(user.role === Role.VesselOwner ||
          user.role === Role.ManningCompany ||
          user.role === Role.Admin) && (
          <Link to="/registerseagoing/person">
            <IconTile
              tileTitle={
                <TileTitle title={intl.formatMessage({ id: 'menucard.icontile.seagoing.title' })} />
              }
              tileBody={
                <IconContainer>
                  <SdiShipMoving color={theme.colors.primary} size="l" />
                </IconContainer>
              }
            />
          </Link>
        )}
        {(user.role === Role.VesselOwner ||
          user.role === Role.Assessor ||
          user.role === Role.Admin) && (
          <Link to="/registerassessor/person">
            <IconTile
              tileTitle={
                <TileTitle title={intl.formatMessage({ id: 'menucard.icontile.assessor.title' })} />
              }
              tileBody={
                <IconContainer>
                  <SdiClipboardCheck color={theme.colors.primary} size="l" />
                </IconContainer>
              }
            />
          </Link>
        )}
        <Link to="/">
          <IconTile
            tileTitle={
              <TileTitle title={intl.formatMessage({ id: 'menucard.icontile.report.title' })} />
            }
            tileBody={
              <IconContainer>
                <SdiReportDetailed color={theme.colors.primary} size="l" />
              </IconContainer>
            }
          />
        </Link>
      </MenuPanel>
    </Section>
  );
};

export default MainMenuCardPanel;

const Section = styled.section`
  margin: 0 auto;
`;

const MenuPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 44rem));
  grid-gap: ${({ theme }) => theme.overlay.gridgap};
  align-items: center;
  justify-content: center;
  @media screen and (max-width: ${({ theme }) => theme.screen.medium}) {
    grid-template-columns: repeat(2, minmax(0, 44rem));
  }
  @media screen and (max-width: ${({ theme }) => theme.screen.small}) {
    grid-template-columns: 1fr;
  }
`;

const IconContainer = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  height: 7.5rem;
  width: 7.5rem;
  margin: 7.5rem 12.5rem;
`;
