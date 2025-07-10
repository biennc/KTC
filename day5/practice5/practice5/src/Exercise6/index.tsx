import React from 'react'

const Exercise6 = () => {
const [lastKey, setLastKey] = React.useState('');

  const lastKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setLastKey(event.key);
  };    

  return (
    <div>
      <h3>Exercise 6: Key Press Display</h3>
      <label htmlFor='input-example'>Type something</label>
      <input id='input-example' type='text' onKeyDown={lastKeyPressed} />

      <p>Last key: {lastKey}</p>
    </div>
  );
}

export default Exercise6