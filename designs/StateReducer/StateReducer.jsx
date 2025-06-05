import React, { useReducer } from 'react';

const initialState = { count: 0, message: '' };

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + 1 };
        case 'decrement':
            return { ...state, count: state.count - 1 };
        case 'setMessage':
            return { ...state, message: action.payload };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

function StateReducer(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const increment = () => dispatch({ type: 'increment' });
    const decrement = () => dispatch({ type: 'decrement' });
    const setMessage = (msg) => dispatch({ type: 'setMessage', payload: msg });

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <input
                type="text"
                value={state.message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <p>Message: {state.message}</p>
        </div>
    );
}

export default StateReducer;
