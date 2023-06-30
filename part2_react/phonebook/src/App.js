import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '12345' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
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
        {persons.map((person, i) => (
          <div key={`${i}-person.name}`}>{`${person.name}: ${person.number}`}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
