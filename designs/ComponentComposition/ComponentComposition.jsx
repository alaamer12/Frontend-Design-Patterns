import React, { useEffect, useState } from 'react';

/**
 * COMPONENT COMPOSITION PATTERN DEMONSTRATION
 * 
 * This pattern separates components into two main categories:
 * 1. Container Components (Smart): Handle logic, state, and data fetching
 * 2. Presentational Components (Dumb): Handle UI rendering and display
 * 
 * Benefits:
 * - Clear separation of concerns
 * - Improved reusability
 * - Easier testing and maintenance
 * - Better code organization
 */

// ============================================================================
// MOCK DATA - Simulating API response
// ============================================================================

/**
 * Mock user data for demonstration purposes
 * In a real application, this would come from an API
 */
const mockUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Developer"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Designer"
    },
    {
        id: 3,
        name: "Joe Wilson",
        email: "joe.wilson@example.com",
        role: "Product Manager"
    },
];

// ============================================================================
// PRESENTATIONAL COMPONENTS - Concerned with how things look
// ============================================================================

/**
 * UserCard - A presentational component for displaying user information
 * 
 * This component is purely presentational - it receives data via props
 * and renders UI elements. It has no state or side effects.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - User object to display
 * @param {number} props.user.id - User ID
 * @param {string} props.user.name - User's full name
 * @param {string} props.user.email - User's email address
 * @param {string} props.user.role - User's role/position
 * @returns {JSX.Element} A styled user card
 * 
 * @example
 * <UserCard user={{ id: 1, name: "John", email: "john@example.com", role: "Dev" }} />
 */
function UserCard({ user }) {
    return (
        <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
        }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>
                {user.name}
            </h3>
            <p style={{ margin: '4px 0', color: '#7f8c8d', fontSize: '14px' }}>
                📧 {user.email}
            </p>
            <p style={{ margin: '4px 0', color: '#3498db', fontSize: '14px', fontWeight: 'bold' }}>
                👤 {user.role}
            </p>
        </div>
    );
}

/**
 * UserList - A presentational component for rendering a list of users
 * 
 * This component receives data and renders it without managing any state.
 * It's reusable and can display any array of user objects.
 * 
 * @param {Object} props - Component props
 * @param {Array<Object>} props.data - Array of user objects to display
 * @param {Function} [props.onUserClick] - Optional callback when user is clicked
 * @returns {JSX.Element} A list of user cards
 * 
 * @example
 * <UserList data={users} onUserClick={(user) => console.log(user)} />
 */
function UserList({ data, onUserClick }) {
    // Handle empty data gracefully
    if (!data || data.length === 0) {
        return (
            <div style={{
                padding: '20px',
                textAlign: 'center',
                color: '#95a5a6'
            }}>
                No users found
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        }}>
            {data.map((user) => (
                <div
                    key={user.id}
                    onClick={() => onUserClick && onUserClick(user)}
                >
                    <UserCard user={user} />
                </div>
            ))}
        </div>
    );
}

/**
 * LoadingSpinner - A presentational component for loading state
 * 
 * @returns {JSX.Element} A loading indicator
 */
function LoadingSpinner() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            color: '#3498db'
        }}>
            <div style={{
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite'
            }} />
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

/**
 * ErrorMessage - A presentational component for error display
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @returns {JSX.Element} An error message display
 */
function ErrorMessage({ message }) {
    return (
        <div style={{
            padding: '16px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px',
            color: '#c33',
            textAlign: 'center'
        }}>
            ⚠️ {message}
        </div>
    );
}

// ============================================================================
// CONTAINER COMPONENTS - Concerned with how things work
// ============================================================================

/**
 * UserListContainer - A container component managing user data
 * 
 * This component handles all the logic:
 * - State management
 * - Data fetching (simulated)
 * - Error handling
 * - Loading states
 * 
 * It passes data down to presentational components for rendering.
 * 
 * @returns {JSX.Element} The user list with managed state
 * 
 * @example
 * <UserListContainer />
 */
function UserListContainer() {
    // State management
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Simulates fetching data from an API
     * In a real application, this would be an actual API call
     */
    useEffect(() => {
        // Simulate API call delay
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Simulate potential error (10% chance)
                if (Math.random() < 0.1) {
                    throw new Error('Failed to fetch users');
                }

                // Set the data
                setUsers(mockUsers);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

        // Cleanup function
        return () => {
            // Cancel any pending requests if needed
        };
    }, []); // Run once on mount

    /**
     * Handle user click event
     * @param {Object} user - The clicked user object
     */
    const handleUserClick = (user) => {
        alert(`Clicked on ${user.name}\nRole: ${user.role}\nEmail: ${user.email}`);
    };

    // Render loading state
    if (loading) {
        return <LoadingSpinner />;
    }

    // Render error state
    if (error) {
        return <ErrorMessage message={error} />;
    }

    // Render data
    return (
        <div style={{ padding: '20px' }}>
            <div style={{
                marginBottom: '16px',
                padding: '12px',
                backgroundColor: '#ecf0f1',
                borderRadius: '4px'
            }}>
                <p style={{ margin: 0, color: '#2c3e50' }}>
                    <strong>Total Users:</strong> {users.length}
                </p>
            </div>
            <UserList data={users} onUserClick={handleUserClick} />
        </div>
    );
}

// ============================================================================
// LAYOUT COMPONENTS - Composition of containers and presentational components
// ============================================================================

/**
 * ComponentCompositionDemo - Main demo component
 * 
 * This component demonstrates the composition pattern by combining
 * container and presentational components into a complete feature.
 * 
 * @returns {JSX.Element} Complete component composition demo
 */
function ComponentComposition() {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f5f6fa'
        }}>
            <header style={{
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '24px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ margin: '0 0 8px 0' }}>
                    Component Composition Pattern
                </h1>
                <p style={{
                    margin: 0,
                    opacity: 0.9,
                    fontSize: '14px'
                }}>
                    Separating Container (Logic) from Presentational (UI) Components
                </p>
            </header>

            <main style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '24px'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{
                        marginTop: 0,
                        color: '#2c3e50',
                        borderBottom: '2px solid #3498db',
                        paddingBottom: '8px'
                    }}>
                        User Directory
                    </h2>

                    {/* Container component manages all the logic */}
                    <UserListContainer />
                </div>

                <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    backgroundColor: '#e8f4f8',
                    borderRadius: '8px',
                    border: '1px solid #b8dce8'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 Pattern Explanation
                    </h3>
                    <ul style={{ color: '#34495e', lineHeight: '1.6' }}>
                        <li><strong>Container (UserListContainer):</strong> Manages state, handles data fetching, and business logic</li>
                        <li><strong>Presentational (UserList, UserCard):</strong> Receives props and renders UI elements</li>
                        <li><strong>Benefits:</strong> Clear separation, easier testing, better reusability</li>
                    </ul>
                </div>
            </main>

            <footer style={{
                backgroundColor: '#34495e',
                color: 'white',
                padding: '16px',
                textAlign: 'center',
                marginTop: '40px'
            }}>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                    Component Composition: Building complex UIs from simple, reusable pieces
                </p>
            </footer>
        </div>
    );
}

export default ComponentComposition;
