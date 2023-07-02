export const Filter = ({ searchedPersons, onSearchInputChange }) => {
  return (
    <div>
      filter shown with <input value={searchedPersons} onChange={onSearchInputChange} />
    </div>
  );
};
