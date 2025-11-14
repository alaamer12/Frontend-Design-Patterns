import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * CUSTOM HOOKS PATTERN DEMONSTRATION
 * 
 * Custom hooks allow you to extract and reuse stateful logic between components.
 * They follow the naming convention "use" + descriptive name.
 * 
 * Benefits:
 * - Reusable stateful logic
 * - Separation of concerns
 * - Easier testing
 * - Cleaner components
 * - Composable logic
 */

// ============================================================================
// CUSTOM HOOKS - Reusable stateful logic
// ============================================================================

/**
 * useCounter - A custom hook for counter logic
 * 
 * Encapsulates counter state and operations, making it reusable
 * across multiple components.
 * 
 * @param {number} [initialValue=0] - Initial counter value
 * @param {number} [step=1] - Increment/decrement step
 * @returns {Object} Counter state and methods
 * 
 * @example
 * const { count, increment, decrement, reset } = useCounter(0, 1);
 */
function useCounter(initialValue = 0, step = 1) {
    const [count, setCount] = useState(initialValue);

    const increment = useCallback(() => {
        setCount(prev => prev + step);
    }, [step]);

    const decrement = useCallback(() => {
        setCount(prev => prev - step);
    }, [step]);

    const reset = useCallback(() => {
        setCount(initialValue);
    }, [initialValue]);

    const setValue = useCallback((value) => {
        setCount(value);
    }, []);

    return { count, increment, decrement, reset, setValue };
}

/**
 * useDocumentTitle - A custom hook to update document title
 * 
 * Updates the browser tab title and cleans up on unmount.
 * 
 * @param {string} title - The title to set
 * @param {boolean} [retainOnUnmount=false] - Whether to keep title after unmount
 * 
 * @example
 * useDocumentTitle('Dashboard - My App');
 */
function useDocumentTitle(title, retainOnUnmount = false) {
    const prevTitleRef = useRef(document.title);

    useEffect(() => {
        document.title = title;

        return () => {
            if (!retainOnUnmount) {
                document.title = prevTitleRef.current;
            }
        };
    }, [title, retainOnUnmount]);
}

/**
 * useLocalStorage - A custom hook for localStorage with state sync
 * 
 * Persists state to localStorage and syncs across tabs.
 * 
 * @param {string} key - localStorage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @returns {Array} [storedValue, setValue] - Similar to useState
 * 
 * @example
 * const [name, setName] = useLocalStorage('userName', 'Guest');
 */
function useLocalStorage(key, initialValue) {
    // Get initial value from localStorage or use initialValue
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Update localStorage when state changes
    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setValue];
}

/**
 * useToggle - A custom hook for boolean toggle logic
 * 
 * Simplifies boolean state management with toggle functionality.
 * 
 * @param {boolean} [initialValue=false] - Initial boolean value
 * @returns {Array} [value, toggle, setTrue, setFalse] - Toggle state and methods
 * 
 * @example
 * const [isOpen, toggle, open, close] = useToggle(false);
 */
function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue(prev => !prev);
    }, []);

    const setTrue = useCallback(() => {
        setValue(true);
    }, []);

    const setFalse = useCallback(() => {
        setValue(false);
    }, []);

    return [value, toggle, setTrue, setFalse];
}

/**
 * useFetch - A custom hook for data fetching
 * 
 * Handles loading, error, and data states for API calls.
 * 
 * @param {string} url - API endpoint URL
 * @param {Object} [options={}] - Fetch options
 * @returns {Object} { data, loading, error, refetch } - Fetch state
 * 
 * @example
 * const { data, loading, error, refetch } = useFetch('/api/users');
 */
function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [url, JSON.stringify(options)]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

/**
 * useDebounce - A custom hook for debouncing values
 * 
 * Delays updating a value until after a specified delay.
 * 
 * @param {*} value - Value to debounce
 * @param {number} [delay=500] - Delay in milliseconds
 * @returns {*} Debounced value
 * 
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 500);
 */
function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * useWindowSize - A custom hook to track window dimensions
 * 
 * Returns current window width and height, updates on resize.
 * 
 * @returns {Object} { width, height } - Window dimensions
 * 
 * @example
 * const { width, height } = useWindowSize();
 */
function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

// ============================================================================
// DEMO COMPONENTS - Using custom hooks
// ============================================================================

/**
 * CounterDemo - Demonstrates useCounter hook
 */
function CounterDemo() {
    const { count, increment, decrement, reset } = useCounter(0, 1);
    
    useDocumentTitle(`Count: ${count}`);

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#e8f4f8',
            borderRadius: '8px',
            border: '2px solid #3498db'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                🔢 useCounter Hook
            </h3>
            <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#3498db',
                textAlign: 'center',
                margin: '20px 0'
            }}>
                {count}
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button
                    onClick={decrement}
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
                    - Decrement
                </button>
                <button
                    onClick={reset}
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
                    Reset
                </button>
                <button
                    onClick={increment}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    + Increment
                </button>
            </div>
        </div>
    );
}

/**
 * LocalStorageDemo - Demonstrates useLocalStorage hook
 */
function LocalStorageDemo() {
    const [name, setName] = useLocalStorage('userName', '');
    const [theme, setTheme] = useLocalStorage('theme', 'light');

    return (
        <div style={{
            padding: '20px',
            backgroundColor: theme === 'dark' ? '#2c3e50' : '#f8f9fa',
            borderRadius: '8px',
            border: '2px solid #9b59b6',
            color: theme === 'dark' ? 'white' : '#2c3e50'
        }}>
            <h3 style={{ marginTop: 0 }}>
                💾 useLocalStorage Hook
            </h3>
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                    Your Name:
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    style={{
                        padding: '10px',
                        border: '2px solid #9b59b6',
                        borderRadius: '4px',
                        fontSize: '14px',
                        width: '100%',
                        boxSizing: 'border-box'
                    }}
                />
            </div>
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={theme === 'dark'}
                        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                    />
                    <span style={{ fontWeight: 'bold' }}>Dark Mode</span>
                </label>
            </div>
            <p style={{ fontSize: '14px', opacity: 0.8 }}>
                {name ? `Hello, ${name}!` : 'Enter your name above'}
                <br />
                <small>Data persists in localStorage</small>
            </p>
        </div>
    );
}

/**
 * ToggleDemo - Demonstrates useToggle hook
 */
function ToggleDemo() {
    const [isVisible, toggle, show, hide] = useToggle(false);

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#e8f8f0',
            borderRadius: '8px',
            border: '2px solid #27ae60'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                🔄 useToggle Hook
            </h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button
                    onClick={toggle}
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
                    Toggle
                </button>
                <button
                    onClick={show}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Show
                </button>
                <button
                    onClick={hide}
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
                    Hide
                </button>
            </div>
            {isVisible && (
                <div style={{
                    padding: '16px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid #27ae60',
                    animation: 'fadeIn 0.3s ease-in'
                }}>
                    <p style={{ margin: 0, color: '#2c3e50' }}>
                        🎉 This content is now visible!
                    </p>
                </div>
            )}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

/**
 * WindowSizeDemo - Demonstrates useWindowSize hook
 */
function WindowSizeDemo() {
    const { width, height } = useWindowSize();

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#fff4e8',
            borderRadius: '8px',
            border: '2px solid #f39c12'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                📐 useWindowSize Hook
            </h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px'
            }}>
                <div style={{
                    padding: '16px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f39c12' }}>
                        {width}px
                    </div>
                    <div style={{ fontSize: '14px', color: '#7f8c8d' }}>Width</div>
                </div>
                <div style={{
                    padding: '16px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f39c12' }}>
                        {height}px
                    </div>
                    <div style={{ fontSize: '14px', color: '#7f8c8d' }}>Height</div>
                </div>
            </div>
            <p style={{ fontSize: '14px', color: '#7f8c8d', marginTop: '12px', marginBottom: 0 }}>
                Resize your browser window to see the values update
            </p>
        </div>
    );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

/**
 * CustomHookDemo - Main component demonstrating custom hooks pattern
 * 
 * @returns {JSX.Element} Complete demonstration of custom hooks
 */
function CustomHookDemo() {
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
                        Custom Hooks Pattern
                    </h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '16px'
                    }}>
                        Reusable stateful logic extracted into custom hooks
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    <CounterDemo />
                    <LocalStorageDemo />
                    <ToggleDemo />
                    <WindowSizeDemo />
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 Custom Hooks Benefits
                    </h3>
                    <ul style={{ color: '#34495e', lineHeight: '1.8' }}>
                        <li><strong>Reusability:</strong> Share stateful logic across components</li>
                        <li><strong>Separation of Concerns:</strong> Extract logic from UI</li>
                        <li><strong>Testability:</strong> Test hooks independently</li>
                        <li><strong>Composition:</strong> Combine hooks to create complex logic</li>
                        <li><strong>Cleaner Components:</strong> Keep components focused on rendering</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CustomHookDemo;
