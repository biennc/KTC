import React from 'react'

const Exercise8 = () => {
  const [selectedFruit, setSelectedFruit] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFruit(event.target.value);
  };
return (
    <div>
        <h3>Exercise 8: Dropdown Selection</h3>
        <select onChange={handleChange} value={selectedFruit} style={{ padding: '10px', fontSize: '16px' }}>
            <option value="">Select a fruit</option>
            <option value="Apple">Apple</option>
            <option value="Banana">Banana</option>
            <option value="Orange">Orange</option>
        </select>
        <p id='selected-fruit'>Selected fruit: {selectedFruit}</p>
    </div>
  )
}

export default Exercise8