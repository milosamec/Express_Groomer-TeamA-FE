import axios from 'axios';
import {
  setProfilesToState,
  getAppointments,
  createAppointment,
  populateUser,
  populatePet,
  createPet,
  editPet,
  deletePet,
} from '../state/actions';
import { store } from '../index';

// we will define a bunch of API calls here.
const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : `${process.env.REACT_APP_API_URI}`;

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const getExampleData = () => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
    .then(response => response.data);
};

const getAuthHeader = authState => {
  if (!authState.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${authState.idToken}` };
};

const getDSData = (url, authState) => {
  // here's another way you can compose together your API calls.
  // Note the use of GetAuthHeader here is a little different than in the getProfileData call.
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .get(url, { headers })
    .then(res => JSON.parse(res.data))
    .catch(err => err);
};

// get user profile
const apiAuthGet = authHeader => {
  return axios.get(`${apiUrl}/profiles`, { headers: authHeader });
};

// edit user profile
const apiAuthEdit = (authHeader, data) => {
  return axios.put(`${apiUrl}/profiles`, data, { headers: authHeader });
};

// get specific profile
const apiAuthGetUser = async (authHeader, id) => {
  // const path = `${apiUrl}/${id}`;
  const response = await axios.get(`${apiUrl}/profiles/${id}`, {
    headers: authHeader,
  });
  return response;
};

// get customer pets
const apiAuthCustomerPets = authHeader => {
  return axios.get(`${apiUrl}/customerPet`, { headers: authHeader });
};

// create customer pets
const apiAuthCreatePet = (authHeader, data) => {
  return axios.post(`${apiUrl}/customerPet`, data, { headers: authHeader });
};

// edit customer pets
const apiAuthEditPet = (authHeader, data) => {
  return axios.put(`${apiUrl}/customerPet`, data, { headers: authHeader });
};

// delete customer pets
const apiAuthDeletePet = (authHeader, id) => {
  return axios.delete(`${apiUrl}/customerPet/${id}`, { headers: authHeader });
};

// get Appointments
const apiAuthGetAppointment = authHeader => {
  return axios.get(`${apiUrl}/appointments`, { headers: authHeader });
};

// create appointment
const apiAuthCreateAppointment = (authHeader, data) => {
  return axios.post(`${apiUrl}/appointments`, data, { headers: authHeader });
};

const getProfileData = authState => {
  try {
    return apiAuthGet(getAuthHeader(authState)).then(response => {
      store.dispatch(setProfilesToState(response.data));
      return response.data;
    });
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

const editProfileData = (authState, profile_data) => {
  try {
    return apiAuthEdit(getAuthHeader(authState), profile_data).then(
      response => {
        store.dispatch(populateUser(response.data.profile));
        return response.data;
      }
    );
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

const getUserProfileData = (authState, id) => {
  const header = getAuthHeader(authState);

  try {
    return apiAuthGetUser(header, id)
      .then(response => {
        store.dispatch(populateUser(response.data));
        return response.data;
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    return new Promise(() => {
      console.log(`Error: ${error}`);
      return [];
    });
  }
};

const getCustomerPetsData = authState => {
  const header = getAuthHeader(authState);

  try {
    return apiAuthCustomerPets(header)
      .then(response => {
        if (Array.isArray(response.data.pets)) {
          store.dispatch(populatePet(response.data.pets));
        } else {
          store.dispatch(populatePet([]));
        }
        return response.data;
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    return new Promise(() => {
      console.log(`Error: ${error}`);
      return [];
    });
  }
};

const createCustomerPet = (authState, data) => {
  const header = getAuthHeader(authState);
  try {
    return apiAuthCreatePet(header, data)
      .then(res => {
        store.dispatch(createPet(res.data.customer.pets));
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  } catch (e) {
    return new Promise(() => {
      console.log(`Error: ${e}`);
      return [];
    });
  }
};

const editCustomerPet = (authState, data) => {
  const header = getAuthHeader(authState);
  try {
    return apiAuthEditPet(header, data)
      .then(res => {
        store.dispatch(editPet(res.data.customer.pets[0]));
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  } catch (e) {
    return new Promise(() => {
      console.log(`Error: ${e}`);
      return [];
    });
  }
};

const deleteCustomerPet = (authState, id) => {
  const header = getAuthHeader(authState);
  try {
    return apiAuthDeletePet(header, id)
      .then(res => {
        store.dispatch(deletePet(res.data.customer.pets[0]));
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  } catch (e) {
    return new Promise(() => {
      console.log(`Error: ${e}`);
      return [];
    });
  }
};

const getAppointmentData = authState => {
  const header = getAuthHeader(authState);
  try {
    return apiAuthGetAppointment(header)
      .then(res => {
        store.dispatch(getAppointments(res.data));
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  } catch (e) {
    return new Promise(() => {
      console.log(`Error: ${e}`);
      return [];
    });
  }
};

const createAppointmentData = (authState, data) => {
  const header = getAuthHeader(authState);
  try {
    return apiAuthCreateAppointment(header, data)
      .then(res => {
        store.dispatch(createAppointment(res.data));
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  } catch (e) {
    return new Promise(() => {
      console.log(`Error: ${e}`);
      return [];
    });
  }
};

export {
  sleep,
  getExampleData,
  getProfileData,
  getDSData,
  editProfileData,
  editCustomerPet,
  getUserProfileData,
  getCustomerPetsData,
  createAppointmentData,
  getAppointmentData,
  createCustomerPet,
  deleteCustomerPet,
  getAuthHeader,
};
