export const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, addPerson }) => {
  const onNameInputChange = (e) => {
    const currentName = e.target.value;
    setNewName(currentName);
  };

  const onNumberInputChange = (e) => {
    const currentNumber = e.target.value;
    setNewNumber(currentNumber);
  };
  return (
    <form onSubmit={addPerson}>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' value={newName} onChange={onNameInputChange} />
      <label htmlFor='number'>Number</label>
      <input type='text' id='number' value={newNumber} onChange={onNumberInputChange} />
      <button type='submit'>Add</button>
    </form>
  );
};
