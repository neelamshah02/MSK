import axios, { AxiosPromise, AxiosResponse, AxiosRequestConfig, Method } from 'axios';

export interface ApiServiceInterface {
  token: string;
  baseUrl: string;
  config: any;
  subscriptionkey: string;
  get: (path: string, extras?: any) => AxiosPromise<any>;
  getAction: (path: string, callback: any, extras?: any) => Promise<any>;
  post: (path: string, data: any, extras?: any) => AxiosPromise<any>;
  put: (path: string, data: any, extras?: any) => AxiosPromise<any>;
  postAction: (path: string, data: any, callback: any, extras?: any) => Promise<any>;
  all: (args: any[], callback: any) => AxiosPromise<any>;
  fetch: (fullPath: string, params?: any) => AxiosPromise<any>;
  upload: (path: string, files: File[], extras?: any) => Promise<AxiosResponse<any>[]>;
  openFile: (path: string, filename: string, method?: string) => void;
  downloadFile: (path: string, filename: string, method?: string) => void;
}

class ApiService implements ApiServiceInterface {
  baseUrl: string;

  token: string;

  config: any;

  subscriptionkey: string;

  constructor(token = '') {
    this.token = token;
    this.baseUrl = process.env.REACT_APP_API_URL as string;
    this.subscriptionkey = process.env.REACT_APP_SUBSCRIPTIONKEY as string;
    this.config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': 'nb-NO',
        'Ocp-Apim-Subscription-Key': this.subscriptionkey
      }
    };
    if (this.token) this.config.headers.Authorization = `Bearer ${this.token}`;
  }

  put = (path: string, data: any, extras?: any) => {
    const newConfig = extras
      ? { headers: { ...this.config.headers, ...extras.headers } }
      : this.config;
    return axios.put(this.baseUrl + path, data, newConfig as any);
  };

  get = (path: string, extras?: any) => {
    const newConfig = extras
      ? { headers: { ...this.config.headers, ...extras.headers } }
      : this.config;
    return axios.get(this.baseUrl + path, newConfig);
  };

  getAction = (path: string, callback: any, extras?: any) => {
    const newConfig = extras
      ? { headers: { ...this.config.headers, ...extras.headers } }
      : this.config;
    return axios.get(this.baseUrl + path, newConfig as any).then(response => {
      if (response.status >= 400 && response.status < 600) console.error(response);
      callback(response.status, response.data);
    });
  };

  post = (path: string, data: any, extras?: any) => {
    const newConfig = extras
      ? { headers: { ...this.config.headers, ...extras.headers } }
      : this.config;
    return axios.post(this.baseUrl + path, data, newConfig as any);
  };

  postAction = (path: string, data: any, callback: any, extras?: any) => {
    const newConfig = extras
      ? { headers: { ...this.config.headers, ...extras.headers } }
      : this.config;
    return axios.post(this.baseUrl + path, data, newConfig as any).then(response => {
      if (response.status >= 400 && response.status < 600) console.error(response);
      callback(response.status, response.data);
    });
  };

  all = (args: any[], callback: any) => {
    return axios.all(args).then(response => callback(response));
  };

  fetch = (fullPath: string, params = undefined) => {
    return axios.get(fullPath, params);
  };

  upload = (path: string, files: File[], extras?: any) => {
    const newConfig = extras
      ? { headers: { ...this.config.headers, ...extras.headers } }
      : this.config;
    const promiseArray = files.map((file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return axios.post(this.baseUrl + path, formData, newConfig);
    });
    return axios.all(promiseArray);
  };

  openFile = (path: string, filename: string, method = 'get') => {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      this.downloadFile(path, filename, method);
      return;
    }
    const extension = filename.split('.').pop();
    let type = 'application/octet';
    switch (extension) {
      case 'pdf':
        type = 'application/pdf';
        break;
      case 'png':
        type = 'image/png';
        break;
      case 'jpg':
        type = 'image/jpeg';
        break;
      default:
        this.downloadFile(path, filename, method);
        return;
    }
    this.fetchBlobURL(path, type, method).then((blobUrl: string) => {
      window.open(blobUrl);
    });
  };

  downloadFile = (path: string, filename: string, method = 'get') => {
    this.fetchBlobURL(path, 'application/octet-stream', method).then((blobUrl: string) => {
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', filename);

      const clickHandler = () => {
        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
          link.removeEventListener('click', clickHandler);
          document.body.removeChild(link);
        }, 150);
      };

      document.body.appendChild(link);
      link.addEventListener('click', clickHandler, false);
      link.click();
    });
  };

  private fetchBlobURL = (path: string, type: string, method = 'get') => {
    const config = {
      url: this.baseUrl + path,
      method: method as Method,
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    } as AxiosRequestConfig;
    return axios(config).then(response => {
      if (response.status >= 400 && response.status < 600) throw new Error(response.statusText);
      const bloburl = window.URL.createObjectURL(new Blob([response.data], { type }));
      return bloburl;
    });
  };
}

export default ApiService;
