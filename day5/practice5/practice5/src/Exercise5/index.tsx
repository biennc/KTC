import React, { useState } from 'react'

const Exercise5 = () => {
    const [notice, setNotice] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert(`You submitted: ${notice}`);
        setNotice('');
    };

    return (
        <>
            <h3>Exercise 5: Form Submission Alert</h3>
            <form onSubmit={handleSubmit}>
                <input
                    className='input'
                    type="text"
                    placeholder="Type something..."
                    value={notice}
                    onChange={e => setNotice(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default Exercise5