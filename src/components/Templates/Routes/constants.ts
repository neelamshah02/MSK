interface Routes {
  home: string;
  login: string;
  callback: string;
  error: string;
  additionalCompetencePerson: string;
  additionalCompetenceCompetence: string;
  additionalCompetenceSummary: string;
  additionalCompetenceConfirmation: string;
  courseAndEducation: string;
  courseAndEducationRegistration: string;
  courseAndEducationConfirmation: string;
  courseAndEducationSummary: string;
  reportCourseAndEducation: string;
  seagoingConfirmation: string;
  seagoingTime: string;
  seagoingPerson: string;
  seagoingSummary: string;
  participants: string;
  assessorPerson: string;
  assessorRating: string;
}

export const routes: Routes = {
  home: '/',
  login: '/login',
  callback: '/callback',
  error: '/error',
  courseAndEducationRegistration: '/registration',
  courseAndEducation: '/courseandeducation',
  seagoingConfirmation: '/registerseagoing/confirmation',
  seagoingPerson: '/registerseagoing/person',
  seagoingSummary: '/registerseagoing/summary',
  seagoingTime: '/registerseagoing/time',
  reportCourseAndEducation: '/reportcourseandeducation/course',
  participants: '/reportcourseandeducation/participants',
  courseAndEducationSummary: '/reportcourseandeducation/summary',
  additionalCompetencePerson: '/registeradditionalcompetence/person',
  additionalCompetenceCompetence: '/registeradditionalcompetence/competence',
  additionalCompetenceSummary: '/registeradditionalcompetence/summary',
  additionalCompetenceConfirmation: '/registeradditionalcompetence/confirmation',
  courseAndEducationConfirmation: '/reportcourseandeducation/confirmation',
  assessorPerson: '/registerassessor/person',
  assessorRating: '/registerassessor/rating'
};
