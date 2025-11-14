import React, { createContext, useContext, useState } from 'react';

/**
 * PROVIDER PATTERN DEMONSTRATION
 * 
 * The Provider pattern uses React Context to share data and functionality
 * across the component tree without prop drilling.
 * 
 * Benefits:
 * - Avoid prop drilling
 * - Global state management
 * - Clean component hierarchy
 * - Easy to test
 * - Scalable architecture
 */

// ============================================================================
// THEME PROVIDER
// ============================================================================

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const value = { theme, toggleTheme };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

// ============================================================================
// AUTH PROVIDER
// ============================================================================

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (credentials) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setUser({ name: credentials.username, email: `${credentials.username}@example.com` });
            setLoading(false);
        }, 1000);
    };

    const logout = () => {
        setUser(null);
    };

    const value = { user, loading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

// ============================================================================
// CART PROVIDER
// ============================================================================

const CartContext = createContext();

function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => 
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeItem = (id) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const value = { items, addItem, removeItem, clearCart, total };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}

// ============================================================================
// DEMO COMPONENTS
// ============================================================================

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                padding: '10px 20px',
                backgroundColor: theme === 'light' ? '#2c3e50' : '#ecf0f1',
                color: theme === 'light' ? 'white' : '#2c3e50',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
            }}
        >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
}

function UserProfile() {
    const { user, loading, login, logout } = useAuth();
    const [username, setUsername] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username) {
            login({ username });
        }
    };

    if (loading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Logging in...</div>;
    }

    if (!user) {
        return (
            <form onSubmit={handleLogin} style={{
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{ marginTop: 0 }}>Login</h3>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '4px',
                        boxSizing: 'border-box'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Login
                </button>
            </form>
        );
    }

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0 }}>Welcome, {user.name}!</h3>
            <p style={{ color: '#7f8c8d' }}>{user.email}</p>
            <button
                onClick={logout}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                Logout
            </button>
        </div>
    );
}

function ProductList() {
    const { addItem } = useCart();

    const products = [
        { id: 1, name: 'Product 1', price: 29.99 },
        { id: 2, name: 'Product 2', price: 39.99 },
        { id: 3, name: 'Product 3', price: 49.99 }
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
        }}>
            {products.map(product => (
                <div
                    key={product.id}
                    style={{
                        padding: '16px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    <h4 style={{ margin: '0 0 8px 0' }}>{product.name}</h4>
                    <p style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 'bold', color: '#27ae60' }}>
                        ${product.price}
                    </p>
                    <button
                        onClick={() => addItem(product)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            backgroundColor: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}

function Cart() {
    const { items, removeItem, clearCart, total } = useCart();

    if (items.length === 0) {
        return (
            <div style={{
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#7f8c8d'
            }}>
                Your cart is empty
            </div>
        );
    }

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0 }}>Shopping Cart ({items.length})</h3>
            {items.map(item => (
                <div
                    key={item.id}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        marginBottom: '8px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px'
                    }}
                >
                    <div>
                        <strong>{item.name}</strong>
                        <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
                            ${item.price} × {item.quantity}
                        </div>
                    </div>
                    <button
                        onClick={() => removeItem(item.id)}
                        style={{
                            padding: '6px 12px',
                            backgroundColor: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Remove
                    </button>
                </div>
            ))}
            <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '2px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <strong style={{ fontSize: '18px' }}>Total: ${total.toFixed(2)}</strong>
                <button
                    onClick={clearCart}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#95a5a6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Clear Cart
                </button>
            </div>
        </div>
    );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

function ProviderPatternDemo() {
    const { theme } = useTheme();

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: theme === 'light' ? '#f5f6fa' : '#2c3e50',
            color: theme === 'light' ? '#2c3e50' : '#ecf0f1',
            padding: '40px 20px',
            transition: 'all 0.3s ease'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <header style={{
                    textAlign: 'center',
                    marginBottom: '40px'
                }}>
                    <h1 style={{ marginBottom: '8px' }}>
                        Provider Pattern
                    </h1>
                    <p style={{
                        opacity: 0.8,
                        fontSize: '16px'
                    }}>
                        Sharing state across the component tree with Context
                    </p>
                    <div style={{ marginTop: '20px' }}>
                        <ThemeToggle />
                    </div>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    <div>
                        <h3>Authentication</h3>
                        <UserProfile />
                    </div>
                    <div>
                        <h3>Shopping Cart</h3>
                        <Cart />
                    </div>
                </div>

                <div>
                    <h3>Products</h3>
                    <ProductList />
                </div>

                <div style={{
                    marginTop: '40px',
                    padding: '20px',
                    backgroundColor: theme === 'light' ? 'white' : '#34495e',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginTop: 0 }}>
                        💡 Provider Pattern Benefits
                    </h3>
                    <ul style={{ lineHeight: '1.8' }}>
                        <li><strong>No Prop Drilling:</strong> Access data anywhere in the tree</li>
                        <li><strong>Global State:</strong> Share state across unrelated components</li>
                        <li><strong>Clean Code:</strong> Cleaner component hierarchy</li>
                        <li><strong>Composable:</strong> Combine multiple providers</li>
                        <li><strong>Testable:</strong> Easy to mock providers in tests</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// APP WITH ALL PROVIDERS
// ============================================================================

function ProviderPattern() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <CartProvider>
                    <ProviderPatternDemo />
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default ProviderPattern;
