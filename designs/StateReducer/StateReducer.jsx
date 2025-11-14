import React, { useReducer, useState } from 'react';

/**
 * STATE REDUCER PATTERN DEMONSTRATION
 * 
 * The State Reducer pattern uses useReducer to manage complex state logic
 * in a predictable way. It's especially useful for components with multiple
 * state transitions and complex update logic.
 * 
 * Benefits:
 * - Predictable state updates
 * - Centralized state logic
 * - Easier testing
 * - Better for complex state
 * - Time-travel debugging
 */

// ============================================================================
// COUNTER WITH REDUCER
// ============================================================================

const counterInitialState = { count: 0, history: [] };

function counterReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1,
                history: [...state.history, `Incremented to ${state.count + 1}`]
            };
        case 'DECREMENT':
            return {
                count: state.count - 1,
                history: [...state.history, `Decremented to ${state.count - 1}`]
            };
        case 'RESET':
            return {
                count: 0,
                history: [...state.history, 'Reset to 0']
            };
        case 'SET':
            return {
                count: action.payload,
                history: [...state.history, `Set to ${action.payload}`]
            };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}

function CounterWithReducer() {
    const [state, dispatch] = useReducer(counterReducer, counterInitialState);

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>🔢 Counter with Reducer</h3>
            <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#3498db',
                margin: '20px 0'
            }}>
                {state.count}
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button
                    onClick={() => dispatch({ type: 'DECREMENT' })}
                    style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    -
                </button>
                <button
                    onClick={() => dispatch({ type: 'RESET' })}
                    style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: '#95a5a6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Reset
                </button>
                <button
                    onClick={() => dispatch({ type: 'INCREMENT' })}
                    style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    +
                </button>
            </div>
            <div style={{
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                maxHeight: '150px',
                overflowY: 'auto'
            }}>
                <strong>History:</strong>
                <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '14px' }}>
                    {state.history.map((entry, i) => (
                        <li key={i}>{entry}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// ============================================================================
// TODO LIST WITH REDUCER
// ============================================================================

const todoInitialState = { todos: [], filter: 'all' };

function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
                )
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            };
        case 'CLEAR_COMPLETED':
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.completed)
            };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}

function TodoListWithReducer() {
    const [state, dispatch] = useReducer(todoReducer, todoInitialState);
    const [inputValue, setInputValue] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            dispatch({ type: 'ADD_TODO', payload: inputValue });
            setInputValue('');
        }
    };

    const filteredTodos = state.todos.filter(todo => {
        if (state.filter === 'active') return !todo.completed;
        if (state.filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>✅ Todo List with Reducer</h3>
            
            <form onSubmit={handleAdd} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Add a new todo..."
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Add
                    </button>
                </div>
            </form>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {['all', 'active', 'completed'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => dispatch({ type: 'SET_FILTER', payload: filter })}
                        style={{
                            padding: '6px 12px',
                            backgroundColor: state.filter === filter ? '#3498db' : '#ecf0f1',
                            color: state.filter === filter ? 'white' : '#2c3e50',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            textTransform: 'capitalize'
                        }}
                    >
                        {filter}
                    </button>
                ))}
                <button
                    onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
                    style={{
                        marginLeft: 'auto',
                        padding: '6px 12px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}
                >
                    Clear Completed
                </button>
            </div>

            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {filteredTodos.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#7f8c8d' }}>
                        No todos to display
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <div
                            key={todo.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px',
                                marginBottom: '8px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '4px'
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                                style={{ cursor: 'pointer' }}
                            />
                            <span style={{
                                flex: 1,
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                color: todo.completed ? '#7f8c8d' : '#2c3e50'
                            }}>
                                {todo.text}
                            </span>
                            <button
                                onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                                style={{
                                    padding: '4px 8px',
                                    backgroundColor: '#e74c3c',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#e8f4f8',
                borderRadius: '4px',
                fontSize: '14px'
            }}>
                <strong>Stats:</strong> {state.todos.length} total, {state.todos.filter(t => !t.completed).length} active, {state.todos.filter(t => t.completed).length} completed
            </div>
        </div>
    );
}

// ============================================================================
// FORM WITH REDUCER
// ============================================================================

const formInitialState = {
    values: { username: '', email: '', password: '' },
    errors: {},
    touched: {},
    isSubmitting: false
};

function formReducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                values: { ...state.values, [action.field]: action.value },
                errors: { ...state.errors, [action.field]: null }
            };
        case 'SET_TOUCHED':
            return {
                ...state,
                touched: { ...state.touched, [action.field]: true }
            };
        case 'SET_ERRORS':
            return {
                ...state,
                errors: action.errors
            };
        case 'SET_SUBMITTING':
            return {
                ...state,
                isSubmitting: action.value
            };
        case 'RESET':
            return formInitialState;
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}

function FormWithReducer() {
    const [state, dispatch] = useReducer(formReducer, formInitialState);

    const validate = () => {
        const errors = {};
        if (!state.values.username) errors.username = 'Username is required';
        if (!state.values.email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(state.values.email)) errors.email = 'Email is invalid';
        if (!state.values.password) errors.password = 'Password is required';
        else if (state.values.password.length < 6) errors.password = 'Password must be at least 6 characters';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        
        if (Object.keys(errors).length > 0) {
            dispatch({ type: 'SET_ERRORS', errors });
            return;
        }

        dispatch({ type: 'SET_SUBMITTING', value: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        alert(`Form submitted!\n${JSON.stringify(state.values, null, 2)}`);
        dispatch({ type: 'RESET' });
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>📝 Form with Reducer</h3>
            
            <form onSubmit={handleSubmit}>
                {['username', 'email', 'password'].map(field => (
                    <div key={field} style={{ marginBottom: '16px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '4px',
                            fontWeight: 'bold',
                            textTransform: 'capitalize'
                        }}>
                            {field}:
                        </label>
                        <input
                            type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                            value={state.values[field]}
                            onChange={(e) => dispatch({
                                type: 'SET_FIELD',
                                field,
                                value: e.target.value
                            })}
                            onBlur={() => dispatch({ type: 'SET_TOUCHED', field })}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: `2px solid ${state.errors[field] && state.touched[field] ? '#e74c3c' : '#e0e0e0'}`,
                                borderRadius: '4px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                        {state.errors[field] && state.touched[field] && (
                            <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>
                                {state.errors[field]}
                            </div>
                        )}
                    </div>
                ))}
                
                <button
                    type="submit"
                    disabled={state.isSubmitting}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: state.isSubmitting ? '#95a5a6' : '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: state.isSubmitting ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {state.isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

function StateReducerDemo() {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f5f6fa',
            padding: '40px 20px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <header style={{
                    textAlign: 'center',
                    marginBottom: '40px'
                }}>
                    <h1 style={{
                        color: '#2c3e50',
                        marginBottom: '8px'
                    }}>
                        State Reducer Pattern
                    </h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '16px'
                    }}>
                        Managing complex state with useReducer
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    <CounterWithReducer />
                    <TodoListWithReducer />
                    <FormWithReducer />
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 State Reducer Benefits
                    </h3>
                    <ul style={{ color: '#34495e', lineHeight: '1.8' }}>
                        <li><strong>Predictable:</strong> State updates follow clear patterns</li>
                        <li><strong>Centralized:</strong> All state logic in one place</li>
                        <li><strong>Testable:</strong> Easy to test reducer functions</li>
                        <li><strong>Debuggable:</strong> Clear action history for debugging</li>
                        <li><strong>Scalable:</strong> Better for complex state management</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default StateReducerDemo;
