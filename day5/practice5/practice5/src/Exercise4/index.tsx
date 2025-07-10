import React from 'react'

const Exercise4 = () => {
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = 'yellow';
  };
  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = 'white';
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: 'white', transition: 'background-color 0.2s' }}
    >
      <h3>Exercise 4: Hover Highlight</h3>
    </div>
  );
}

export default Exercise4