import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import {
  User,
  Vessel,
  PersonDetails,
  AppState,
  SeagoingDetails,
  CourseAndEducation,
  AdditionalCompetence,
  AssessmentDetails
} from '../../types';
import {
  SET_USER,
  SET_VESSEL,
  SET_SEAGOING_PERSON,
  SET_COURSE_AND_EDUCATION,
  SET_SEAGOING_DETAILS,
  SET_ADDITIONAL_COMPETENCE,
  SET_ASSESSMENT_DETAILS
} from '../constants/action-types';

const initialState: AppState = {
  user: { role: 4 } as User, // 4 as Admin, 0 as EducationCenter, 1 as VesselOwner
  seagoingPerson: {} as PersonDetails,
  vessel: {} as Vessel,
  seagoingDetails: [] as SeagoingDetails[],
  courseAndEducation: {} as CourseAndEducation,
  additionalCompetence: {} as AdditionalCompetence,
  assessmentDetails: {} as AssessmentDetails
};

function appStateReducer(state: AppState = initialState, action: { type: string; payload: any }) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_VESSEL:
      return { ...state, vessel: action.payload };
    case SET_SEAGOING_PERSON:
      return { ...state, seagoingPerson: action.payload };
    case SET_COURSE_AND_EDUCATION:
      return { ...state, courseAndEducation: action.payload };
    case SET_SEAGOING_DETAILS:
      return { ...state, seagoingDetails: action.payload };
    case SET_ADDITIONAL_COMPETENCE:
      return { ...state, additionalCompetence: action.payload };
    case SET_ASSESSMENT_DETAILS:
      return { ...state, assessmentDetails: action.payload };
    default:
      return state;
  }
}

const allReducers = {
  appState: appStateReducer,
  oidc: oidcReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;
