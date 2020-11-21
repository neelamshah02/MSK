const FormHelper = {
  urlParamBoolean(name: string): boolean {
    const results = new RegExp(`[?&]${name}=([^&#]*)`).exec(window.location.href);
    if (results == null) {
      return false;
    }
    const decoded = decodeURI(results[1]);
    return (decoded && decoded === 'true') || false;
  },

  urlParam(name: string) {
    const results = new RegExp(`[?&]${name}=([^&#]*)`).exec(window.location.href);
    if (results == null) {
      return null;
    }
    return decodeURI(results[1]) || 0;
  },

  onlyDigits(val: string) {
    return /^\d+$/.test(val);
  },

  onlyAlphabets(val: string) {
    return /^[a-zA-ZÅØÆåøæ][a-zA-ZÅØÆåøæ ]*$/.test(val);
  },

  isEmailInvalid(val: string) {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
  },

  objectToArray(object: any) {
    return Object.keys(object).map(key => object[key]);
  },

  objectIsEmpty(object: any): boolean {
    if (object.constructor === Object && Object.entries(object).length === 0) {
      return true;
    }
    return false;
  }
};

export const errorHandler = (error: any, errorCallback: Function, message: string) => {
  if (error.response.status === 422) {
    errorCallback(error.response.data[0].message);
  } else if (error.response.status === 400 || error.response.status === 415) {
    errorCallback(error.response.data.title);
  } else {
    errorCallback(message);
  }
  console.error('error: ', error.response.data);
};
export default FormHelper;
