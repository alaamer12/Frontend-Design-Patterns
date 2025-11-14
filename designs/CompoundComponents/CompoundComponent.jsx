import React, { createContext, useContext, useState } from 'react';

/**
 * COMPOUND COMPONENTS PATTERN DEMONSTRATION
 * 
 * Compound components work together to form a complete UI component.
 * They share implicit state through React Context, providing a flexible
 * and expressive API for consumers.
 * 
 * Benefits:
 * - Flexible and expressive API
 * - Shared implicit state
 * - Separation of concerns
 * - Inversion of control
 * - Better component composition
 */

// ============================================================================
// CONTEXT SETUP - Shared state between compound components
// ============================================================================

/**
 * TabsContext - Provides shared state for all Tab components
 * @type {React.Context}
 */
const TabsContext = createContext();

/**
 * Custom hook to access Tabs context
 * Throws an error if used outside of Tabs component
 * 
 * @returns {Object} Tabs context value
 * @throws {Error} If used outside Tabs provider
 */
const useTabsContext = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Tabs compound components must be used within a Tabs component');
    }
    return context;
};

// ============================================================================
// MAIN COMPOUND COMPONENT - Parent that manages shared state
// ============================================================================

/**
 * Tabs - Main compound component that manages tab state
 * 
 * This is the parent component that provides context to all child components.
 * It manages the active tab state and provides methods to change it.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components (TabList, TabPanels)
 * @param {number} [props.defaultTab=0] - Initially active tab index
 * @param {Function} [props.onChange] - Callback when active tab changes
 * @returns {JSX.Element} Tabs container with context provider
 * 
 * @example
 * <Tabs defaultTab={0} onChange={(index) => console.log(index)}>
 *   <Tabs.TabList>
 *     <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
 *     <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
 *   </Tabs.TabList>
 *   <Tabs.TabPanel index={0}>Content 1</Tabs.TabPanel>
 *   <Tabs.TabPanel index={1}>Content 2</Tabs.TabPanel>
 * </Tabs>
 */
function Tabs({ children, defaultTab = 0, onChange }) {
    const [activeTab, setActiveTab] = useState(defaultTab);

    /**
     * Handle tab change with optional callback
     * @param {number} index - New active tab index
     */
    const handleTabChange = (index) => {
        setActiveTab(index);
        if (onChange) {
            onChange(index);
        }
    };

    const contextValue = {
        activeTab,
        setActiveTab: handleTabChange
    };

    return (
        <TabsContext.Provider value={contextValue}>
            <div style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

// ============================================================================
// COMPOUND COMPONENT CHILDREN - Components that use shared context
// ============================================================================

/**
 * TabList - Container for Tab buttons
 * 
 * This component renders a horizontal list of tab buttons.
 * It's a presentational component that styles its children.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Tab components
 * @returns {JSX.Element} Styled tab list container
 * 
 * @example
 * <Tabs.TabList>
 *   <Tabs.Tab index={0}>First Tab</Tabs.Tab>
 *   <Tabs.Tab index={1}>Second Tab</Tabs.Tab>
 * </Tabs.TabList>
 */
function TabList({ children }) {
    return (
        <div style={{
            display: 'flex',
            borderBottom: '2px solid #e0e0e0',
            backgroundColor: '#f8f9fa'
        }}>
            {children}
        </div>
    );
}

/**
 * Tab - Individual tab button
 * 
 * This component renders a single tab button and uses context to determine
 * if it's active and to handle click events.
 * 
 * @param {Object} props - Component props
 * @param {number} props.index - Tab index (must be unique)
 * @param {React.ReactNode} props.children - Tab label content
 * @param {boolean} [props.disabled=false] - Whether tab is disabled
 * @returns {JSX.Element} Tab button
 * 
 * @example
 * <Tabs.Tab index={0}>Home</Tabs.Tab>
 * <Tabs.Tab index={1} disabled>Settings</Tabs.Tab>
 */
function Tab({ index, children, disabled = false }) {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === index;

    return (
        <button
            onClick={() => !disabled && setActiveTab(index)}
            disabled={disabled}
            style={{
                flex: 1,
                padding: '12px 24px',
                border: 'none',
                backgroundColor: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#2c3e50' : '#7f8c8d',
                fontWeight: isActive ? 'bold' : 'normal',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                borderBottom: isActive ? '3px solid #3498db' : '3px solid transparent',
                opacity: disabled ? 0.5 : 1,
                fontSize: '14px',
                position: 'relative',
                top: isActive ? '2px' : '0'
            }}
            onMouseEnter={(e) => {
                if (!disabled && !isActive) {
                    e.currentTarget.style.backgroundColor = '#ecf0f1';
                }
            }}
            onMouseLeave={(e) => {
                if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }
            }}
        >
            {children}
            {isActive && <span style={{ marginLeft: '8px' }}>✓</span>}
        </button>
    );
}

/**
 * TabPanel - Content panel for a tab
 * 
 * This component renders content for a specific tab. It only displays
 * when its index matches the active tab.
 * 
 * @param {Object} props - Component props
 * @param {number} props.index - Panel index (should match corresponding Tab index)
 * @param {React.ReactNode} props.children - Panel content
 * @returns {JSX.Element|null} Panel content or null if not active
 * 
 * @example
 * <Tabs.TabPanel index={0}>
 *   <h2>Welcome</h2>
 *   <p>This is the home tab content</p>
 * </Tabs.TabPanel>
 */
function TabPanel({ index, children }) {
    const { activeTab } = useTabsContext();
    
    if (activeTab !== index) {
        return null;
    }

    return (
        <div style={{
            padding: '24px',
            animation: 'fadeIn 0.3s ease-in'
        }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            {children}
        </div>
    );
}

// ============================================================================
// ATTACH COMPOUND COMPONENTS TO PARENT
// ============================================================================

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

// ============================================================================
// DEMO COMPONENT - Shows how to use the compound component
// ============================================================================

/**
 * CompoundComponentDemo - Demonstrates the Tabs compound component
 * 
 * @returns {JSX.Element} Complete demo of compound components pattern
 */
function CompoundComponentDemo() {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f5f6fa',
            padding: '40px 20px'
        }}>
            <div style={{
                maxWidth: '900px',
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
                        Compound Components Pattern
                    </h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '16px'
                    }}>
                        Components that work together sharing implicit state
                    </p>
                </header>

                <div style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ marginTop: 0, color: '#2c3e50' }}>
                        User Dashboard
                    </h2>
                    
                    <Tabs 
                        defaultTab={0} 
                        onChange={(index) => {
                            setSelectedTab(index);
                            console.log('Tab changed to:', index);
                        }}
                    >
                        <Tabs.TabList>
                            <Tabs.Tab index={0}>📊 Overview</Tabs.Tab>
                            <Tabs.Tab index={1}>👤 Profile</Tabs.Tab>
                            <Tabs.Tab index={2}>⚙️ Settings</Tabs.Tab>
                            <Tabs.Tab index={3} disabled>🔒 Admin</Tabs.Tab>
                        </Tabs.TabList>

                        <Tabs.TabPanel index={0}>
                            <h3 style={{ color: '#2c3e50' }}>Dashboard Overview</h3>
                            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
                                Welcome to your dashboard! Here you can see an overview of your account activity.
                            </p>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '16px',
                                marginTop: '20px'
                            }}>
                                <div style={{
                                    padding: '16px',
                                    backgroundColor: '#e8f4f8',
                                    borderRadius: '8px',
                                    border: '1px solid #b8dce8'
                                }}>
                                    <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>Total Users</h4>
                                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#3498db' }}>1,234</p>
                                </div>
                                <div style={{
                                    padding: '16px',
                                    backgroundColor: '#e8f8f0',
                                    borderRadius: '8px',
                                    border: '1px solid #b8e8d0'
                                }}>
                                    <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>Active Sessions</h4>
                                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>89</p>
                                </div>
                                <div style={{
                                    padding: '16px',
                                    backgroundColor: '#fff4e8',
                                    borderRadius: '8px',
                                    border: '1px solid #ffe0b8'
                                }}>
                                    <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>Pending Tasks</h4>
                                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#f39c12' }}>12</p>
                                </div>
                            </div>
                        </Tabs.TabPanel>

                        <Tabs.TabPanel index={1}>
                            <h3 style={{ color: '#2c3e50' }}>User Profile</h3>
                            <div style={{
                                display: 'flex',
                                gap: '20px',
                                alignItems: 'start'
                            }}>
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
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>John Doe</h4>
                                    <p style={{ margin: '4px 0', color: '#7f8c8d' }}>📧 john.doe@example.com</p>
                                    <p style={{ margin: '4px 0', color: '#7f8c8d' }}>📍 San Francisco, CA</p>
                                    <p style={{ margin: '4px 0', color: '#7f8c8d' }}>🎂 Joined March 2024</p>
                                </div>
                            </div>
                        </Tabs.TabPanel>

                        <Tabs.TabPanel index={2}>
                            <h3 style={{ color: '#2c3e50' }}>Settings</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input type="checkbox" defaultChecked />
                                    <span style={{ color: '#2c3e50' }}>Enable email notifications</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input type="checkbox" />
                                    <span style={{ color: '#2c3e50' }}>Enable dark mode</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input type="checkbox" defaultChecked />
                                    <span style={{ color: '#2c3e50' }}>Show activity status</span>
                                </label>
                            </div>
                        </Tabs.TabPanel>

                        <Tabs.TabPanel index={3}>
                            <h3 style={{ color: '#2c3e50' }}>Admin Panel</h3>
                            <p style={{ color: '#7f8c8d' }}>
                                This tab is disabled. You need admin privileges to access this section.
                            </p>
                        </Tabs.TabPanel>
                    </Tabs>

                    <div style={{
                        marginTop: '20px',
                        padding: '12px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px',
                        fontSize: '14px',
                        color: '#7f8c8d'
                    }}>
                        Currently viewing: <strong>Tab {selectedTab}</strong>
                    </div>
                </div>

                <div style={{
                    backgroundColor: '#e8f4f8',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #b8dce8'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 Pattern Explanation
                    </h3>
                    <ul style={{ color: '#34495e', lineHeight: '1.8' }}>
                        <li><strong>Shared Context:</strong> All Tab components share state through React Context</li>
                        <li><strong>Flexible API:</strong> Components can be composed in any order</li>
                        <li><strong>Implicit State:</strong> No need to manually pass props between siblings</li>
                        <li><strong>Encapsulation:</strong> Internal logic is hidden from consumers</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CompoundComponentDemo;