export const Persons = ({ searchedPersons, filteredPersons, persons }) => {
  return (
    <>
      <h3>Numbers</h3>
      <div>
        {searchedPersons.length
          ? filteredPersons.map((person, i) => (
              <div key={`${i}-person.name}`}>{`${person.name}: ${person.number}`}</div>
            ))
          : persons.map((person, i) => <div key={`${i}-person.name}`}>{`${person.name}: ${person.number}`}</div>)}
      </div>
    </>
  );
};
