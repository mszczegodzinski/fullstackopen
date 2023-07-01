import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import { createPerson, getAllPersons, deletePersonById } from './services/persons';

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
    const newPerson = { name: newName, number: newNumber };

    createPerson(newPerson).then((newNote) => {
      setPersons([...persons, newNote]);
      setNewName('');
    });
  };

  const onSearchInputChange = (e) => {
    const currentSearch = e.target.value;
    setSearchedPersons(currentSearch);

    const filteredPersonsRes = persons.filter((person) => person.name.includes(currentSearch));
    setFilteredPersons(filteredPersonsRes);
  };

  useEffect(() => {
    getAllPersons().then((initialData) => setPersons(initialData));
  }, []);

  const deletePerson = (id) => {
    deletePersonById(id)
      .then(() => setPersons(persons.filter((person) => person.id !== id)))
      .catch((error) => {
        console.log(error);
        alert('Failed to delete person.');
      });
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
      <Persons
        filteredPersons={filteredPersons}
        persons={persons}
        searchedPersons={searchedPersons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
