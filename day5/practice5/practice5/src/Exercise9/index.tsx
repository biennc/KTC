import React from 'react'

const Exercise9 = () => {
    // Task: Create a component with a checkbox. Display whether the checkbox is checked or unchecked below it.
    // Expected Output: A checkbox with a label (e.g., "Toggle me") and text below showing "Checkbox is: checked" or "Checkbox is: unchecked".
    const [isChecked, setIsChecked] = React.useState(false);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
  return (
    <div>
        <h3>Exercise 9: Checkbox Toggle</h3>
        <label>
            <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={handleCheckboxChange} 
            />
            Toggle me
        </label>
        <p id='checkbox-status'>Checkbox is: {isChecked ? 'checked' : 'unchecked'}</p> 
    </div>
  )
}

export default Exercise9