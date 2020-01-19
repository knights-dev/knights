import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Counter: React.FC = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <p>Count: {count}</p>
            <button onClick={(): void => setCount(count + 1)}>inc</button>
            <button onClick={(): void => setCount(count - 1)}>dec</button>
        </>
    );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.render(<Counter />, document.getElementById('app')!);
