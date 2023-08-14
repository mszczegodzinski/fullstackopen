import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import { createPerson, getAllPersons, deletePersonById, updatePersonNumber } from './services/persons';
import { Notification } from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchedPersons, setSearchedPersons] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const addPerson = (e) => {
    e.preventDefault();
    const person = persons.find((person) => person.name === newName);
    if (person) {
      const confirmed = window.confirm('A person with this name already exists. Do you want to replace it?');
      if (!confirmed) {
        return;
      }
      return updatePersonNumber(person, newNumber)
        .then((updatedPerson) => {
          const updatedPersons = persons.map((person) => {
            return person.id === updatedPerson.id ? updatedPerson : person;
          });
          setPersons([...updatedPersons]);
          setMessage('Person was updated.');
          setNewName('');
          setNewNumber('');
          setTimeout(() => setMessage(''), 5000);
        })
        .catch((error) => {
          setIsError(true);
          setMessage(`Person ${person.name} was not updated.`);
          setTimeout(() => {
            setMessage('');
            setIsError(false);
          }, 5000);
        });
    }

    const newPerson = { name: newName, number: newNumber };

    createPerson(newPerson)
      .then((newPerson) => {
        setPersons([...persons, newPerson]);
        setMessage(`Person ${newPerson.name} was created.`);
        setNewName('');
        setNewNumber('');
        setTimeout(() => setMessage(''), 5000);
      })
      .catch((error) => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(error.response.data, 'text/html');
        const errorMessage = htmlDoc?.querySelector('pre')?.textContent;
        setIsError(true);
        setMessage(errorMessage);
        setTimeout(() => {
          setMessage('');
          setIsError(false);
        }, 8000);
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
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setMessage('Person was deleted.');
        setTimeout(() => setMessage(''), 5000);
      })
      .catch((error) => {
        setMessage(`Information of this person has already been deleted from the server.`);
        setTimeout(() => {
          setMessage('');
          setIsError(false);
        }, 5000);
      });
  };

  return (
    <div>
      <Header />
      <Notification message={message} isError={isError} />
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
