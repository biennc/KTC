import React from 'react';

const Exercise2 = () => {
  const [text, setText] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };    

  return (
    <div>
      <h3>Exercise 2: Input Field Tracker</h3>
      <label htmlFor='input-example'>Type something</label>
      <input id='input-example' value={text} type='text' onChange={handleChange} />

      {text?.length == 0 ? <p>You typed: nothing</p> : <p>You typed: {text}</p>}
    </div>
  );
}

export default Exercise2