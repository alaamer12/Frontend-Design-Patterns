import React, { useState, useEffect, createContext, useContext } from 'react';

/**
 * OBSERVER PATTERN DEMONSTRATION
 * 
 * The Observer pattern defines a one-to-many dependency between objects so that
 * when one object changes state, all its dependents are notified automatically.
 * 
 * Benefits:
 * - Loose coupling between components
 * - Event-driven architecture
 * - Easy to add/remove observers
 * - Scalable notification system
 * - Reactive updates
 */

// ============================================================================
// EVENT EMITTER - Core observer implementation
// ============================================================================

/**
 * EventEmitter - Simple event emitter for observer pattern
 */
class EventEmitter {
    constructor() {
        this.events = {};
    }

    /**
     * Subscribe to an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);

        // Return unsubscribe function
        return () => {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        };
    }

    /**
     * Emit an event
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    /**
     * Unsubscribe from an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback to remove
     */
    unsubscribe(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
}

// Create global event emitter
const eventEmitter = new EventEmitter();

// ============================================================================
// CUSTOM HOOKS FOR OBSERVER PATTERN
// ============================================================================

/**
 * useEventEmitter - Hook to use event emitter
 * 
 * @returns {EventEmitter} Event emitter instance
 */
function useEventEmitter() {
    return eventEmitter;
}

/**
 * useEventListener - Hook to subscribe to events
 * 
 * @param {string} event - Event name
 * @param {Function} callback - Callback function
 */
function useEventListener(event, callback) {
    const emitter = useEventEmitter();

    useEffect(() => {
        const unsubscribe = emitter.subscribe(event, callback);
        return unsubscribe;
    }, [event, callback, emitter]);
}

// ============================================================================
// DEMO COMPONENTS
// ============================================================================

/**
 * Publisher - Component that publishes events
 */
function Publisher() {
    const emitter = useEventEmitter();
    const [message, setMessage] = useState('');

    const publishMessage = () => {
        if (message.trim()) {
            emitter.emit('message', {
                text: message,
                timestamp: new Date().toLocaleTimeString()
            });
            setMessage('');
        }
    };

    const publishNotification = (type) => {
        emitter.emit('notification', {
            type,
            message: `${type.charAt(0).toUpperCase() + type.slice(1)} notification sent!`,
            timestamp: new Date().toLocaleTimeString()
        });
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#e8f4f8',
            borderRadius: '8px',
            border: '2px solid #3498db'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>📢 Publisher</h3>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                Publish events that observers will receive
            </p>

            <div style={{ marginBottom: '16px' }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && publishMessage()}
                    placeholder="Type a message..."
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #3498db',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        marginBottom: '8px'
                    }}
                />
                <button
                    onClick={publishMessage}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Publish Message
                </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                {['success', 'warning', 'error'].map(type => (
                    <button
                        key={type}
                        onClick={() => publishNotification(type)}
                        style={{
                            flex: 1,
                            padding: '8px',
                            backgroundColor: '#ecf0f1',
                            color: '#2c3e50',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            textTransform: 'capitalize'
                        }}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
    );
}

/**
 * MessageObserver - Component that observes message events
 */
function MessageObserver() {
    const [messages, setMessages] = useState([]);

    useEventListener('message', (data) => {
        setMessages(prev => [...prev, data]);
    });

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#e8f8f0',
            borderRadius: '8px',
            border: '2px solid #27ae60'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>💬 Message Observer</h3>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                Listening for message events
            </p>
            <div style={{
                maxHeight: '200px',
                overflowY: 'auto',
                backgroundColor: 'white',
                borderRadius: '4px',
                padding: '12px'
            }}>
                {messages.length === 0 ? (
                    <p style={{ color: '#95a5a6', textAlign: 'center', margin: 0 }}>
                        No messages yet
                    </p>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '8px',
                                marginBottom: '8px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '4px',
                                borderLeft: '3px solid #27ae60'
                            }}
                        >
                            <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                {msg.text}
                            </div>
                            <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                                {msg.timestamp}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

/**
 * NotificationObserver - Component that observes notification events
 */
function NotificationObserver() {
    const [notifications, setNotifications] = useState([]);

    useEventListener('notification', (data) => {
        setNotifications(prev => [...prev, { ...data, id: Date.now() }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== data.id));
        }, 3000);
    });

    const typeColors = {
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c'
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f4e8f8',
            borderRadius: '8px',
            border: '2px solid #9b59b6'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>🔔 Notification Observer</h3>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                Listening for notification events
            </p>
            <div style={{
                minHeight: '100px',
                backgroundColor: 'white',
                borderRadius: '4px',
                padding: '12px'
            }}>
                {notifications.length === 0 ? (
                    <p style={{ color: '#95a5a6', textAlign: 'center', margin: 0 }}>
                        No notifications
                    </p>
                ) : (
                    notifications.map((notif) => (
                        <div
                            key={notif.id}
                            style={{
                                padding: '12px',
                                marginBottom: '8px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '4px',
                                borderLeft: `4px solid ${typeColors[notif.type]}`,
                                animation: 'fadeIn 0.3s ease-in'
                            }}
                        >
                            <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                {notif.message}
                            </div>
                            <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                                {notif.timestamp}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

/**
 * StatisticsObserver - Component that tracks event statistics
 */
function StatisticsObserver() {
    const [stats, setStats] = useState({
        messages: 0,
        notifications: 0,
        total: 0
    });

    useEventListener('message', () => {
        setStats(prev => ({
            ...prev,
            messages: prev.messages + 1,
            total: prev.total + 1
        }));
    });

    useEventListener('notification', () => {
        setStats(prev => ({
            ...prev,
            notifications: prev.notifications + 1,
            total: prev.total + 1
        }));
    });

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#fff4e8',
            borderRadius: '8px',
            border: '2px solid #f39c12'
        }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>📊 Statistics Observer</h3>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                Tracking all events
            </p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px'
            }}>
                {[
                    { label: 'Messages', value: stats.messages, color: '#27ae60' },
                    { label: 'Notifications', value: stats.notifications, color: '#9b59b6' },
                    { label: 'Total Events', value: stats.total, color: '#f39c12' }
                ].map(stat => (
                    <div
                        key={stat.label}
                        style={{
                            padding: '16px',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{
                            fontSize: '32px',
                            fontWeight: 'bold',
                            color: stat.color
                        }}>
                            {stat.value}
                        </div>
                        <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

/**
 * ObserverPatternDemo - Main demonstration component
 * 
 * @returns {JSX.Element} Complete demonstration of observer pattern
 */
function ObserverPatternDemo() {
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
                        Observer Pattern
                    </h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '16px'
                    }}>
                        Event-driven communication between components
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    <Publisher />
                    <MessageObserver />
                    <NotificationObserver />
                    <StatisticsObserver />
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 Observer Pattern Benefits
                    </h3>
                    <ul style={{ color: '#34495e', lineHeight: '1.8' }}>
                        <li><strong>Loose Coupling:</strong> Publishers don't know about observers</li>
                        <li><strong>Scalability:</strong> Easy to add/remove observers</li>
                        <li><strong>Event-Driven:</strong> Reactive updates when state changes</li>
                        <li><strong>Flexibility:</strong> Multiple observers can react to same event</li>
                        <li><strong>Maintainability:</strong> Clear separation of concerns</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ObserverPatternDemo;
