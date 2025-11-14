import React, { useState } from 'react';

/**
 * MODULE PATTERN DEMONSTRATION
 */

const CounterModule = (() => {
    let count = 0;
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count,
        reset: () => count = 0
    };
})();

function ModulePatternDemo() {
    const [count, setCount] = useState(0);

    const updateCount = () => setCount(CounterModule.getCount());

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f6fa', padding: '40px 20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ color: '#2c3e50' }}>Module Pattern</h1>
                    <p style={{ color: '#7f8c8d' }}>Encapsulation and privacy</p>
                </header>
                <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '48px', color: '#3498db' }}>{count}</h2>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button onClick={() => { CounterModule.increment(); updateCount(); }} style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                        <button onClick={() => { CounterModule.decrement(); updateCount(); }} style={{ padding: '10px 20px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                        <button onClick={() => { CounterModule.reset(); updateCount(); }} style={{ padding: '10px 20px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModulePatternDemo;
