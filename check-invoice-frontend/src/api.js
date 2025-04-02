import axios from "axios";
// We can adjust the base URL if necessary like for staging or production
const API_BASE_URL = "http://localhost:3000"; 

const makeApiRequest = async (method, endpoint, data = null) => {
  try {

    const response = await axios({
      method,
      url: `${API_BASE_URL}/${endpoint}`,
      data,
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error with ${method.toUpperCase()} request to ${endpoint}:`, error);
    throw error;
  }
};

export const getCompanies = async () => {
  return makeApiRequest('get', 'companies');
};

export const getChecks = async () => {
  return makeApiRequest('get', 'checks');
};

export const getInvoices = async () => {
  return makeApiRequest('get', 'invoices');
};

export const postCheck = async (formData) => {
  return makeApiRequest('post', 'checks', formData);
};
