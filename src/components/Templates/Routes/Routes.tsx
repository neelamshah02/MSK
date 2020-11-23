import React, { ComponentType } from 'react';
import styled from 'styled-components';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { routes } from './constants';
import { Home, Login, Callback, ErrorPage } from '../../Pages';
import {
  AdditionalCompetencePerson,
  AdditionalCompetenceCompetence,
  AdditionalCompetenceSummary,
  AdditionalCompetenceConfirmation,
  CourseAndEducation,
  CourseAndEducationConfirmation,
  CourseAndEducationRegistration,
  CourseAndEducationSummary,
  SeagoingConfirmation,
  SeagoingPerson,
  SeagoingSummary,
  SeagoingTime,
  AssessorPerson,
  AssessorRating
} from '../../Organisms';
import PrivateRoute from './PrivateRoute';

interface RouterProps {
  Header: ComponentType;
  ContentSection: ComponentType;
}

const Routes: React.FC<RouterProps> = ({ Header, ContentSection }) => {
  return (
    <HashRouter>
      <Header />
      <ContentSection>
        <Title>Min side kvalifikasjoner</Title>
        <Switch>
          <PrivateRoute exact path={routes.home} component={Home} />
          <PrivateRoute exact path={routes.seagoingPerson} component={SeagoingPerson} />
          <PrivateRoute exact path={routes.seagoingTime} component={SeagoingTime} />
          <PrivateRoute
            exact
            path={routes.reportCourseAndEducation}
            component={CourseAndEducation}
          />
          <PrivateRoute exact path={routes.seagoingSummary} component={SeagoingSummary} />
          <PrivateRoute exact path={routes.seagoingConfirmation} component={SeagoingConfirmation} />
          <PrivateRoute
            exact
            path={routes.participants}
            component={CourseAndEducationRegistration}
          />
          <PrivateRoute
            exact
            path={routes.courseAndEducationSummary}
            component={CourseAndEducationSummary}
          />
          {/* Additional Competence */}
          <PrivateRoute
            exact
            path={routes.additionalCompetencePerson}
            component={AdditionalCompetencePerson}
          />
          <PrivateRoute
            exact
            path={routes.additionalCompetenceCompetence}
            component={AdditionalCompetenceCompetence}
          />
          <PrivateRoute
            exact
            path={routes.additionalCompetenceSummary}
            component={AdditionalCompetenceSummary}
          />
          <PrivateRoute
            exact
            path={routes.additionalCompetenceConfirmation}
            component={AdditionalCompetenceConfirmation}
          />
          <PrivateRoute
            exact
            path={routes.courseAndEducationConfirmation}
            component={CourseAndEducationConfirmation}
          />
          <PrivateRoute exact path={routes.assessorPerson} component={AssessorPerson} />
          <PrivateRoute exact path={routes.assessorRating} component={AssessorRating} />

          <Route path={routes.login} component={Login} />
          <Route path={routes.error} component={ErrorPage} />
          <Route path={routes.callback} component={Callback} />
        </Switch>
      </ContentSection>
    </HashRouter>
  );
};

export default Routes;

const Title = styled.h1`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary4};
  padding: 50px 0;
`;
