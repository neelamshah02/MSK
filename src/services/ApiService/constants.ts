interface ApiUrls {
  getVesselsList: string;
  externalLookup: (personNumber: string, firstName: string, lastName: string) => string;
  validateSeagoing: string;
  reportSeagoingBatch: string;
  getOccupationCodes: string;
  externalLookupList: string;
  courseSearch: (val: string) => string;
  validateCourse: string;
  reportCourses: string;
}

interface ExternalUrls {
  orgSearch: (orgNumber: string) => string;
}

export const apiUrls: ApiUrls = {
  getVesselsList: 'test/list',
  externalLookup: (personNumber: string, firstName: string, lastName: string) =>
    `core-externallookup/v1/person/${personNumber}/${firstName}/${lastName}`,
  externalLookupList: 'core-externallookup/v1/person',
  validateSeagoing: 'aps-seagoing/seagoing/v1/servicereport/prevalidate',
  reportSeagoingBatch: 'aps-seagoing/seagoing/v1/servicereport/batch',
  getOccupationCodes: 'aps-seagoing/seagoing/v1/occupation/reference',
  courseSearch: (val: string) => `aps-course/course/v1/codes/search?searchpattern=${val}`,
  validateCourse: 'aps-course/course/v1/courses/prevalidate',
  reportCourses: 'aps-course/course/v1/courses/batch'
};

export const externalUrls: ExternalUrls = {
  orgSearch: orgNumber => `https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumber}`
};
