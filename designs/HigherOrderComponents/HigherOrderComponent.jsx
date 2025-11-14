import React, { useState, useEffect } from 'react';

/**
 * HIGHER-ORDER COMPONENTS (HOC) PATTERN DEMONSTRATION
 * 
 * A Higher-Order Component is a function that takes a component and returns
 * a new component with additional props or behavior. HOCs are used for
 * cross-cutting concerns like authentication, logging, and data fetching.
 * 
 * Benefits:
 * - Code reuse and logic sharing
 * - Props manipulation
 * - State abstraction
 * - Render hijacking
 * - Cross-cutting concerns
 */

// ============================================================================
// BASIC HOC - Adding props
// ============================================================================

/**
 * withExtraProps - HOC that adds extra props to a component
 * 
 * @param {React.ComponentType} WrappedComponent - Component to wrap
 * @returns {React.ComponentType} Enhanced component with extra props
 * 
 * @example
 * const EnhancedComponent = withExtraProps(MyComponent);
 */
function withExtraProps(WrappedComponent) {
    return function WithExtraPropsHOC(props) {
        const extraProps = {
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        };

        return <WrappedComponent {...props} {...extraProps} />;
    };
}

// ============================================================================
// AUTHENTICATION HOC
// ============================================================================

/**
 * withAuth - HOC that adds authentication logic
 * 
 * @param {React.ComponentType} WrappedComponent - Component to protect
 * @returns {React.ComponentType} Component with auth protection
 */
function withAuth(WrappedComponent) {
    return function WithAuthHOC(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            // Simulate auth check
            setTimeout(() => {
                setIsAuthenticated(Math.random() > 0.3); // 70% chance of being authenticated
                setLoading(false);
            }, 1000);
        }, []);

        if (loading) {
            return (
                <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    color: '#7f8c8d'
                }}>
                    Checking authentication...
                </div>
            );
        }

        if (!isAuthenticated) {
            return (
                <div style={{
                    padding: '20px',
                    backgroundColor: '#fee',
                    border: '1px solid #fcc',
                    borderRadius: '4px',
                    color: '#c33',
                    textAlign: 'center'
                }}>
                    ⚠️ Access Denied. Please log in to view this content.
                </div>
            );
        }

        return <WrappedComponent {...props} isAuthenticated={isAuthenticated} />;
    };
}

// ============================================================================
// LOADING HOC
// ============================================================================

/**
 * withLoading - HOC that adds loading state
 * 
 * @param {React.ComponentType} WrappedComponent - Component to wrap
 * @returns {React.ComponentType} Component with loading state
 */
function withLoading(WrappedComponent) {
    return function WithLoadingHOC(props) {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            // Simulate data fetching
            setTimeout(() => {
                setData({ message: 'Data loaded successfully!' });
                setLoading(false);
            }, 1500);
        }, []);

        if (loading) {
            return (
                <div style={{
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #3498db',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto'
                    }} />
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                    <p style={{ marginTop: '16px', color: '#7f8c8d' }}>Loading...</p>
                </div>
            );
        }

        return <WrappedComponent {...props} data={data} />;
    };
}

// ============================================================================
// LOGGING HOC
// ============================================================================

/**
 * withLogger - HOC that logs component lifecycle
 * 
 * @param {React.ComponentType} WrappedComponent - Component to wrap
 * @returns {React.ComponentType} Component with logging
 */
function withLogger(WrappedComponent) {
    return function WithLoggerHOC(props) {
        const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

        useEffect(() => {
            console.log(`[${componentName}] Mounted`);
            return () => {
                console.log(`[${componentName}] Unmounted`);
            };
        }, []);

        useEffect(() => {
            console.log(`[${componentName}] Props updated:`, props);
        }, [props]);

        return <WrappedComponent {...props} />;
    };
}

// ============================================================================
// STYLING HOC
// ============================================================================

/**
 * withStyles - HOC that adds styling to a component
 * 
 * @param {Object} styles - Styles to apply
 * @returns {Function} HOC function
 */
function withStyles(styles) {
    return function (WrappedComponent) {
        return function WithStylesHOC(props) {
            return (
                <div style={styles}>
                    <WrappedComponent {...props} />
                </div>
            );
        };
    };
}

// ============================================================================
// DEMO COMPONENTS
// ============================================================================

/**
 * BasicComponent - A simple component to be enhanced
 */
function BasicComponent({ message, timestamp, version }) {
    return (
        <div style={{
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>Basic Component</h3>
            <p style={{ margin: '4px 0', color: '#7f8c8d' }}>Message: {message || 'No message'}</p>
            {timestamp && <p style={{ margin: '4px 0', color: '#7f8c8d', fontSize: '12px' }}>Timestamp: {timestamp}</p>}
            {version && <p style={{ margin: '4px 0', color: '#7f8c8d', fontSize: '12px' }}>Version: {version}</p>}
        </div>
    );
}

/**
 * ProtectedComponent - Component that requires authentication
 */
function ProtectedComponent({ isAuthenticated }) {
    return (
        <div style={{
            padding: '16px',
            backgroundColor: '#e8f8f0',
            border: '2px solid #27ae60',
            borderRadius: '8px'
        }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#27ae60' }}>🔒 Protected Content</h3>
            <p style={{ margin: 0, color: '#2c3e50' }}>
                You are authenticated! This content is only visible to logged-in users.
            </p>
        </div>
    );
}

/**
 * DataComponent - Component that displays loaded data
 */
function DataComponent({ data }) {
    return (
        <div style={{
            padding: '16px',
            backgroundColor: '#e8f4f8',
            border: '2px solid #3498db',
            borderRadius: '8px'
        }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#3498db' }}>📦 Data Component</h3>
            <p style={{ margin: 0, color: '#2c3e50' }}>
                {data?.message || 'No data available'}
            </p>
        </div>
    );
}

// ============================================================================
// ENHANCED COMPONENTS - Applying HOCs
// ============================================================================

const EnhancedBasicComponent = withExtraProps(BasicComponent);
const AuthenticatedComponent = withAuth(ProtectedComponent);
const LoadingDataComponent = withLoading(DataComponent);
const LoggedComponent = withLogger(BasicComponent);

// Composing multiple HOCs
const StyledComponent = withStyles({
    padding: '16px',
    backgroundColor: '#f4e8f8',
    border: '2px solid #9b59b6',
    borderRadius: '8px'
})(BasicComponent);

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

/**
 * HigherOrderComponentDemo - Main demonstration component
 * 
 * @returns {JSX.Element} Complete demonstration of HOC pattern
 */
function HigherOrderComponentDemo() {
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
                        Higher-Order Components (HOC) Pattern
                    </h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '16px'
                    }}>
                        Enhancing components with reusable logic
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    <div>
                        <h3 style={{ color: '#2c3e50' }}>Original Component</h3>
                        <BasicComponent message="I'm a basic component" />
                    </div>

                    <div>
                        <h3 style={{ color: '#2c3e50' }}>With Extra Props HOC</h3>
                        <EnhancedBasicComponent message="I have extra props!" />
                    </div>

                    <div>
                        <h3 style={{ color: '#2c3e50' }}>With Styles HOC</h3>
                        <StyledComponent message="I'm styled!" />
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    <div>
                        <h3 style={{ color: '#2c3e50' }}>With Auth HOC</h3>
                        <AuthenticatedComponent />
                    </div>

                    <div>
                        <h3 style={{ color: '#2c3e50' }}>With Loading HOC</h3>
                        <LoadingDataComponent />
                    </div>

                    <div>
                        <h3 style={{ color: '#2c3e50' }}>With Logger HOC</h3>
                        <LoggedComponent message="Check console for logs" />
                        <p style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '8px' }}>
                            Open browser console to see lifecycle logs
                        </p>
                    </div>
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 HOC Pattern Explanation
                    </h3>
                    <ul style={{ color: '#34495e', lineHeight: '1.8' }}>
                        <li><strong>Reusability:</strong> Share logic across multiple components</li>
                        <li><strong>Composition:</strong> Combine multiple HOCs for complex behavior</li>
                        <li><strong>Props Manipulation:</strong> Add, modify, or filter props</li>
                        <li><strong>Render Hijacking:</strong> Control rendering logic</li>
                        <li><strong>Cross-cutting Concerns:</strong> Authentication, logging, error handling</li>
                    </ul>
                    
                    <div style={{
                        marginTop: '16px',
                        padding: '12px',
                        backgroundColor: '#e8f4f8',
                        borderRadius: '4px',
                        border: '1px solid #b8dce8'
                    }}>
                        <strong>Note:</strong> While HOCs are powerful, modern React often prefers Custom Hooks
                        for sharing logic. However, HOCs are still useful for component enhancement and
                        are widely used in libraries like Redux (connect) and React Router (withRouter).
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HigherOrderComponentDemo;
