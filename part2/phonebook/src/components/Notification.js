export const Notification = ({ message, isError }) => {
  if (!message) return null;

  if (isError) {
    return (
      <div className='error'>
        <h3>{message}</h3>
      </div>
    );
  }

  return (
    <div className='success'>
      <h3>{message}</h3>
    </div>
  );
};
