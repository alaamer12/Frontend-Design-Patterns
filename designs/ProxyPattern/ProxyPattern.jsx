import React, { useState } from 'react';

/**
 * PROXY PATTERN DEMONSTRATION
 */

function ImageProxy({ src, alt }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div style={{ position: 'relative', width: '200px', height: '200px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            {!loaded && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Loading...
                </div>
            )}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', display: loaded ? 'block' : 'none' }}
            />
        </div>
    );
}

function ProxyPatternDemo() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f6fa', padding: '40px 20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ color: '#2c3e50' }}>Proxy Pattern</h1>
                    <p style={{ color: '#7f8c8d' }}>Control access to objects</p>
                </header>
                <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
                    <h3>🖼️ Image Proxy (Lazy Loading)</h3>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <ImageProxy src="https://via.placeholder.com/200" alt="Image 1" />
                        <ImageProxy src="https://via.placeholder.com/200/0000FF" alt="Image 2" />
                        <ImageProxy src="https://via.placeholder.com/200/FF0000" alt="Image 3" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProxyPatternDemo;
