import React, { useState } from 'react';

/**
 * STATEFUL AND STATELESS COMPONENTS PATTERN DEMONSTRATION
 * 
 * This pattern separates components into:
 * - Stateful (Smart/Container): Manage state and logic
 * - Stateless (Dumb/Presentational): Only render UI based on props
 * 
 * Benefits:
 * - Clear separation of concerns
 * - Easier testing
 * - Better reusability
 * - Improved maintainability
 * - Cleaner code organization
 */

// ============================================================================
// STATELESS COMPONENTS - Pure presentation
// ============================================================================

/**
 * Button - A stateless button component
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant='primary'] - Button variant
 * @returns {JSX.Element} Button element
 */
function Button({ onClick, children, variant = 'primary' }) {
    const colors = {
        primary: '#3498db',
        success: '#27ae60',
        danger: '#e74c3c'
    };

    return (
        <button
            onClick={onClick}
            style={{
                padding: '10px 20px',
                backgroundColor: colors[variant],
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
            }}
        >
            {children}
        </button>
    );
}

/**
 * CounterDisplay - A stateless display component
 * 
 * @param {Object} props - Component props
 * @param {number} props.value - Counter value to display
 * @returns {JSX.Element} Counter display
 */
function CounterDisplay({ value }) {
    return (
        <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#2c3e50',
            margin: '20px 0'
        }}>
            {value}
        </div>
    );
}

/**
 * UserCard - A stateless user card component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - User data
 * @param {Function} props.onEdit - Edit handler
 * @param {Function} props.onDelete - Delete handler
 * @returns {JSX.Element} User card
 */
function UserCard({ user, onEdit, onDelete }) {
    return (
        <div style={{
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '12px'
        }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>{user.name}</h4>
            <p style={{ margin: '4px 0', color: '#7f8c8d', fontSize: '14px' }}>{user.email}</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <Button onClick={() => onEdit(user)} variant="primary">Edit</Button>
                <Button onClick={() => onDelete(user.id)} variant="danger">Delete</Button>
            </div>
        </div>
    );
}

/**
 * TodoItem - A stateless todo item component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.todo - Todo data
 * @param {Function} props.onToggle - Toggle handler
 * @param {Function} props.onDelete - Delete handler
 * @returns {JSX.Element} Todo item
 */
function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            marginBottom: '8px'
        }}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
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
                onClick={() => onDelete(todo.id)}
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
                ×
            </button>
        </div>
    );
}

// ============================================================================
// STATEFUL COMPONENTS - Manage state and logic
// ============================================================================

/**
 * Counter - A stateful counter component
 * 
 * Manages counter state and provides increment/decrement/reset functionality.
 * Uses stateless components for presentation.
 * 
 * @returns {JSX.Element} Counter with controls
 */
function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>🔢 Stateful Counter</h3>
            <CounterDisplay value={count} />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <Button onClick={decrement} variant="danger">-</Button>
                <Button onClick={reset}>Reset</Button>
                <Button onClick={increment} variant="success">+</Button>
            </div>
        </div>
    );
}

/**
 * UserList - A stateful user list component
 * 
 * Manages user list state and CRUD operations.
 * Uses stateless UserCard components for presentation.
 * 
 * @returns {JSX.Element} User list with management
 */
function UserList() {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
    ]);

    const handleEdit = (user) => {
        alert(`Editing user: ${user.name}`);
    };

    const handleDelete = (id) => {
        setUsers(users.filter(u => u.id !== id));
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>👥 Stateful User List</h3>
            {users.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#7f8c8d' }}>
                    No users found
                </div>
            ) : (
                users.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))
            )}
        </div>
    );
}

/**
 * TodoList - A stateful todo list component
 * 
 * Manages todo list state and operations.
 * Uses stateless TodoItem components for presentation.
 * 
 * @returns {JSX.Element} Todo list with management
 */
function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: true },
        { id: 2, text: 'Build a project', completed: false },
        { id: 3, text: 'Deploy to production', completed: false }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setTodos([...todos, {
                id: Date.now(),
                text: inputValue,
                completed: false
            }]);
            setInputValue('');
        }
    };

    const handleToggle = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>✅ Stateful Todo List</h3>
            
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
                    <Button onClick={handleAdd} variant="success">Add</Button>
                </div>
            </form>

            {todos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#7f8c8d' }}>
                    No todos yet
                </div>
            ) : (
                todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                ))
            )}

            <div style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#e8f4f8',
                borderRadius: '4px',
                fontSize: '14px'
            }}>
                <strong>Stats:</strong> {todos.length} total, {todos.filter(t => !t.completed).length} active
            </div>
        </div>
    );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

/**
 * StatefulAndStatelessDemo - Main demonstration component
 * 
 * @returns {JSX.Element} Complete demonstration of stateful and stateless components
 */
function StatefulAndStatelessDemo() {
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
                        Stateful and Stateless Components
                    </h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '16px'
                    }}>
                        Separating state management from presentation
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    <Counter />
                    <UserList />
                    <TodoList />
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 Pattern Explanation
                    </h3>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '16px',
                        marginBottom: '16px'
                    }}>
                        <div style={{
                            padding: '16px',
                            backgroundColor: '#e8f4f8',
                            borderRadius: '4px',
                            border: '2px solid #3498db'
                        }}>
                            <h4 style={{ margin: '0 0 8px 0', color: '#3498db' }}>Stateful Components</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6' }}>
                                <li>Manage state with useState/useReducer</li>
                                <li>Handle business logic</li>
                                <li>Fetch and manage data</li>
                                <li>Pass data to stateless components</li>
                            </ul>
                        </div>

                        <div style={{
                            padding: '16px',
                            backgroundColor: '#e8f8f0',
                            borderRadius: '4px',
                            border: '2px solid #27ae60'
                        }}>
                            <h4 style={{ margin: '0 0 8px 0', color: '#27ae60' }}>Stateless Components</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6' }}>
                                <li>Receive data via props</li>
                                <li>Focus on presentation</li>
                                <li>Highly reusable</li>
                                <li>Easy to test</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{
                        padding: '12px',
                        backgroundColor: '#fff4e8',
                        borderRadius: '4px',
                        border: '1px solid #f39c12'
                    }}>
                        <strong>Benefits:</strong>
                        <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6' }}>
                            <li><strong>Separation of Concerns:</strong> Logic separated from presentation</li>
                            <li><strong>Reusability:</strong> Stateless components can be reused anywhere</li>
                            <li><strong>Testability:</strong> Easier to test both types independently</li>
                            <li><strong>Maintainability:</strong> Changes to logic don't affect presentation</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatefulAndStatelessDemo;
