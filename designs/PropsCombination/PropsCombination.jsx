import React, { useState } from 'react';

/**
 * PROPS COMBINATION PATTERN DEMONSTRATION
 * 
 * Props combination allows creating flexible components by combining related props
 * to create different variants without creating multiple similar components.
 * 
 * Benefits:
 * - Flexible component API
 * - Reduced component duplication
 * - Easy to extend with new variants
 * - Clear prop relationships
 * - Better maintainability
 */

// ============================================================================
// BUTTON WITH PROPS COMBINATION
// ============================================================================

/**
 * Button - A flexible button component using props combination
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant (primary, secondary, danger, success)
 * @param {string} [props.size='medium'] - Button size (small, medium, large)
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {boolean} [props.loading=false] - Whether button is in loading state
 * @param {boolean} [props.fullWidth=false] - Whether button takes full width
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @returns {JSX.Element} Styled button
 */
function Button({ 
    variant = 'primary', 
    size = 'medium', 
    disabled = false,
    loading = false,
    fullWidth = false,
    onClick, 
    children 
}) {
    const variantStyles = {
        primary: { backgroundColor: '#3498db', color: 'white' },
        secondary: { backgroundColor: '#95a5a6', color: 'white' },
        danger: { backgroundColor: '#e74c3c', color: 'white' },
        success: { backgroundColor: '#27ae60', color: 'white' },
        warning: { backgroundColor: '#f39c12', color: 'white' }
    };

    const sizeStyles = {
        small: { padding: '6px 12px', fontSize: '12px' },
        medium: { padding: '10px 20px', fontSize: '14px' },
        large: { padding: '14px 28px', fontSize: '16px' }
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            style={{
                ...variantStyles[variant],
                ...sizeStyles[size],
                border: 'none',
                borderRadius: '4px',
                cursor: disabled || loading ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                fontWeight: 'bold',
                width: fullWidth ? '100%' : 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
            }}
        >
            {loading && <span>⏳</span>}
            {children}
        </button>
    );
}

// ============================================================================
// NOTIFICATION WITH PROPS COMBINATION
// ============================================================================

/**
 * Notification - A flexible notification component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.type='info'] - Notification type (success, error, warning, info)
 * @param {string} props.message - Notification message
 * @param {boolean} [props.dismissible=false] - Whether notification can be dismissed
 * @param {boolean} [props.showIcon=true] - Whether to show icon
 * @param {Function} [props.onDismiss] - Dismiss handler
 * @returns {JSX.Element} Notification component
 */
function Notification({ 
    type = 'info', 
    message, 
    dismissible = false,
    showIcon = true,
    onDismiss 
}) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const typeConfig = {
        success: { icon: '✅', bg: '#e8f8f0', border: '#27ae60', color: '#27ae60' },
        error: { icon: '❌', bg: '#fee', border: '#e74c3c', color: '#e74c3c' },
        warning: { icon: '⚠️', bg: '#fff4e8', border: '#f39c12', color: '#f39c12' },
        info: { icon: 'ℹ️', bg: '#e8f4f8', border: '#3498db', color: '#3498db' }
    };

    const config = typeConfig[type];

    const handleDismiss = () => {
        setVisible(false);
        if (onDismiss) onDismiss();
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: config.bg,
            border: `2px solid ${config.border}`,
            borderRadius: '8px',
            color: '#2c3e50'
        }}>
            {showIcon && (
                <span style={{ fontSize: '24px' }}>{config.icon}</span>
            )}
            <span style={{ flex: 1 }}>{message}</span>
            {dismissible && (
                <button
                    onClick={handleDismiss}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: config.color,
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        padding: '4px 8px'
                    }}
                >
                    ×
                </button>
            )}
        </div>
    );
}

// ============================================================================
// CARD WITH PROPS COMBINATION
// ============================================================================

/**
 * Card - A flexible card component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='default'] - Card variant (default, elevated, outlined)
 * @param {boolean} [props.hoverable=false] - Whether card has hover effect
 * @param {boolean} [props.clickable=false] - Whether card is clickable
 * @param {Function} [props.onClick] - Click handler
 * @param {React.ReactNode} props.children - Card content
 * @returns {JSX.Element} Card component
 */
function Card({ 
    variant = 'default', 
    hoverable = false,
    clickable = false,
    onClick, 
    children 
}) {
    const variantStyles = {
        default: { 
            backgroundColor: 'white', 
            border: '1px solid #e0e0e0',
            boxShadow: 'none'
        },
        elevated: { 
            backgroundColor: 'white', 
            border: 'none',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        },
        outlined: { 
            backgroundColor: 'transparent', 
            border: '2px solid #3498db',
            boxShadow: 'none'
        }
    };

    return (
        <div
            onClick={clickable ? onClick : undefined}
            style={{
                ...variantStyles[variant],
                padding: '20px',
                borderRadius: '8px',
                cursor: clickable ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                transform: hoverable ? 'translateY(0)' : undefined
            }}
            onMouseEnter={(e) => {
                if (hoverable) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                }
            }}
            onMouseLeave={(e) => {
                if (hoverable) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow;
                }
            }}
        >
            {children}
        </div>
    );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

/**
 * PropsCombinationDemo - Main demonstration component
 * 
 * @returns {JSX.Element} Complete demonstration of props combination pattern
 */
function PropsCombinationDemo() {
    const [loading, setLoading] = useState(false);

    const handleLoadingClick = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

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
                        Props Combination Pattern
                    </h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '16px'
                    }}>
                        Creating flexible components through prop combinations
                    </p>
                </header>

                {/* Button Variants */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ color: '#2c3e50' }}>Button Variants</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                        <Button variant="primary" onClick={() => alert('Primary!')}>Primary</Button>
                        <Button variant="secondary" onClick={() => alert('Secondary!')}>Secondary</Button>
                        <Button variant="danger" onClick={() => alert('Danger!')}>Danger</Button>
                        <Button variant="success" onClick={() => alert('Success!')}>Success</Button>
                        <Button variant="warning" onClick={() => alert('Warning!')}>Warning</Button>
                    </div>

                    <h3 style={{ color: '#2c3e50', marginTop: '24px' }}>Button Sizes</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                        <Button variant="primary" size="small" onClick={() => {}}>Small</Button>
                        <Button variant="primary" size="medium" onClick={() => {}}>Medium</Button>
                        <Button variant="primary" size="large" onClick={() => {}}>Large</Button>
                    </div>

                    <h3 style={{ color: '#2c3e50', marginTop: '24px' }}>Button States</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                        <Button variant="primary" disabled onClick={() => {}}>Disabled</Button>
                        <Button variant="primary" loading={loading} onClick={handleLoadingClick}>
                            {loading ? 'Loading...' : 'Click to Load'}
                        </Button>
                        <Button variant="primary" fullWidth onClick={() => {}}>Full Width</Button>
                    </div>
                </section>

                {/* Notification Variants */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ color: '#2c3e50' }}>Notification Variants</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Notification 
                            type="success" 
                            message="Operation completed successfully!" 
                            dismissible 
                        />
                        <Notification 
                            type="error" 
                            message="An error occurred. Please try again." 
                            dismissible 
                        />
                        <Notification 
                            type="warning" 
                            message="Warning: This action cannot be undone." 
                            dismissible 
                        />
                        <Notification 
                            type="info" 
                            message="Here's some helpful information." 
                            showIcon={false}
                        />
                    </div>
                </section>

                {/* Card Variants */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ color: '#2c3e50' }}>Card Variants</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                        <Card variant="default">
                            <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>Default Card</h3>
                            <p style={{ margin: 0, color: '#7f8c8d' }}>Simple card with border</p>
                        </Card>
                        <Card variant="elevated" hoverable>
                            <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>Elevated Card</h3>
                            <p style={{ margin: 0, color: '#7f8c8d' }}>Hover over me!</p>
                        </Card>
                        <Card variant="outlined" clickable onClick={() => alert('Card clicked!')}>
                            <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>Outlined Card</h3>
                            <p style={{ margin: 0, color: '#7f8c8d' }}>Click me!</p>
                        </Card>
                    </div>
                </section>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 Props Combination Benefits
                    </h3>
                    <ul style={{ color: '#34495e', lineHeight: '1.8' }}>
                        <li><strong>Flexibility:</strong> Create many variants from one component</li>
                        <li><strong>Maintainability:</strong> Single source of truth for component logic</li>
                        <li><strong>Extensibility:</strong> Easy to add new variants</li>
                        <li><strong>Consistency:</strong> Ensures consistent behavior across variants</li>
                        <li><strong>DX:</strong> Clear, intuitive API for consumers</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PropsCombinationDemo;
