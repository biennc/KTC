import React from 'react'

const Exercise7 = () => {
    // This component handles a double-click event on a button
    // display "double-clicked!" and hides the message after 2 seconds
    // using the useState hook to manage the message state
    const [message, setMessage] = React.useState('');
    const handleDoubleClick = () => {
        setMessage('double-clicked!');
         setTimeout(() => {
            setMessage (''); // Hide after 5 seconds
        }, 2000);
    }
  return (
    <div>
        <h3>Exercise 7: Double Click Message</h3>
        <button 
          onDoubleClick={() => handleDoubleClick()}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Double Click Me!
        </button>
        <p id='show-message'>{message}</p>
    </div>
  )
}

export default Exercise7