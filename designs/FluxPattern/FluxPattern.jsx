import React, { useState, useEffect } from 'react';

/**
 * FLUX PATTERN DEMONSTRATION
 */

const store = {
    state: { count: 0, todos: [] },
    listeners: [],
    getState() { return { ...this.state }; },
    dispatch(action) {
        switch (action.type) {
            case 'INCREMENT':
                this.state.count++;
                break;
            case 'DECREMENT':
                this.state.count--;
                break;
            case 'ADD_TODO':
                this.state.todos.push(action.payload);
                break;
        }
        this.listeners.forEach(listener => listener());
    },
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
};

function FluxPatternDemo() {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState());
        });
        return unsubscribe;
    }, []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f6fa', padding: '40px 20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ color: '#2c3e50' }}>Flux Pattern</h1>
                    <p style={{ color: '#7f8c8d' }}>Unidirectional data flow</p>
                </header>
                <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
                    <h2 style={{ fontSize: '48px', textAlign: 'center', color: '#3498db' }}>{state.count}</h2>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button onClick={() => store.dispatch({ type: 'INCREMENT' })} style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Increment</button>
                        <button onClick={() => store.dispatch({ type: 'DECREMENT' })} style={{ padding: '10px 20px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Decrement</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FluxPatternDemo;
