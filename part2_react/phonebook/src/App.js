import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    const person = persons.find((person) => person.name === newName);

    if (person) {
      return alert(`${person.name} is already in the phonebook`);
    }
    setPersons([...persons, { name: newName }]);
  };

  const onInputChange = (e) => {
    const currentName = e.target.value;
    setNewName(currentName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={onInputChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, i) => (
          <div key={`${i}-person.name}`}>{person.name}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
