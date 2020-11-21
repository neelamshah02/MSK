import { UserState } from 'redux-oidc';

export interface AppState {
  vessel: Vessel;
  user: User;
  seagoingPerson: SeagoingPerson;
  seagoingDetails: SeagoingDetails[];
  courseAndEducation: CourseAndEducation;
  additionalCompetence: AdditionalCompetence;
  assessmentDetails: AssessmentDetails;
}
export interface UserRole {
  vesselOwner: string;
  educationCenter: string;
  assessor: string;
  manningCompany: string;
}
export interface PersonDetails {
  firstName: string;
  lastName: string;
  personNumber: string;
  middleName?: string;
}

export interface CourseAndEducation {
  course: CourseSearch;
  date: string;
  participants: PersonDetails[];
}

export interface AdditionalCompetence {
  person: PersonDetails;
  vessel: string;
  periodStartDate: string;
  periodStopDate: string;
  competenceCode: string;
}

export interface Vessel {
  imoNumber: string;
  callsign: string;
  name: string;
  id: string;
}

export interface Competence2 {
  periodStartDate: string;
  periodStopDate: string;
  completionDate: string;
  competenceCode: string;
}

export interface Organization2 {
  organisationNumber: string;
}

export interface User {
  role: number;
}

export interface SystemState {
  appState: AppState;
  oidc: UserState;
}

export interface SortingOption {
  key: string;
  direction: SortingDirection;
}

export interface SeagoingDetails {
  occupation: Occupation;
  startDate: string;
  endDate: string;
  hours: number;
  vessel: Vessel;
}
export interface AssessmentDetails {
  person: PersonDetails;
}
export interface CourseSearch {
  code: string;
  description: string;
  comment: string;
}

export interface Occupation {
  code: string;
  description: string;
}
export interface SelectOption {
  name: string;
  value: string;
}
export * from './common';
