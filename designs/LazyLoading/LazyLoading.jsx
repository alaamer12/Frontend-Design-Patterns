import React, { Suspense, lazy, useState } from 'react';

/**
 * LAZY LOADING / CODE SPLITTING PATTERN DEMONSTRATION
 * 
 * This pattern splits your code into smaller chunks that are loaded on-demand,
 * improving initial load time and overall performance. React provides built-in
 * support through React.lazy() and Suspense.
 * 
 * Benefits:
 * - Faster initial page load
 * - Reduced bundle size
 * - Better performance
 * - Improved user experience
 * - Efficient resource usage
 */

// ============================================================================
// LAZY LOADED COMPONENTS - Loaded on demand
// ============================================================================

/**
 * Heavy component that will be lazy loaded
 * In a real app, this would be imported with React.lazy()
 */
function HeavyDashboard() {
    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#e8f4f8',
            borderRadius: '8px',
            border: '2px solid #3498db'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>📊 Dashboard Component</h3>
            <p style={{ color: '#7f8c8d' }}>
                This is a heavy component that was lazy loaded. In a real application,
                this would include charts, graphs, and complex data visualizations.
            </p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px',
                marginTop: '16px'
            }}>
                {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{
                        padding: '16px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3498db' }}>
                            {Math.floor(Math.random() * 1000)}
                        </div>
                        <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Metric {i}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * Settings component that will be lazy loaded
 */
function SettingsPanel() {
    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#e8f8f0',
            borderRadius: '8px',
            border: '2px solid #27ae60'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>⚙️ Settings Component</h3>
            <p style={{ color: '#7f8c8d' }}>
                This settings panel was lazy loaded only when needed.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                {['Enable notifications', 'Dark mode', 'Auto-save', 'Show tooltips'].map(setting => (
                    <label key={setting} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input type="checkbox" defaultChecked={Math.random() > 0.5} />
                        <span>{setting}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

/**
 * Profile component that will be lazy loaded
 */
function UserProfile() {
    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f4e8f8',
            borderRadius: '8px',
            border: '2px solid #9b59b6'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>👤 User Profile</h3>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#9b59b6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}>
                    JD
                </div>
                <div>
                    <h4 style={{ margin: '0 0 4px 0' }}>John Doe</h4>
                    <p style={{ margin: '0', color: '#7f8c8d', fontSize: '14px' }}>john.doe@example.com</p>
                    <p style={{ margin: '4px 0 0 0', color: '#7f8c8d', fontSize: '14px' }}>Member since 2024</p>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// LOADING COMPONENTS - Shown while lazy components load
// ============================================================================

/**
 * LoadingSpinner - Generic loading indicator
 * 
 * @returns {JSX.Element} Loading spinner
 */
function LoadingSpinner() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            color: '#7f8c8d'
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
            <p style={{ marginTop: '16px' }}>Loading component...</p>
        </div>
    );
}

/**
 * SkeletonLoader - Skeleton loading placeholder
 * 
 * @returns {JSX.Element} Skeleton loader
 */
function SkeletonLoader() {
    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
        }}>
            <div style={{
                height: '24px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                marginBottom: '12px',
                animation: 'pulse 1.5s ease-in-out infinite'
            }} />
            <div style={{
                height: '16px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                marginBottom: '8px',
                width: '80%',
                animation: 'pulse 1.5s ease-in-out infinite'
            }} />
            <div style={{
                height: '16px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                width: '60%',
                animation: 'pulse 1.5s ease-in-out infinite'
            }} />
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
}

// ============================================================================
// LAZY WRAPPER COMPONENT - Simulates React.lazy behavior
// ============================================================================

/**
 * LazyWrapper - Simulates lazy loading with delay
 * 
 * @param {Object} props - Component props
 * @param {React.ComponentType} props.component - Component to lazy load
 * @param {number} [props.delay=1000] - Simulated loading delay
 * @param {React.ComponentType} [props.fallback] - Loading component
 * @returns {JSX.Element} Lazy loaded component or fallback
 */
function LazyWrapper({ component: Component, delay = 1000, fallback: Fallback = LoadingSpinner }) {
    const [isLoaded, setIsLoaded] = useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    if (!isLoaded) {
        return <Fallback />;
    }

    return <Component />;
}

// ============================================================================
// ROUTE-BASED CODE SPLITTING DEMO
// ============================================================================

/**
 * RouteBasedSplitting - Demonstrates route-based code splitting
 * 
 * @returns {JSX.Element} Route-based lazy loading demo
 */
function RouteBasedSplitting() {
    const [currentRoute, setCurrentRoute] = useState('home');

    const routes = {
        home: { label: '🏠 Home', component: null },
        dashboard: { label: '📊 Dashboard', component: HeavyDashboard },
        settings: { label: '⚙️ Settings', component: SettingsPanel },
        profile: { label: '👤 Profile', component: UserProfile }
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Route-Based Code Splitting</h3>
            
            {/* Navigation */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px',
                flexWrap: 'wrap'
            }}>
                {Object.entries(routes).map(([key, { label }]) => (
                    <button
                        key={key}
                        onClick={() => setCurrentRoute(key)}
                        style={{
                            padding: '10px 16px',
                            backgroundColor: currentRoute === key ? '#3498db' : '#ecf0f1',
                            color: currentRoute === key ? 'white' : '#2c3e50',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: currentRoute === key ? 'bold' : 'normal'
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{ minHeight: '200px' }}>
                {currentRoute === 'home' ? (
                    <div style={{
                        padding: '40px',
                        textAlign: 'center',
                        color: '#7f8c8d'
                    }}>
                        <h2 style={{ color: '#2c3e50' }}>Welcome! 👋</h2>
                        <p>Click on the navigation buttons to lazy load different components.</p>
                        <p style={{ fontSize: '14px', marginTop: '20px' }}>
                            Each route component is loaded only when you navigate to it,
                            reducing the initial bundle size.
                        </p>
                    </div>
                ) : (
                    <Suspense fallback={<LoadingSpinner />}>
                        <LazyWrapper 
                            component={routes[currentRoute].component} 
                            delay={800}
                        />
                    </Suspense>
                )}
            </div>
        </div>
    );
}

// ============================================================================
// COMPONENT-BASED CODE SPLITTING DEMO
// ============================================================================

/**
 * ComponentBasedSplitting - Demonstrates component-based lazy loading
 * 
 * @returns {JSX.Element} Component-based lazy loading demo
 */
function ComponentBasedSplitting() {
    const [showDashboard, setShowDashboard] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Component-Based Code Splitting</h3>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                Components are loaded only when they become visible.
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <button
                    onClick={() => setShowDashboard(!showDashboard)}
                    style={{
                        padding: '10px 16px',
                        backgroundColor: showDashboard ? '#e74c3c' : '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {showDashboard ? 'Hide' : 'Show'} Dashboard
                </button>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    style={{
                        padding: '10px 16px',
                        backgroundColor: showSettings ? '#e74c3c' : '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {showSettings ? 'Hide' : 'Show'} Settings
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {showDashboard && (
                    <Suspense fallback={<SkeletonLoader />}>
                        <LazyWrapper component={HeavyDashboard} delay={600} fallback={SkeletonLoader} />
                    </Suspense>
                )}
                {showSettings && (
                    <Suspense fallback={<SkeletonLoader />}>
                        <LazyWrapper component={SettingsPanel} delay={600} fallback={SkeletonLoader} />
                    </Suspense>
                )}
            </div>
        </div>
    );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

/**
 * LazyLoadingDemo - Main demonstration component
 * 
 * @returns {JSX.Element} Complete demonstration of lazy loading pattern
 */
function LazyLoadingDemo() {
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
                        Lazy Loading / Code Splitting Pattern
                    </h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '16px'
                    }}>
                        Load components on-demand to improve performance
                    </p>
                </header>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    <RouteBasedSplitting />
                    <ComponentBasedSplitting />
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 Pattern Explanation
                    </h3>
                    <ul style={{ color: '#34495e', lineHeight: '1.8' }}>
                        <li><strong>Route-Based:</strong> Load components for each route only when navigated to</li>
                        <li><strong>Component-Based:</strong> Load heavy components only when they're needed</li>
                        <li><strong>Suspense:</strong> Show fallback UI while components are loading</li>
                        <li><strong>Performance:</strong> Reduces initial bundle size and improves load time</li>
                        <li><strong>User Experience:</strong> Faster initial page load with progressive enhancement</li>
                    </ul>

                    <div style={{
                        marginTop: '16px',
                        padding: '12px',
                        backgroundColor: '#e8f4f8',
                        borderRadius: '4px',
                        border: '1px solid #b8dce8'
                    }}>
                        <strong>Real Implementation:</strong> In production, use React.lazy() and dynamic imports:
                        <pre style={{
                            marginTop: '8px',
                            padding: '12px',
                            backgroundColor: '#2c3e50',
                            color: '#ecf0f1',
                            borderRadius: '4px',
                            fontSize: '12px',
                            overflowX: 'auto'
                        }}>
{`const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LazyLoadingDemo;
