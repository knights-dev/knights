import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Counter: React.FC = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>inc</button>
            <button onClick={() => setCount(count - 1)}>dec</button>
        </>
    );
};

ReactDOM.render(<Counter />, document.getElementById('app')!);
