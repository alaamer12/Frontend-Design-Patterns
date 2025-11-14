import React, { useState } from 'react';

/**
 * FACTORY PATTERN DEMONSTRATION
 * 
 * Factory pattern provides an interface for creating objects without specifying
 * their exact classes. It encapsulates object creation logic.
 * 
 * Benefits:
 * - Encapsulates object creation
 * - Loose coupling
 * - Easy to extend
 * - Centralized creation logic
 * - Consistent object creation
 */

// ============================================================================
// BUTTON FACTORY
// ============================================================================

const ButtonFactory = {
    createButton(type, props = {}) {
        const buttons = {
            primary: (props) => (
                <button
                    {...props}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        ...props.style
                    }}
                >
                    {props.children || 'Primary Button'}
                </button>
            ),
            secondary: (props) => (
                <button
                    {...props}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#95a5a6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        ...props.style
                    }}
                >
                    {props.children || 'Secondary Button'}
                </button>
            ),
            danger: (props) => (
                <button
                    {...props}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        ...props.style
                    }}
                >
                    {props.children || 'Danger Button'}
                </button>
            ),
            success: (props) => (
                <button
                    {...props}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        ...props.style
                    }}
                >
                    {props.children || 'Success Button'}
                </button>
            )
        };

        const ButtonComponent = buttons[type];
        return ButtonComponent ? <ButtonComponent {...props} /> : null;
    }
};

// ============================================================================
// NOTIFICATION FACTORY
// ============================================================================

const NotificationFactory = {
    createNotification(type, message) {
        const configs = {
            success: { icon: '✓', bg: '#27ae60', title: 'Success' },
            error: { icon: '✗', bg: '#e74c3c', title: 'Error' },
            warning: { icon: '⚠', bg: '#f39c12', title: 'Warning' },
            info: { icon: 'ℹ', bg: '#3498db', title: 'Info' }
        };

        const config = configs[type] || configs.info;

        return (
            <div style={{
                padding: '16px',
                backgroundColor: config.bg,
                color: 'white',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
            }}>
                <span style={{ fontSize: '24px' }}>{config.icon}</span>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold' }}>{config.title}</div>
                    <div style={{ fontSize: '14px' }}>{message}</div>
                </div>
            </div>
        );
    }
};

// ============================================================================
// FORM FIELD FACTORY
// ============================================================================

const FormFieldFactory = {
    createField(type, props = {}) {
        const fields = {
            text: (props) => (
                <input
                    type="text"
                    {...props}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        ...props.style
                    }}
                />
            ),
            email: (props) => (
                <input
                    type="email"
                    {...props}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        ...props.style
                    }}
                />
            ),
            textarea: (props) => (
                <textarea
                    {...props}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        minHeight: '100px',
                        fontFamily: 'inherit',
                        ...props.style
                    }}
                />
            ),
            select: (props) => (
                <select
                    {...props}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        ...props.style
                    }}
                >
                    {props.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            )
        };

        const FieldComponent = fields[type];
        return FieldComponent ? <FieldComponent {...props} /> : null;
    }
};

// ============================================================================
// DEMO COMPONENTS
// ============================================================================

function ButtonFactoryDemo() {
    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>🏭 Button Factory</h3>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                Create different button types from a single factory
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['primary', 'secondary', 'danger', 'success'].map(type => (
                    <div key={type}>
                        {ButtonFactory.createButton(type, {
                            onClick: () => alert(`${type} clicked!`),
                            children: `${type.charAt(0).toUpperCase() + type.slice(1)}`
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

function NotificationFactoryDemo() {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (type) => {
        const messages = {
            success: 'Operation completed successfully!',
            error: 'An error occurred!',
            warning: 'Please check your input!',
            info: 'Here is some information.'
        };
        setNotifications([...notifications, { type, message: messages[type], id: Date.now() }]);
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>🔔 Notification Factory</h3>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                Create different notification types
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {['success', 'error', 'warning', 'info'].map(type => (
                    <button
                        key={type}
                        onClick={() => addNotification(type)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#ecf0f1',
                            color: '#2c3e50',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            textTransform: 'capitalize'
                        }}
                    >
                        {type}
                    </button>
                ))}
            </div>
            <div>
                {notifications.map(notif => (
                    <div key={notif.id}>
                        {NotificationFactory.createNotification(notif.type, notif.message)}
                    </div>
                ))}
            </div>
        </div>
    );
}

function FormFieldFactoryDemo() {
    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>📝 Form Field Factory</h3>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                Create different form field types
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                        Text Input:
                    </label>
                    {FormFieldFactory.createField('text', { placeholder: 'Enter text...' })}
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                        Email Input:
                    </label>
                    {FormFieldFactory.createField('email', { placeholder: 'Enter email...' })}
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                        Textarea:
                    </label>
                    {FormFieldFactory.createField('textarea', { placeholder: 'Enter message...' })}
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                        Select:
                    </label>
                    {FormFieldFactory.createField('select', {
                        options: [
                            { value: '1', label: 'Option 1' },
                            { value: '2', label: 'Option 2' },
                            { value: '3', label: 'Option 3' }
                        ]
                    })}
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

function FactoryPatternDemo() {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f5f6fa',
            padding: '40px 20px'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ color: '#2c3e50', marginBottom: '8px' }}>
                        Factory Pattern
                    </h1>
                    <p style={{ color: '#7f8c8d', fontSize: '16px' }}>
                        Encapsulate object creation logic
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    <ButtonFactoryDemo />
                    <NotificationFactoryDemo />
                    <FormFieldFactoryDemo />
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 Factory Pattern Benefits
                    </h3>
                    <ul style={{ color: '#34495e', lineHeight: '1.8' }}>
                        <li><strong>Encapsulation:</strong> Object creation logic in one place</li>
                        <li><strong>Flexibility:</strong> Easy to add new types</li>
                        <li><strong>Consistency:</strong> Uniform object creation</li>
                        <li><strong>Loose Coupling:</strong> Client code doesn't know concrete classes</li>
                        <li><strong>Maintainability:</strong> Changes in one place</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FactoryPatternDemo;
