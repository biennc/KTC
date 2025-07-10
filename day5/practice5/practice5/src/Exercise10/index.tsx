import React from 'react'

const Exercise10 = () => {
const items = ["Apple", "Banana", "Orange", "Grapes", "Pineapple"];

const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm));
    const listElement = document.getElementById('list-items');
    if (listElement) {
        listElement.innerHTML = filteredItems.length > 0 ? filteredItems.join(', ') : 'No items found';
    }
}
  return (
    <div>
        <h3>Exercise 10: SearchFilter</h3>
        <label htmlFor='search-items'>Search items</label>
        <input 
            type="text" 
            placeholder="Search items..." 
            style={{ padding: '10px', fontSize: '16px', width: '200px' }} 
            onChange={(event) => {handleSearch(event)}}
        />
        <p id='list-items' style={{ marginTop: '10px', fontSize: '16px' }}>
            {items.join(', ')}
        </p>
    </div>
  )
}

export default Exercise10