import React, { useState } from 'react';

/**
 * PROPS GETTER PATTERN DEMONSTRATION
 * 
 * Props getter pattern provides functions that return props objects,
 * allowing consumers to easily apply consistent props to elements
 * while maintaining flexibility to override or extend them.
 * 
 * Benefits:
 * - Consistent prop application
 * - Flexibility to override
 * - Reduced boilerplate
 * - Better accessibility
 * - Easier to maintain
 */

// ============================================================================
// DROPDOWN WITH PROPS GETTERS
// ============================================================================

/**
 * useDropdown - Custom hook implementing props getter pattern
 * 
 * @param {Object} options - Configuration options
 * @param {boolean} [options.defaultOpen=false] - Initial open state
 * @returns {Object} Dropdown state and prop getters
 */
function useDropdown({ defaultOpen = false } = {}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    /**
     * Get props for the toggle button
     * @param {Object} props - Additional props to merge
     * @returns {Object} Props for toggle button
     */
    const getToggleButtonProps = (props = {}) => ({
        onClick: () => setIsOpen(!isOpen),
        'aria-expanded': isOpen,
        'aria-haspopup': 'listbox',
        ...props
    });

    /**
     * Get props for the menu container
     * @param {Object} props - Additional props to merge
     * @returns {Object} Props for menu
     */
    const getMenuProps = (props = {}) => ({
        role: 'listbox',
        style: {
            display: isOpen ? 'block' : 'none',
            ...props.style
        },
        ...props
    });

    /**
     * Get props for menu items
     * @param {Object} options - Item options
     * @param {number} options.index - Item index
     * @param {*} options.item - Item data
     * @param {Object} props - Additional props to merge
     * @returns {Object} Props for menu item
     */
    const getItemProps = ({ index, item }, props = {}) => ({
        role: 'option',
        'aria-selected': selectedIndex === index,
        onClick: () => {
            setSelectedIndex(index);
            setIsOpen(false);
            if (props.onClick) props.onClick(item);
        },
        ...props
    });

    return {
        isOpen,
        selectedIndex,
        getToggleButtonProps,
        getMenuProps,
        getItemProps
    };
}

/**
 * Dropdown - Component using props getter pattern
 */
function Dropdown({ items, onSelect }) {
    const {
        isOpen,
        selectedIndex,
        getToggleButtonProps,
        getMenuProps,
        getItemProps
    } = useDropdown();

    return (
        <div style={{ position: 'relative', width: '200px' }}>
            <button
                {...getToggleButtonProps({
                    style: {
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }
                })}
            >
                {selectedIndex >= 0 ? items[selectedIndex] : 'Select an option'} ▼
            </button>
            <ul
                {...getMenuProps({
                    style: {
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        margin: '4px 0 0 0',
                        padding: 0,
                        listStyle: 'none',
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        zIndex: 1000
                    }
                })}
            >
                {items.map((item, index) => (
                    <li
                        key={index}
                        {...getItemProps(
                            { index, item },
                            {
                                onClick: () => onSelect && onSelect(item),
                                style: {
                                    padding: '10px',
                                    cursor: 'pointer',
                                    backgroundColor: selectedIndex === index ? '#e8f4f8' : 'white'
                                },
                                onMouseEnter: (e) => {
                                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                                },
                                onMouseLeave: (e) => {
                                    e.currentTarget.style.backgroundColor = 
                                        selectedIndex === index ? '#e8f4f8' : 'white';
                                }
                            }
                        )}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// ============================================================================
// TOGGLE WITH PROPS GETTERS
// ============================================================================

/**
 * useToggle - Custom hook for toggle with props getters
 * 
 * @param {boolean} [initialState=false] - Initial toggle state
 * @returns {Object} Toggle state and prop getters
 */
function useToggle(initialState = false) {
    const [on, setOn] = useState(initialState);

    const getTogglerProps = (props = {}) => ({
        onClick: () => setOn(!on),
        'aria-pressed': on,
        ...props
    });

    const getStatusProps = (props = {}) => ({
        'aria-live': 'polite',
        role: 'status',
        ...props
    });

    return {
        on,
        setOn,
        getTogglerProps,
        getStatusProps
    };
}

/**
 * Toggle - Component using toggle props getter
 */
function Toggle() {
    const { on, getTogglerProps, getStatusProps } = useToggle(false);

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <button
                {...getTogglerProps({
                    style: {
                        padding: '10px 20px',
                        backgroundColor: on ? '#27ae60' : '#95a5a6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease'
                    }
                })}
            >
                {on ? 'ON' : 'OFF'}
            </button>
            <div
                {...getStatusProps({
                    style: {
                        marginTop: '12px',
                        padding: '12px',
                        backgroundColor: on ? '#e8f8f0' : '#f8f9fa',
                        borderRadius: '4px',
                        color: '#2c3e50'
                    }
                })}
            >
                The toggle is <strong>{on ? 'ON' : 'OFF'}</strong>
            </div>
        </div>
    );
}

// ============================================================================
// FORM WITH PROPS GETTERS
// ============================================================================

/**
 * useForm - Custom hook for form with props getters
 * 
 * @param {Object} initialValues - Initial form values
 * @returns {Object} Form state and prop getters
 */
function useForm(initialValues = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const getInputProps = (name, props = {}) => ({
        name,
        value: values[name] || '',
        onChange: (e) => {
            setValues({ ...values, [name]: e.target.value });
            if (errors[name]) {
                setErrors({ ...errors, [name]: null });
            }
        },
        'aria-invalid': !!errors[name],
        'aria-describedby': errors[name] ? `${name}-error` : undefined,
        ...props
    });

    const getErrorProps = (name, props = {}) => ({
        id: `${name}-error`,
        role: 'alert',
        style: {
            color: '#e74c3c',
            fontSize: '12px',
            marginTop: '4px',
            display: errors[name] ? 'block' : 'none',
            ...props.style
        },
        ...props
    });

    const validate = (validationRules) => {
        const newErrors = {};
        Object.keys(validationRules).forEach(field => {
            const error = validationRules[field](values[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return {
        values,
        errors,
        getInputProps,
        getErrorProps,
        validate,
        setErrors
    };
}

/**
 * ContactForm - Form using props getter pattern
 */
function ContactForm() {
    const { values, getInputProps, getErrorProps, validate } = useForm({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate({
            name: (value) => !value ? 'Name is required' : null,
            email: (value) => !value ? 'Email is required' : 
                   !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : null,
            message: (value) => !value ? 'Message is required' : null
        });

        if (isValid) {
            alert(`Form submitted!\n${JSON.stringify(values, null, 2)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Contact Form</h3>
            
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#2c3e50' }}>
                    Name:
                </label>
                <input
                    {...getInputProps('name', {
                        placeholder: 'Enter your name',
                        style: {
                            width: '100%',
                            padding: '10px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '4px',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                        }
                    })}
                />
                <div {...getErrorProps('name')}>
                    {getErrorProps('name').style.display === 'block' && 'Name is required'}
                </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#2c3e50' }}>
                    Email:
                </label>
                <input
                    {...getInputProps('email', {
                        type: 'email',
                        placeholder: 'Enter your email',
                        style: {
                            width: '100%',
                            padding: '10px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '4px',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                        }
                    })}
                />
                <div {...getErrorProps('email')}>
                    {getErrorProps('email').style.display === 'block' && 'Valid email is required'}
                </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#2c3e50' }}>
                    Message:
                </label>
                <textarea
                    {...getInputProps('message', {
                        placeholder: 'Enter your message',
                        rows: 4,
                        style: {
                            width: '100%',
                            padding: '10px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '4px',
                            fontSize: '14px',
                            boxSizing: 'border-box',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }
                    })}
                />
                <div {...getErrorProps('message')}>
                    {getErrorProps('message').style.display === 'block' && 'Message is required'}
                </div>
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
                    fontWeight: 'bold',
                    width: '100%'
                }}
            >
                Submit
            </button>
        </form>
    );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

/**
 * PropsGetterDemo - Main demonstration component
 * 
 * @returns {JSX.Element} Complete demonstration of props getter pattern
 */
function PropsGetterDemo() {
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
                        Props Getter Pattern
                    </h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '16px'
                    }}>
                        Providing functions that return consistent props
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    <div>
                        <h3 style={{ color: '#2c3e50' }}>Dropdown Example</h3>
                        <Dropdown 
                            items={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
                            onSelect={(item) => console.log('Selected:', item)}
                        />
                    </div>

                    <div>
                        <h3 style={{ color: '#2c3e50' }}>Toggle Example</h3>
                        <Toggle />
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ color: '#2c3e50' }}>Form Example</h3>
                    <ContactForm />
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 Props Getter Benefits
                    </h3>
                    <ul style={{ color: '#34495e', lineHeight: '1.8' }}>
                        <li><strong>Consistency:</strong> Ensures consistent props across elements</li>
                        <li><strong>Accessibility:</strong> Automatically includes ARIA attributes</li>
                        <li><strong>Flexibility:</strong> Easy to override or extend props</li>
                        <li><strong>Reduced Boilerplate:</strong> Less repetitive code</li>
                        <li><strong>Maintainability:</strong> Centralized prop logic</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PropsGetterDemo;
