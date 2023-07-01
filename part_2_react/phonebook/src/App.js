import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [searchedPersons, setSearchedPersons] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  const addPerson = (e) => {
    e.preventDefault();
    const person = persons.find((person) => person.name === newName);

    if (person) {
      return alert(`${person.name} is already in the phonebook`);
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName('');
  };

  const onSearchInputChange = (e) => {
    const currentSearch = e.target.value;
    setSearchedPersons(currentSearch);

    const filteredPersonsRes = persons.filter((person) => person.name.includes(currentSearch));
    setFilteredPersons(filteredPersonsRes);
  };

  useEffect(() => {
    // prettier-ignore
    axios
      .get('http://localhost:3001/persons')
      .then((res) => {
        setPersons(res.data);
      });
  }, []);

  return (
    <div>
      <Header />
      <Filter onSearchInputChange={onSearchInputChange} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <Persons filteredPersons={filteredPersons} persons={persons} searchedPersons={searchedPersons} />
    </div>
  );
};

export default App;
