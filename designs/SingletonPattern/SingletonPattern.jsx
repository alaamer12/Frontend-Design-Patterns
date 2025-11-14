import React, { useState, useEffect } from 'react';

/**
 * SINGLETON PATTERN DEMONSTRATION
 * 
 * Ensures a class has only one instance and provides a global point of access to it.
 * Useful for managing shared resources like configuration, caching, or state management.
 */

// ============================================================================
// SINGLETON IMPLEMENTATIONS
// ============================================================================

/**
 * ConfigManager - Singleton for application configuration
 */
class ConfigManager {
    static instance = null;

    constructor() {
        if (ConfigManager.instance) {
            return ConfigManager.instance;
        }
        this.config = {
            apiUrl: 'https://api.example.com',
            theme: 'light',
            language: 'en'
        };
        ConfigManager.instance = this;
    }

    static getInstance() {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    getConfig(key) {
        return this.config[key];
    }

    setConfig(key, value) {
        this.config[key] = value;
    }

    getAllConfig() {
        return { ...this.config };
    }
}

/**
 * CacheManager - Singleton for caching data
 */
class CacheManager {
    static instance = null;
    cache = new Map();

    static getInstance() {
        if (!CacheManager.instance) {
            CacheManager.instance = new CacheManager();
        }
        return CacheManager.instance;
    }

    set(key, value, ttl = 60000) {
        this.cache.set(key, {
            value,
            expiry: Date.now() + ttl
        });
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }
        return item.value;
    }

    clear() {
        this.cache.clear();
    }

    getStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

// ============================================================================
// DEMO COMPONENTS
// ============================================================================

function ConfigDemo() {
    const [config, setConfig] = useState({});
    const configManager = ConfigManager.getInstance();

    useEffect(() => {
        setConfig(configManager.getAllConfig());
    }, []);

    const updateConfig = (key, value) => {
        configManager.setConfig(key, value);
        setConfig(configManager.getAllConfig());
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#e8f4f8',
            borderRadius: '8px',
            border: '2px solid #3498db'
        }}>
            <h3 style={{ marginTop: 0 }}>⚙️ Config Singleton</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Object.entries(config).map(([key, value]) => (
                    <div key={key}>
                        <label style={{ fontWeight: 'bold' }}>{key}:</label>
                        <input
                            value={value}
                            onChange={(e) => updateConfig(key, e.target.value)}
                            style={{
                                marginLeft: '8px',
                                padding: '6px',
                                border: '1px solid #3498db',
                                borderRadius: '4px'
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function CacheDemo() {
    const [cacheStats, setCacheStats] = useState({ size: 0, keys: [] });
    const cacheManager = CacheManager.getInstance();

    const updateStats = () => {
        setCacheStats(cacheManager.getStats());
    };

    const addToCache = () => {
        const key = `item-${Date.now()}`;
        cacheManager.set(key, `Value ${Date.now()}`, 10000);
        updateStats();
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#e8f8f0',
            borderRadius: '8px',
            border: '2px solid #27ae60'
        }}>
            <h3 style={{ marginTop: 0 }}>💾 Cache Singleton</h3>
            <p>Cache Size: {cacheStats.size}</p>
            <button
                onClick={addToCache}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '8px'
                }}
            >
                Add Item
            </button>
            <button
                onClick={() => {
                    cacheManager.clear();
                    updateStats();
                }}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Clear Cache
            </button>
        </div>
    );
}

function SingletonPatternDemo() {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f5f6fa',
            padding: '40px 20px'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ color: '#2c3e50' }}>Singleton Pattern</h1>
                    <p style={{ color: '#7f8c8d' }}>
                        Ensure a class has only one instance
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px'
                }}>
                    <ConfigDemo />
                    <CacheDemo />
                </div>

                <div style={{
                    marginTop: '24px',
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px'
                }}>
                    <h3>💡 Singleton Benefits</h3>
                    <ul>
                        <li><strong>Single Instance:</strong> Only one instance exists</li>
                        <li><strong>Global Access:</strong> Accessible from anywhere</li>
                        <li><strong>Lazy Initialization:</strong> Created when first needed</li>
                        <li><strong>Resource Management:</strong> Shared resources</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SingletonPatternDemo;
