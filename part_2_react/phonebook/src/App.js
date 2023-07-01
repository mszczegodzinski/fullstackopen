import { useState } from 'react';
import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
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
  };

  const onSearchInputChange = (e) => {
    const currentSearch = e.target.value;
    setSearchedPersons(currentSearch);

    const filteredPersonsRes = persons.filter((person) => person.name.includes(currentSearch));
    setFilteredPersons(filteredPersonsRes);
  };

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
