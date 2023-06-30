import { useState } from 'react';

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

  const onNameInputChange = (e) => {
    const currentName = e.target.value;
    setNewName(currentName);
  };

  const onNumberInputChange = (e) => {
    const currentNumber = e.target.value;
    setNewNumber(currentNumber);
  };

  const onSearchInputChange = (e) => {
    const currentSearch = e.target.value;
    setSearchedPersons(currentSearch);

    const filteredPersonsRes = persons.filter((person) => person.name.includes(currentSearch));
    setFilteredPersons(filteredPersonsRes);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          filter shown with <input value={searchedPersons} onChange={onSearchInputChange} />
        </div>
        <div>
          <h2>Add a new</h2>
          <div>
            name: <input value={newName} onChange={onNameInputChange} />
          </div>
          <div>
            number: <input value={newNumber} onChange={onNumberInputChange} />
          </div>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {searchedPersons.length
          ? filteredPersons.map((person, i) => (
              <div key={`${i}-person.name}`}>{`${person.name}: ${person.number}`}</div>
            ))
          : persons.map((person, i) => <div key={`${i}-person.name}`}>{`${person.name}: ${person.number}`}</div>)}
      </div>
    </div>
  );
};

export default App;
