import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

export const getAllPersons = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

export const createPerson = (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  return req.then((res) => res.data);
};

export const deletePersonById = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => console.log(res));
};

export const updatePersonNumber = (person, newNumber) => {
  const updatedPerson = { ...person, number: newNumber };

  const updateReq = axios.put(`${baseUrl}/${person.id}`, updatedPerson);
  return updateReq.then((res) => res.data);
};
