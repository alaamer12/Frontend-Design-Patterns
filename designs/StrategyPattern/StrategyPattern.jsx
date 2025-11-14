import React, { useState } from 'react';

/**
 * STRATEGY PATTERN DEMONSTRATION
 * 
 * Strategy pattern defines a family of algorithms, encapsulates each one,
 * and makes them interchangeable at runtime.
 */

// Payment Strategies
const paymentStrategies = {
    creditCard: {
        name: 'Credit Card',
        icon: '💳',
        process: (amount) => `Processing $${amount} via Credit Card`,
        fee: (amount) => amount * 0.029 + 0.30
    },
    paypal: {
        name: 'PayPal',
        icon: '🅿️',
        process: (amount) => `Processing $${amount} via PayPal`,
        fee: (amount) => amount * 0.034 + 0.30
    },
    crypto: {
        name: 'Cryptocurrency',
        icon: '₿',
        process: (amount) => `Processing $${amount} via Crypto`,
        fee: (amount) => amount * 0.01
    }
};

// Sorting Strategies
const sortStrategies = {
    name: (items) => [...items].sort((a, b) => a.name.localeCompare(b.name)),
    price: (items) => [...items].sort((a, b) => a.price - b.price),
    rating: (items) => [...items].sort((a, b) => b.rating - a.rating)
};

// Validation Strategies
const validationStrategies = {
    email: (value) => /\S+@\S+\.\S+/.test(value) ? null : 'Invalid email',
    phone: (value) => /^\d{10}$/.test(value) ? null : 'Invalid phone (10 digits)',
    url: (value) => /^https?:\/\/.+/.test(value) ? null : 'Invalid URL'
};

function PaymentDemo() {
    const [strategy, setStrategy] = useState('creditCard');
    const [amount, setAmount] = useState(100);

    const currentStrategy = paymentStrategies[strategy];
    const fee = currentStrategy.fee(amount);

    return (
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
            <h3 style={{ marginTop: 0 }}>💰 Payment Strategy</h3>
            <div style={{ marginBottom: '16px' }}>
                <label>Amount: $</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={{ marginLeft: '8px', padding: '6px', width: '100px' }}
                />
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {Object.entries(paymentStrategies).map(([key, strat]) => (
                    <button
                        key={key}
                        onClick={() => setStrategy(key)}
                        style={{
                            padding: '10px',
                            backgroundColor: strategy === key ? '#3498db' : '#ecf0f1',
                            color: strategy === key ? 'white' : '#2c3e50',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {strat.icon} {strat.name}
                    </button>
                ))}
            </div>
            <div style={{ padding: '16px', backgroundColor: '#e8f4f8', borderRadius: '4px' }}>
                <p><strong>Processing:</strong> {currentStrategy.process(amount)}</p>
                <p><strong>Fee:</strong> ${fee.toFixed(2)}</p>
                <p><strong>Total:</strong> ${(amount + fee).toFixed(2)}</p>
            </div>
        </div>
    );
}

function SortingDemo() {
    const [strategy, setStrategy] = useState('name');
    const items = [
        { name: 'Product C', price: 30, rating: 4.5 },
        { name: 'Product A', price: 50, rating: 4.0 },
        { name: 'Product B', price: 20, rating: 4.8 }
    ];

    const sortedItems = sortStrategies[strategy](items);

    return (
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
            <h3 style={{ marginTop: 0 }}>📊 Sorting Strategy</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {Object.keys(sortStrategies).map(key => (
                    <button
                        key={key}
                        onClick={() => setStrategy(key)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: strategy === key ? '#27ae60' : '#ecf0f1',
                            color: strategy === key ? 'white' : '#2c3e50',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            textTransform: 'capitalize'
                        }}
                    >
                        Sort by {key}
                    </button>
                ))}
            </div>
            <div>
                {sortedItems.map((item, i) => (
                    <div key={i} style={{
                        padding: '12px',
                        marginBottom: '8px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px'
                    }}>
                        <strong>{item.name}</strong> - ${item.price} - ⭐ {item.rating}
                    </div>
                ))}
            </div>
        </div>
    );
}

function StrategyPatternDemo() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f6fa', padding: '40px 20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ color: '#2c3e50' }}>Strategy Pattern</h1>
                    <p style={{ color: '#7f8c8d' }}>Interchangeable algorithms</p>
                </header>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
                    <PaymentDemo />
                    <SortingDemo />
                </div>
            </div>
        </div>
    );
}

export default StrategyPatternDemo;
