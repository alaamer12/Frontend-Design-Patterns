import React, { useState } from 'react';

/**
 * LAYOUT PATTERN DEMONSTRATION
 */

function MainLayout({ children }) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{ padding: '20px', backgroundColor: '#2c3e50', color: 'white' }}>
                <h1 style={{ margin: 0 }}>Main Layout Header</h1>
            </header>
            <main style={{ flex: 1, padding: '20px', backgroundColor: '#ecf0f1' }}>
                {children}
            </main>
            <footer style={{ padding: '20px', backgroundColor: '#34495e', color: 'white', textAlign: 'center' }}>
                <p style={{ margin: 0 }}>Footer © 2024</p>
            </footer>
        </div>
    );
}

function SidebarLayout({ children }) {
    return (
        <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '200px 1fr' }}>
            <aside style={{ padding: '20px', backgroundColor: '#34495e', color: 'white' }}>
                <h3>Sidebar</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '8px' }}>Menu 1</li>
                    <li style={{ marginBottom: '8px' }}>Menu 2</li>
                    <li style={{ marginBottom: '8px' }}>Menu 3</li>
                </ul>
            </aside>
            <main style={{ padding: '20px', backgroundColor: '#ecf0f1' }}>
                {children}
            </main>
        </div>
    );
}

function LayoutPatternDemo() {
    const [layout, setLayout] = useState('main');

    const layouts = {
        main: <MainLayout><h2>Main Layout Content</h2><p>This uses the main layout with header and footer.</p></MainLayout>,
        sidebar: <SidebarLayout><h2>Sidebar Layout Content</h2><p>This uses the sidebar layout.</p></SidebarLayout>
    };

    return (
        <div>
            <div style={{ padding: '20px', backgroundColor: '#3498db', color: 'white', textAlign: 'center' }}>
                <button onClick={() => setLayout('main')} style={{ marginRight: '8px', padding: '10px 20px', backgroundColor: layout === 'main' ? '#2c3e50' : 'white', color: layout === 'main' ? 'white' : '#2c3e50', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Main Layout</button>
                <button onClick={() => setLayout('sidebar')} style={{ padding: '10px 20px', backgroundColor: layout === 'sidebar' ? '#2c3e50' : 'white', color: layout === 'sidebar' ? 'white' : '#2c3e50', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sidebar Layout</button>
            </div>
            {layouts[layout]}
        </div>
    );
}

export default LayoutPatternDemo;
