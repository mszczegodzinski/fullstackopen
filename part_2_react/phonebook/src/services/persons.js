import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

export const getAllPersons = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

export const createPerson = (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  return req.then((res) => res.data);
};

export const deletePersonById = (id) => {
  console.log(id);
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => console.log(res));
};
