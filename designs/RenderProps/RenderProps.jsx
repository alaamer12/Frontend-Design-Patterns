import React, { useState, useEffect } from 'react';

/**
 * RENDER PROPS PATTERN DEMONSTRATION
 * 
 * Render props is a technique for sharing code between components using
 * a prop whose value is a function that returns a React element.
 * 
 * Benefits:
 * - Code reuse
 * - Flexible rendering
 * - Inversion of control
 * - Dynamic composition
 * - Clear data flow
 */

// ============================================================================
// MOUSE TRACKER WITH RENDER PROPS
// ============================================================================

/**
 * MouseTracker - Component that tracks mouse position
 * 
 * @param {Object} props - Component props
 * @param {Function} props.render - Render function receiving mouse position
 * @returns {JSX.Element} Rendered content
 */
function MouseTracker({ render }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return render(position);
}

// ============================================================================
// DATA FETCHER WITH RENDER PROPS
// ============================================================================

/**
 * DataFetcher - Component that fetches data and provides it via render prop
 * 
 * @param {Object} props - Component props
 * @param {string} props.url - URL to fetch from
 * @param {Function} props.render - Render function receiving data, loading, error
 * @returns {JSX.Element} Rendered content
 */
function DataFetcher({ url, render }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setData({ message: `Data from ${url}`, items: [1, 2, 3, 4, 5] });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return render({ data, loading, error });
}

// ============================================================================
// TOGGLE WITH RENDER PROPS
// ============================================================================

/**
 * Toggle - Component that manages toggle state
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.defaultOn=false] - Initial toggle state
 * @param {Function} props.render - Render function receiving toggle state and methods
 * @returns {JSX.Element} Rendered content
 */
function Toggle({ defaultOn = false, render }) {
    const [on, setOn] = useState(defaultOn);

    const toggle = () => setOn(!on);
    const setTrue = () => setOn(true);
    const setFalse = () => setOn(false);

    return render({ on, toggle, setTrue, setFalse });
}

// ============================================================================
// FORM WITH RENDER PROPS
// ============================================================================

/**
 * Form - Component that manages form state
 * 
 * @param {Object} props - Component props
 * @param {Object} props.initialValues - Initial form values
 * @param {Function} props.onSubmit - Submit handler
 * @param {Function} props.render - Render function receiving form state and methods
 * @returns {JSX.Element} Rendered content
 */
function Form({ initialValues = {}, onSubmit, render }) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (name, value) => {
        setValues(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
    };

    const validate = (validationRules) => {
        const newErrors = {};
        Object.keys(validationRules).forEach(field => {
            const error = validationRules[field](values[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return render({
        values,
        errors,
        handleChange,
        handleSubmit,
        validate
    });
}

// ============================================================================
// DEMO COMPONENTS
// ============================================================================

function MouseDemo() {
    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            minHeight: '200px'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>🖱️ Mouse Tracker</h3>
            <MouseTracker
                render={({ x, y }) => (
                    <div>
                        <p style={{ color: '#7f8c8d' }}>Move your mouse around!</p>
                        <div style={{
                            padding: '16px',
                            backgroundColor: '#e8f4f8',
                            borderRadius: '4px',
                            border: '2px solid #3498db'
                        }}>
                            <strong>Mouse Position:</strong>
                            <div>X: {x}px</div>
                            <div>Y: {y}px</div>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                left: x,
                                top: y,
                                width: '20px',
                                height: '20px',
                                backgroundColor: '#3498db',
                                borderRadius: '50%',
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                                zIndex: 9999
                            }}
                        />
                    </div>
                )}
            />
        </div>
    );
}

function DataDemo() {
    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>📦 Data Fetcher</h3>
            <DataFetcher
                url="/api/data"
                render={({ data, loading, error }) => {
                    if (loading) {
                        return (
                            <div style={{ textAlign: 'center', padding: '20px', color: '#7f8c8d' }}>
                                Loading data...
                            </div>
                        );
                    }

                    if (error) {
                        return (
                            <div style={{
                                padding: '16px',
                                backgroundColor: '#fee',
                                border: '1px solid #fcc',
                                borderRadius: '4px',
                                color: '#c33'
                            }}>
                                Error: {error}
                            </div>
                        );
                    }

                    return (
                        <div style={{
                            padding: '16px',
                            backgroundColor: '#e8f8f0',
                            borderRadius: '4px',
                            border: '2px solid #27ae60'
                        }}>
                            <strong>{data.message}</strong>
                            <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                                {data.items.map((item, i) => (
                                    <li key={i}>Item {item}</li>
                                ))}
                            </ul>
                        </div>
                    );
                }}
            />
        </div>
    );
}

function ToggleDemo() {
    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>🔄 Toggle</h3>
            <Toggle
                render={({ on, toggle, setTrue, setFalse }) => (
                    <div>
                        <div style={{
                            padding: '16px',
                            marginBottom: '16px',
                            backgroundColor: on ? '#e8f8f0' : '#f8f9fa',
                            borderRadius: '4px',
                            border: `2px solid ${on ? '#27ae60' : '#95a5a6'}`,
                            textAlign: 'center'
                        }}>
                            <strong>Status: {on ? 'ON ✅' : 'OFF ❌'}</strong>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={toggle}
                                style={{
                                    flex: 1,
                                    padding: '10px',
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
                                onClick={setTrue}
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
                                Turn ON
                            </button>
                            <button
                                onClick={setFalse}
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
                                Turn OFF
                            </button>
                        </div>
                    </div>
                )}
            />
        </div>
    );
}

function FormDemo() {
    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>📝 Form</h3>
            <Form
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => alert(`Submitted: ${JSON.stringify(values, null, 2)}`)}
                render={({ values, errors, handleChange, handleSubmit, validate }) => (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const isValid = validate({
                            email: (val) => !val ? 'Email required' : !/\S+@\S+/.test(val) ? 'Invalid email' : null,
                            password: (val) => !val ? 'Password required' : val.length < 6 ? 'Min 6 characters' : null
                        });
                        if (isValid) handleSubmit(e);
                    }}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                                Email:
                            </label>
                            <input
                                type="email"
                                value={values.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: `2px solid ${errors.email ? '#e74c3c' : '#e0e0e0'}`,
                                    borderRadius: '4px',
                                    boxSizing: 'border-box'
                                }}
                            />
                            {errors.email && (
                                <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.email}
                                </div>
                            )}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                                Password:
                            </label>
                            <input
                                type="password"
                                value={values.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: `2px solid ${errors.password ? '#e74c3c' : '#e0e0e0'}`,
                                    borderRadius: '4px',
                                    boxSizing: 'border-box'
                                }}
                            />
                            {errors.password && (
                                <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.password}
                                </div>
                            )}
                        </div>
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
                            Submit
                        </button>
                    </form>
                )}
            />
        </div>
    );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

function RenderPropsDemo() {
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
                        Render Props Pattern
                    </h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '16px'
                    }}>
                        Sharing code using a function prop that returns React elements
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    <MouseDemo />
                    <DataDemo />
                    <ToggleDemo />
                    <FormDemo />
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 Render Props Benefits
                    </h3>
                    <ul style={{ color: '#34495e', lineHeight: '1.8' }}>
                        <li><strong>Code Reuse:</strong> Share logic across components</li>
                        <li><strong>Flexibility:</strong> Complete control over rendering</li>
                        <li><strong>Composition:</strong> Easy to compose multiple render props</li>
                        <li><strong>Clear Data Flow:</strong> Explicit data passing</li>
                        <li><strong>No Naming Conflicts:</strong> Unlike HOCs, no prop name collisions</li>
                    </ul>
                    <div style={{
                        marginTop: '16px',
                        padding: '12px',
                        backgroundColor: '#e8f4f8',
                        borderRadius: '4px',
                        border: '1px solid #b8dce8'
                    }}>
                        <strong>Note:</strong> While render props are powerful, modern React often prefers
                        Custom Hooks for sharing logic. However, render props are still useful for
                        component composition and are used in libraries like React Router and Formik.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RenderPropsDemo;
