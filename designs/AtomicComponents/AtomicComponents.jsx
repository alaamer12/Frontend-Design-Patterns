import React from 'react';

/**
 * ATOMIC DESIGN PATTERN DEMONSTRATION
 * 
 * This file demonstrates the Atomic Design methodology, which organizes components
 * into five distinct levels: Atoms, Molecules, Organisms, Templates, and Pages.
 * 
 * Hierarchy:
 * - Atoms: Basic building blocks (buttons, inputs, labels)
 * - Molecules: Groups of atoms functioning together
 * - Organisms: Complex UI sections composed of molecules/atoms
 * - Templates: Page-level layouts without specific content
 * - Pages: Specific instances of templates with real data
 */

// ============================================================================
// ATOMS - Basic building blocks
// ============================================================================

/**
 * AtomComponent - A basic button atom
 * 
 * Atoms are the smallest possible components that can't be broken down further
 * without losing their meaning. They serve as the foundational building blocks.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Text to display on the button
 * @param {Function} props.onClick - Click event handler
 * @returns {JSX.Element} A styled button element
 * 
 * @example
 * <AtomComponent label="Submit" onClick={() => console.log('Clicked')} />
 */
function AtomComponent({ label, onClick }) {
    return (
        <button 
            onClick={onClick}
            style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
            {label}
        </button>
    );
}

// ============================================================================
// MOLECULES - Groups of atoms working together
// ============================================================================

/**
 * MoleculeComponent - A form field molecule combining label, input, and button
 * 
 * Molecules are groups of atoms bonded together to form a relatively simple
 * component with a specific purpose. They have their own properties and can
 * serve as the backbone of a design system.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the input field
 * @param {string} props.inputType - HTML input type (text, email, password, etc.)
 * @param {string} props.buttonText - Text to display on the button
 * @param {Function} props.onButtonClicked - Handler for button click events
 * @returns {JSX.Element} A form field with label, input, and button
 * 
 * @example
 * <MoleculeComponent 
 *   label="Email Address"
 *   inputType="email"
 *   buttonText="Subscribe"
 *   onButtonClicked={handleSubscribe}
 * />
 */
function MoleculeComponent({ label, inputType = 'text', buttonText, onButtonClicked }) {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            marginBottom: '16px'
        }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>
                {label}
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                    type={inputType}
                    style={{
                        flex: 1,
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                    placeholder={`Enter ${label.toLowerCase()}`}
                />
                <AtomComponent label={buttonText} onClick={onButtonClicked} />
            </div>
        </div>
    );
}

// ============================================================================
// ORGANISMS - Complex UI sections
// ============================================================================

/**
 * OrganismComponent - A form section organism
 * 
 * Organisms are relatively complex components composed of groups of molecules
 * and/or atoms. They form distinct sections of an interface and are responsible
 * for a significant piece of functionality.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Main heading for the organism
 * @param {string} props.buttonText - Text for the action button
 * @param {Function} props.onButtonClicked - Handler for button interactions
 * @returns {JSX.Element} A complete form section with heading and form fields
 * 
 * @example
 * <OrganismComponent 
 *   label="User Registration"
 *   buttonText="Register"
 *   onButtonClicked={handleRegistration}
 * />
 */
function OrganismComponent({ label, buttonText, onButtonClicked }) {
    return (
        <section style={{
            padding: '24px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginBottom: '24px'
        }}>
            <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#333' }}>
                {label}
            </h2>
            <MoleculeComponent 
                label="Username" 
                inputType="text"
                buttonText={buttonText} 
                onButtonClicked={onButtonClicked} 
            />
            <MoleculeComponent 
                label="Email" 
                inputType="email"
                buttonText={buttonText} 
                onButtonClicked={onButtonClicked} 
            />
        </section>
    );
}

// ============================================================================
// TEMPLATES - Page-level layouts
// ============================================================================

/**
 * TemplateComponent - A page layout template
 * 
 * Templates are page-level objects that place components into a layout and
 * articulate the design's underlying content structure. They focus on the
 * page's skeleton without the final content.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Main page heading
 * @param {string} props.buttonText - Text for action buttons
 * @param {Function} props.onButtonClicked - Handler for button interactions
 * @param {React.ReactNode} props.children - Additional content to render
 * @returns {JSX.Element} A complete page layout structure
 * 
 * @example
 * <TemplateComponent 
 *   label="Dashboard"
 *   buttonText="Save"
 *   onButtonClicked={handleSave}
 * >
 *   <p>Additional content here</p>
 * </TemplateComponent>
 */
function TemplateComponent({ label, buttonText, onButtonClicked, children }) {
    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px'
        }}>
            <h1 style={{ 
                fontSize: '32px', 
                marginBottom: '24px',
                color: '#2c3e50'
            }}>
                {label}
            </h1>
            <OrganismComponent 
                label="Contact Information" 
                buttonText={buttonText} 
                onButtonClicked={onButtonClicked} 
            />
            {children && (
                <div style={{ marginTop: '24px' }}>
                    {children}
                </div>
            )}
        </div>
    );
}

// ============================================================================
// PAGES - Specific instances with real content
// ============================================================================

/**
 * AtomicComponents - A complete page demonstrating the Atomic Design pattern
 * 
 * Pages are specific instances of templates that show what a UI looks like
 * with real representative content in place. This is the most concrete level
 * where users interact with the actual application.
 * 
 * @param {Object} props - Component props (spread to TemplateComponent)
 * @param {string} [props.label='Atomic Design Demo'] - Page title
 * @param {string} [props.buttonText='Submit'] - Button text
 * @param {Function} [props.onButtonClicked] - Button click handler
 * @returns {JSX.Element} A complete page with header, content, and footer
 * 
 * @example
 * <AtomicComponents 
 *   label="User Profile"
 *   buttonText="Update Profile"
 *   onButtonClicked={() => console.log('Profile updated')}
 * />
 */
function AtomicComponents(props) {
    // Default props for demonstration
    const defaultProps = {
        label: 'Atomic Design Demo',
        buttonText: 'Submit',
        onButtonClicked: () => alert('Button clicked! This demonstrates the Atomic Design pattern.')
    };

    // Merge default props with provided props
    const mergedProps = { ...defaultProps, ...props };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#ffffff'
        }}>
            <header 
                className="App-header"
                style={{
                    backgroundColor: '#282c34',
                    padding: '20px',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <h1>Atomic Design Pattern</h1>
                <p style={{ fontSize: '14px', opacity: 0.8 }}>
                    Building UIs from Atoms → Molecules → Organisms → Templates → Pages
                </p>
            </header>
            
            <main>
                <TemplateComponent {...mergedProps} />
            </main>
            
            <footer 
                className="App-footer"
                style={{
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    textAlign: 'center',
                    marginTop: '40px',
                    borderTop: '1px solid #dee2e6'
                }}
            >
                <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
                    Atomic Design Pattern Example - Building scalable component systems
                </p>
            </footer>
        </div>
    );
}

export default AtomicComponents;