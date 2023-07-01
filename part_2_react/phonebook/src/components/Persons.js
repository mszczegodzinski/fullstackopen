const Person = ({ name, number, onDelete }) => {
  return (
    <div>
      {`${name}: ${number}`} <button onClick={onDelete}>delete</button>
    </div>
  );
};

export const Persons = ({ searchedPersons, filteredPersons, persons, deletePerson }) => {
  return (
    <>
      <h3>Numbers</h3>
      <div>
        {searchedPersons.length
          ? filteredPersons.map((person, i) => (
              <Person
                key={`${i}-${person.name}`}
                name={person.name}
                number={person.number}
                onDelete={() => deletePerson(person.id)}
              />
            ))
          : persons.map((person, i) => (
              <Person
                key={`${i}-${person.name}`}
                name={person.name}
                number={person.number}
                onDelete={() => deletePerson(person.id)}
              />
            ))}
      </div>
    </>
  );
};
