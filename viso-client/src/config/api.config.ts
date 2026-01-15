export const SERVER_URL = process.env.SERVER_URL as string;

export const API_URL = {
  root: (url = '') => `${url ? url : ''}`,

  project: (url = '') => API_URL.root(`/project${url}`),
  timeEntry: (url = '') => API_URL.root(`/time-entry${url}`),
};
