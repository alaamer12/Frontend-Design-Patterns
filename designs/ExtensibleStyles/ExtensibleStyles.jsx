import React from 'react';

/**
 * EXTENSIBLE STYLES PATTERN DEMONSTRATION
 */

function Button({ style, children, variant = 'primary' }) {
    const baseStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
    };

    const variants = {
        primary: { backgroundColor: '#3498db', color: 'white' },
        secondary: { backgroundColor: '#95a5a6', color: 'white' },
        danger: { backgroundColor: '#e74c3c', color: 'white' }
    };

    return (
        <button style={{ ...baseStyle, ...variants[variant], ...style }}>
            {children}
        </button>
    );
}

function Card({ style, children }) {
    const defaultStyle = {
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    return (
        <div style={{ ...defaultStyle, ...style }}>
            {children}
        </div>
    );
}

function ExtensibleStylesDemo() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f6fa', padding: '40px 20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ color: '#2c3e50' }}>Extensible Styles Pattern</h1>
                    <p style={{ color: '#7f8c8d' }}>Flexible component styling</p>
                </header>

                <Card style={{ marginBottom: '24px' }}>
                    <h3 style={{ marginTop: 0 }}>Default Buttons</h3>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="danger">Danger</Button>
                    </div>
                </Card>

                <Card style={{ marginBottom: '24px' }}>
                    <h3 style={{ marginTop: 0 }}>Custom Styled Buttons</h3>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Button style={{ borderRadius: '20px', padding: '12px 24px' }}>Rounded</Button>
                        <Button style={{ backgroundColor: '#9b59b6', fontSize: '18px' }}>Custom Color</Button>
                        <Button style={{ border: '2px solid #3498db', backgroundColor: 'transparent', color: '#3498db' }}>Outlined</Button>
                    </div>
                </Card>

                <Card style={{ backgroundColor: '#e8f4f8', border: '2px solid #3498db' }}>
                    <h3 style={{ marginTop: 0 }}>Custom Styled Card</h3>
                    <p>This card has custom background and border styles applied.</p>
                </Card>
            </div>
        </div>
    );
}

export default ExtensibleStylesDemo;
