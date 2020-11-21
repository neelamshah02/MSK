import {
  SET_USER,
  SET_SEAGOING_PERSON,
  SET_COURSE_AND_EDUCATION,
  SET_SEAGOING_DETAILS,
  SET_ADDITIONAL_COMPETENCE_PERSON,
  SET_ADDITIONAL_COMPETENCE,
  SET_ASSESSMENT_DETAILS
} from '../constants/action-types';
import {
  PersonDetails,
  CourseAndEducation,
  SeagoingDetails,
  AdditionalCompetence,
  AssessmentDetails
} from '../../types';

export const setUser = (payload: any) => {
  return { type: SET_USER, payload };
};

export const setSeagoingPerson = (payload: PersonDetails) => {
  return { type: SET_SEAGOING_PERSON, payload };
};

export const setCourseAndEducation = (payload: CourseAndEducation) => {
  return { type: SET_COURSE_AND_EDUCATION, payload };
};

export const setSeagoingDetails = (payload: SeagoingDetails[]) => {
  return { type: SET_SEAGOING_DETAILS, payload };
};

export const setAdditionalCompetencePerson = (payload: PersonDetails) => {
  return { type: SET_ADDITIONAL_COMPETENCE_PERSON, payload };
};

export const setAdditionalCompetence = (payload: AdditionalCompetence) => {
  return { type: SET_ADDITIONAL_COMPETENCE, payload };
};

export const setAssessmentDetails = (payload: AssessmentDetails) => {
  return { type: SET_ASSESSMENT_DETAILS, payload };
};
