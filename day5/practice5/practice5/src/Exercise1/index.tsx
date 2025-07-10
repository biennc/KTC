import { useState } from 'react'

const Exercise1 = () => {
  const [count, setCount] = useState(0)

const handleCountChange = (prev: number) => {
    setCount(prev + 1)
  }

  return (
    
      <div className="card">
        <h3>Exercise 1: Button Click Counter</h3>
        <button onClick={() => handleCountChange(count)}>
          Click me
        </button>
        <label >
          Clicked {count} times
        </label>
      </div>
  )
}

export default Exercise1