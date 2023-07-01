import axios from 'axios';

const baseUrl = 'http://localhost:3000/persons';

export const getAllPersons = () => {
  return axios.get(baseUrl);
};

export const createPerson = (person) => {
  axios.post(baseUrl, person).then((res) => {
    console.log(res);
  });
};

export const updatePerson = (person) => {};
