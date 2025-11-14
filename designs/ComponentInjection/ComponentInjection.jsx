import React, { useState } from 'react';

/**
 * COMPONENT INJECTION PATTERN DEMONSTRATION
 * 
 * Component injection allows you to dynamically inject components into other components,
 * providing flexibility in rendering and enabling plugin-like architectures.
 * 
 * Benefits:
 * - Dynamic component rendering
 * - Plugin architectures
 * - Flexible layouts
 * - Inversion of control
 * - Runtime component selection
 */

// ============================================================================
// BASIC COMPONENT INJECTION
// ============================================================================

/**
 * Layout - A layout component that accepts injected components
 * 
 * This component defines a structure but allows consumers to inject
 * specific components for header, content, sidebar, and footer.
 * 
 * @param {Object} props - Component props
 * @param {React.ComponentType} [props.Header] - Header component to inject
 * @param {React.ComponentType} [props.Content] - Content component to inject
 * @param {React.ComponentType} [props.Sidebar] - Sidebar component to inject
 * @param {React.ComponentType} [props.Footer] - Footer component to inject
 * @returns {JSX.Element} Layout with injected components
 * 
 * @example
 * <Layout 
 *   Header={MyHeader}
 *   Content={MyContent}
 *   Footer={MyFooter}
 * />
 */
function Layout({ Header, Content, Sidebar, Footer }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateAreas: Sidebar 
                ? '"header header" "sidebar content" "footer footer"'
                : '"header" "content" "footer"',
            gridTemplateColumns: Sidebar ? '200px 1fr' : '1fr',
            gridTemplateRows: 'auto 1fr auto',
            minHeight: '100vh',
            gap: '0'
        }}>
            {Header && (
                <header style={{ gridArea: 'header', backgroundColor: '#2c3e50', color: 'white', padding: '20px' }}>
                    <Header />
                </header>
            )}
            
            {Sidebar && (
                <aside style={{ gridArea: 'sidebar', backgroundColor: '#34495e', color: 'white', padding: '20px' }}>
                    <Sidebar />
                </aside>
            )}
            
            <main style={{ gridArea: 'content', padding: '20px', backgroundColor: '#ecf0f1' }}>
                {Content ? <Content /> : <div>No content provided</div>}
            </main>
            
            {Footer && (
                <footer style={{ gridArea: 'footer', backgroundColor: '#2c3e50', color: 'white', padding: '20px', textAlign: 'center' }}>
                    <Footer />
                </footer>
            )}
        </div>
    );
}

// ============================================================================
// PLUGIN HOST PATTERN
// ============================================================================

/**
 * PluginHost - A component that renders a list of plugin components
 * 
 * This pattern is useful for creating extensible applications where
 * plugins can be added or removed dynamically.
 * 
 * @param {Object} props - Component props
 * @param {Array<React.ComponentType>} props.plugins - Array of plugin components
 * @param {Object} [props.pluginProps={}] - Props to pass to all plugins
 * @returns {JSX.Element} Rendered plugins
 * 
 * @example
 * <PluginHost 
 *   plugins={[Plugin1, Plugin2, Plugin3]}
 *   pluginProps={{ theme: 'dark' }}
 * />
 */
function PluginHost({ plugins = [], pluginProps = {} }) {
    if (!plugins || plugins.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d' }}>
                No plugins loaded
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }}>
            {plugins.map((Plugin, index) => (
                <div 
                    key={index}
                    style={{
                        padding: '16px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    <Plugin {...pluginProps} />
                </div>
            ))}
        </div>
    );
}

// ============================================================================
// CONDITIONAL RENDERER PATTERN
// ============================================================================

/**
 * ConditionalRenderer - Renders components based on conditions
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Type of component to render
 * @param {Object} props.components - Map of component types to components
 * @param {Object} [props.componentProps={}] - Props to pass to rendered component
 * @returns {JSX.Element} Conditionally rendered component
 * 
 * @example
 * <ConditionalRenderer 
 *   type="success"
 *   components={{ success: SuccessMessage, error: ErrorMessage }}
 * />
 */
function ConditionalRenderer({ type, components, componentProps = {} }) {
    const Component = components[type];
    
    if (!Component) {
        return (
            <div style={{ padding: '16px', backgroundColor: '#fee', color: '#c33', borderRadius: '4px' }}>
                Unknown component type: {type}
            </div>
        );
    }
    
    return <Component {...componentProps} />;
}

// ============================================================================
// DEMO COMPONENTS
// ============================================================================

// Sample Header Components
const SimpleHeader = () => (
    <div>
        <h1 style={{ margin: 0 }}>Simple Header</h1>
        <p style={{ margin: '8px 0 0 0', opacity: 0.8 }}>A basic header component</p>
    </div>
);

const AdvancedHeader = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Advanced Header</h1>
        <nav style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>About</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
        </nav>
    </div>
);

// Sample Content Components
const DashboardContent = () => (
    <div>
        <h2 style={{ color: '#2c3e50' }}>Dashboard</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[1, 2, 3, 4].map(i => (
                <div key={i} style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ margin: '0 0 8px 0', color: '#3498db' }}>Metric {i}</h3>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#2c3e50' }}>
                        {Math.floor(Math.random() * 1000)}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

const ProfileContent = () => (
    <div>
        <h2 style={{ color: '#2c3e50' }}>User Profile</h2>
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#3498db',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '32px',
                    fontWeight: 'bold'
                }}>
                    JD
                </div>
                <div>
                    <h3 style={{ margin: '0 0 8px 0' }}>John Doe</h3>
                    <p style={{ margin: '4px 0', color: '#7f8c8d' }}>john.doe@example.com</p>
                    <p style={{ margin: '4px 0', color: '#7f8c8d' }}>Software Developer</p>
                </div>
            </div>
        </div>
    </div>
);

// Sample Sidebar Component
const NavigationSidebar = () => (
    <div>
        <h3 style={{ marginTop: 0 }}>Navigation</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {['Dashboard', 'Profile', 'Settings', 'Analytics', 'Reports'].map(item => (
                <li key={item} style={{
                    padding: '12px',
                    marginBottom: '8px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

// Sample Footer Component
const SimpleFooter = () => (
    <div>
        <p style={{ margin: 0 }}>© 2024 Component Injection Demo. All rights reserved.</p>
    </div>
);

// Plugin Components
const WelcomePlugin = ({ theme }) => (
    <div>
        <h3 style={{ margin: '0 0 8px 0', color: '#3498db' }}>🎉 Welcome Plugin</h3>
        <p style={{ margin: 0, color: '#7f8c8d' }}>
            This is a dynamically loaded plugin component. Theme: {theme || 'default'}
        </p>
    </div>
);

const StatsPlugin = ({ theme }) => (
    <div>
        <h3 style={{ margin: '0 0 8px 0', color: '#27ae60' }}>📊 Stats Plugin</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
            <div><strong>Users:</strong> 1,234</div>
            <div><strong>Posts:</strong> 5,678</div>
            <div><strong>Comments:</strong> 9,012</div>
        </div>
    </div>
);

const NotificationsPlugin = ({ theme }) => (
    <div>
        <h3 style={{ margin: '0 0 8px 0', color: '#e74c3c' }}>🔔 Notifications Plugin</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#7f8c8d' }}>
            <li>New message from Alice</li>
            <li>Your report is ready</li>
            <li>System update available</li>
        </ul>
    </div>
);

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

/**
 * ComponentInjectionDemo - Main demonstration component
 * 
 * @returns {JSX.Element} Complete demonstration of component injection pattern
 */
function ComponentInjectionDemo() {
    const [layoutType, setLayoutType] = useState('dashboard');
    const [enabledPlugins, setEnabledPlugins] = useState([true, true, true]);

    const plugins = [
        WelcomePlugin,
        StatsPlugin,
        NotificationsPlugin
    ].filter((_, index) => enabledPlugins[index]);

    const togglePlugin = (index) => {
        setEnabledPlugins(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
            <div style={{
                padding: '20px',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '20px'
            }}>
                <h1 style={{ margin: '0 0 16px 0', color: '#2c3e50' }}>
                    Component Injection Pattern
                </h1>
                
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <button
                        onClick={() => setLayoutType('dashboard')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: layoutType === 'dashboard' ? '#3498db' : '#ecf0f1',
                            color: layoutType === 'dashboard' ? 'white' : '#2c3e50',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Dashboard Layout
                    </button>
                    <button
                        onClick={() => setLayoutType('profile')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: layoutType === 'profile' ? '#3498db' : '#ecf0f1',
                            color: layoutType === 'profile' ? 'white' : '#2c3e50',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Profile Layout
                    </button>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>Plugin Controls:</h3>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        {['Welcome', 'Stats', 'Notifications'].map((name, index) => (
                            <label key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={enabledPlugins[index]}
                                    onChange={() => togglePlugin(index)}
                                />
                                <span>{name} Plugin</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <Layout
                Header={layoutType === 'dashboard' ? AdvancedHeader : SimpleHeader}
                Content={layoutType === 'dashboard' ? DashboardContent : ProfileContent}
                Sidebar={layoutType === 'dashboard' ? NavigationSidebar : null}
                Footer={SimpleFooter}
            />

            <div style={{ padding: '20px', maxWidth: '1200px', margin: '20px auto' }}>
                <h2 style={{ color: '#2c3e50' }}>Plugin System</h2>
                <PluginHost plugins={plugins} pluginProps={{ theme: 'light' }} />
            </div>

            <div style={{
                padding: '20px',
                maxWidth: '1200px',
                margin: '20px auto',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{ marginTop: 0, color: '#2c3e50' }}>💡 Pattern Explanation</h3>
                <ul style={{ color: '#34495e', lineHeight: '1.8' }}>
                    <li><strong>Dynamic Injection:</strong> Components are passed as props and rendered dynamically</li>
                    <li><strong>Flexibility:</strong> Easy to swap components without changing the host</li>
                    <li><strong>Plugin Architecture:</strong> Enable/disable features at runtime</li>
                    <li><strong>Inversion of Control:</strong> Host doesn't know about specific implementations</li>
                </ul>
            </div>
        </div>
    );
}

export default ComponentInjectionDemo;
