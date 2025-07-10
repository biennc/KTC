import React from 'react'

const Exercise3 = () => {
    const [isOn, setIsOn] = React.useState(false);
    const handleSwitch = () => {
    setIsOn(!isOn);
    }
  return (
    <div>
        <h3>Exercise 3: Toggle Switch</h3>
        <button onClick={handleSwitch}>Click Me!</button>
        <label>Switch is {isOn ? 'ON' : 'OFF'}</label>
    </div>
  )
}

export default Exercise3