import React, { useState } from 'react';

/**
 * CONTROLLED PROPS PATTERN DEMONSTRATION
 * 
 * This pattern allows components to work in both controlled and uncontrolled modes.
 * In controlled mode, the parent manages the state. In uncontrolled mode, the
 * component manages its own internal state.
 * 
 * Benefits:
 * - Flexibility for different use cases
 * - Parent can control component behavior when needed
 * - Component can work independently when parent doesn't need control
 * - Common in form libraries and UI components
 */

// ============================================================================
// CONTROLLED COMPONENT - State managed by parent
// ============================================================================

/**
 * ControlledInput - A fully controlled input component
 * 
 * This component receives its value and onChange handler from the parent.
 * It has no internal state and is completely controlled by the parent.
 * 
 * @param {Object} props - Component props
 * @param {string} props.value - Current input value (controlled by parent)
 * @param {Function} props.onChange - Change handler (controlled by parent)
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {string} [props.type='text'] - Input type
 * @returns {JSX.Element} Controlled input element
 * 
 * @example
 * const [value, setValue] = useState('');
 * <ControlledInput 
 *   value={value} 
 *   onChange={(e) => setValue(e.target.value)} 
 * />
 */
function ControlledInput({ value, onChange, placeholder = '', type = 'text' }) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
                padding: '10px',
                border: '2px solid #3498db',
                borderRadius: '4px',
                fontSize: '14px',
                width: '100%',
                boxSizing: 'border-box'
            }}
        />
    );
}

// ============================================================================
// UNCONTROLLED COMPONENT - Manages its own state
// ============================================================================

/**
 * UncontrolledInput - An input component that manages its own state
 * 
 * This component maintains its own internal state and only notifies
 * the parent when the value changes (if a callback is provided).
 * 
 * @param {Object} props - Component props
 * @param {string} [props.defaultValue=''] - Initial value
 * @param {Function} [props.onValueChange] - Optional callback when value changes
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {string} [props.type='text'] - Input type
 * @returns {JSX.Element} Uncontrolled input element
 * 
 * @example
 * <UncontrolledInput 
 *   defaultValue="Hello" 
 *   onValueChange={(value) => console.log(value)} 
 * />
 */
function UncontrolledInput({ 
    defaultValue = '', 
    onValueChange, 
    placeholder = '', 
    type = 'text' 
}) {
    const [internalValue, setInternalValue] = useState(defaultValue);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        
        // Notify parent if callback provided
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <input
            type={type}
            value={internalValue}
            onChange={handleChange}
            placeholder={placeholder}
            style={{
                padding: '10px',
                border: '2px solid #27ae60',
                borderRadius: '4px',
                fontSize: '14px',
                width: '100%',
                boxSizing: 'border-box'
            }}
        />
    );
}

// ============================================================================
// HYBRID COMPONENT - Can work in both modes
// ============================================================================

/**
 * FlexibleInput - A component that can work in both controlled and uncontrolled modes
 * 
 * This component checks if a 'value' prop is provided. If yes, it works in controlled
 * mode. If no, it manages its own state (uncontrolled mode).
 * 
 * @param {Object} props - Component props
 * @param {string} [props.value] - Controlled value (if provided, component is controlled)
 * @param {string} [props.defaultValue=''] - Default value for uncontrolled mode
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {string} [props.type='text'] - Input type
 * @returns {JSX.Element} Flexible input element
 * 
 * @example
 * // Controlled mode
 * <FlexibleInput value={value} onChange={(e) => setValue(e.target.value)} />
 * 
 * // Uncontrolled mode
 * <FlexibleInput defaultValue="Hello" onChange={(e) => console.log(e.target.value)} />
 */
function FlexibleInput({ 
    value: controlledValue, 
    defaultValue = '', 
    onChange, 
    placeholder = '', 
    type = 'text' 
}) {
    // Internal state for uncontrolled mode
    const [internalValue, setInternalValue] = useState(defaultValue);
    
    // Determine if component is controlled
    const isControlled = controlledValue !== undefined;
    
    // Use controlled value if provided, otherwise use internal state
    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (e) => {
        const newValue = e.target.value;
        
        // Update internal state only in uncontrolled mode
        if (!isControlled) {
            setInternalValue(newValue);
        }
        
        // Call onChange callback if provided
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <input
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            style={{
                padding: '10px',
                border: '2px solid #9b59b6',
                borderRadius: '4px',
                fontSize: '14px',
                width: '100%',
                boxSizing: 'border-box'
            }}
        />
    );
}

// ============================================================================
// DEMO COMPONENTS
// ============================================================================

/**
 * ControlledDemo - Demonstrates controlled input usage
 */
function ControlledDemo() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Controlled Form Submitted!\nEmail: ${email}\nPassword: ${password}`);
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#e8f4f8',
            borderRadius: '8px',
            border: '2px solid #3498db'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                🎮 Controlled Components
            </h3>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                Parent component manages all state. Every keystroke updates parent state.
            </p>
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2c3e50' }}>
                        Email:
                    </label>
                    <ControlledInput
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2c3e50' }}>
                        Password:
                    </label>
                    <ControlledInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>

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
                    Submit Controlled Form
                </button>
            </form>

            <div style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '4px',
                fontSize: '14px'
            }}>
                <strong>Current Values:</strong>
                <div>Email: {email || '(empty)'}</div>
                <div>Password: {password ? '•'.repeat(password.length) : '(empty)'}</div>
            </div>
        </div>
    );
}

/**
 * UncontrolledDemo - Demonstrates uncontrolled input usage
 */
function UncontrolledDemo() {
    const [submittedData, setSubmittedData] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            username: formData.get('username'),
            bio: formData.get('bio')
        };
        setSubmittedData(data);
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#e8f8f0',
            borderRadius: '8px',
            border: '2px solid #27ae60'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                🆓 Uncontrolled Components
            </h3>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                Component manages its own state. Parent only gets data on submit.
            </p>
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2c3e50' }}>
                        Username:
                    </label>
                    <UncontrolledInput
                        defaultValue="johndoe"
                        placeholder="Enter username"
                        onValueChange={(value) => console.log('Username changed:', value)}
                    />
                    <input type="hidden" name="username" />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2c3e50' }}>
                        Bio:
                    </label>
                    <textarea
                        name="bio"
                        defaultValue="Software developer"
                        placeholder="Tell us about yourself"
                        style={{
                            padding: '10px',
                            border: '2px solid #27ae60',
                            borderRadius: '4px',
                            fontSize: '14px',
                            width: '100%',
                            boxSizing: 'border-box',
                            minHeight: '80px',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>

                <button
                    type="submit"
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
                    Submit Uncontrolled Form
                </button>
            </form>

            {submittedData && (
                <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    fontSize: '14px'
                }}>
                    <strong>Submitted Data:</strong>
                    <div>Username: {submittedData.username}</div>
                    <div>Bio: {submittedData.bio}</div>
                </div>
            )}
        </div>
    );
}

/**
 * FlexibleDemo - Demonstrates hybrid component usage
 */
function FlexibleDemo() {
    const [controlledMode, setControlledMode] = useState(true);
    const [value, setValue] = useState('Controlled value');

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f4e8f8',
            borderRadius: '8px',
            border: '2px solid #9b59b6'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                🔄 Flexible Component (Both Modes)
            </h3>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                This component can work in both controlled and uncontrolled modes.
            </p>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={controlledMode}
                        onChange={(e) => setControlledMode(e.target.checked)}
                    />
                    <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        Use Controlled Mode
                    </span>
                </label>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2c3e50' }}>
                    Input ({controlledMode ? 'Controlled' : 'Uncontrolled'}):
                </label>
                {controlledMode ? (
                    <FlexibleInput
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Controlled mode"
                    />
                ) : (
                    <FlexibleInput
                        defaultValue="Uncontrolled value"
                        onChange={(e) => console.log('Changed:', e.target.value)}
                        placeholder="Uncontrolled mode"
                    />
                )}
            </div>

            {controlledMode && (
                <div style={{
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    fontSize: '14px'
                }}>
                    <strong>Current Value:</strong> {value}
                </div>
            )}
        </div>
    );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

/**
 * ControlledPropsDemo - Main component demonstrating the controlled props pattern
 * 
 * @returns {JSX.Element} Complete demonstration of controlled vs uncontrolled components
 */
function ControlledPropsDemo() {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f5f6fa',
            padding: '40px 20px'
        }}>
            <div style={{
                maxWidth: '1000px',
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
                        Controlled Props Pattern
                    </h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '16px'
                    }}>
                        Understanding Controlled vs Uncontrolled Components
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    <ControlledDemo />
                    <UncontrolledDemo />
                </div>

                <FlexibleDemo />

                <div style={{
                    marginTop: '24px',
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 Key Differences
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '16px'
                    }}>
                        <div>
                            <h4 style={{ color: '#3498db', marginTop: 0 }}>Controlled</h4>
                            <ul style={{ color: '#34495e', lineHeight: '1.8', paddingLeft: '20px' }}>
                                <li>Parent manages state</li>
                                <li>Single source of truth</li>
                                <li>Easy to validate/transform</li>
                                <li>More predictable</li>
                                <li>More boilerplate code</li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: '#27ae60', marginTop: 0 }}>Uncontrolled</h4>
                            <ul style={{ color: '#34495e', lineHeight: '1.8', paddingLeft: '20px' }}>
                                <li>Component manages state</li>
                                <li>Less code to write</li>
                                <li>Good for simple forms</li>
                                <li>Uses refs for access</li>
                                <li>Less predictable</li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: '#9b59b6', marginTop: 0 }}>Flexible</h4>
                            <ul style={{ color: '#34495e', lineHeight: '1.8', paddingLeft: '20px' }}>
                                <li>Works in both modes</li>
                                <li>Best of both worlds</li>
                                <li>Common in libraries</li>
                                <li>More complex to implement</li>
                                <li>Maximum flexibility</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlledPropsDemo;
