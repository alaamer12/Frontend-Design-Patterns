import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * PORTAL PATTERN DEMONSTRATION
 * 
 * Portals provide a way to render children into a DOM node that exists
 * outside the parent component's DOM hierarchy. This is useful for modals,
 * tooltips, dropdowns, and other overlay components.
 * 
 * Benefits:
 * - Escape parent overflow/z-index constraints
 * - Better accessibility
 * - Cleaner DOM structure
 * - Event bubbling still works
 * - Flexible positioning
 */

// ============================================================================
// PORTAL UTILITIES
// ============================================================================

/**
 * usePortal - Custom hook to create and manage portal root
 * 
 * @param {string} [id='portal-root'] - Portal container ID
 * @returns {HTMLElement} Portal root element
 */
function usePortal(id = 'portal-root') {
    const [portalRoot] = useState(() => {
        let element = document.getElementById(id);
        if (!element) {
            element = document.createElement('div');
            element.id = id;
            document.body.appendChild(element);
        }
        return element;
    });

    useEffect(() => {
        return () => {
            // Cleanup: remove if empty
            if (portalRoot && portalRoot.childNodes.length === 0) {
                portalRoot.remove();
            }
        };
    }, [portalRoot]);

    return portalRoot;
}

// ============================================================================
// MODAL COMPONENT USING PORTAL
// ============================================================================

/**
 * Modal - A modal dialog using portal pattern
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Close handler
 * @param {string} [props.title] - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @returns {JSX.Element|null} Modal rendered in portal
 */
function Modal({ isOpen, onClose, title, children }) {
    const portalRoot = usePortal('modal-root');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '20px'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    maxWidth: '500px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div style={{
                        padding: '20px',
                        borderBottom: '1px solid #e0e0e0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <h2 style={{ margin: 0, color: '#2c3e50' }}>{title}</h2>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: '#7f8c8d',
                                padding: '0',
                                width: '30px',
                                height: '30px'
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}
                <div style={{ padding: '20px' }}>
                    {children}
                </div>
            </div>
        </div>,
        portalRoot
    );
}

// ============================================================================
// TOOLTIP COMPONENT USING PORTAL
// ============================================================================

/**
 * Tooltip - A tooltip using portal pattern
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Trigger element
 * @param {string} props.content - Tooltip content
 * @param {string} [props.position='top'] - Tooltip position
 * @returns {JSX.Element} Tooltip with trigger
 */
function Tooltip({ children, content, position = 'top' }) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const portalRoot = usePortal('tooltip-root');

    const updatePosition = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            let top, left;

            switch (position) {
                case 'top':
                    top = rect.top + scrollTop - 40;
                    left = rect.left + scrollLeft + rect.width / 2;
                    break;
                case 'bottom':
                    top = rect.bottom + scrollTop + 10;
                    left = rect.left + scrollLeft + rect.width / 2;
                    break;
                case 'left':
                    top = rect.top + scrollTop + rect.height / 2;
                    left = rect.left + scrollLeft - 10;
                    break;
                case 'right':
                    top = rect.top + scrollTop + rect.height / 2;
                    left = rect.right + scrollLeft + 10;
                    break;
                default:
                    top = rect.top + scrollTop - 40;
                    left = rect.left + scrollLeft + rect.width / 2;
            }

            setCoords({ top, left });
        }
    };

    const handleMouseEnter = () => {
        setIsVisible(true);
        updatePosition();
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <>
            <span
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ display: 'inline-block' }}
            >
                {children}
            </span>
            {isVisible && createPortal(
                <div
                    style={{
                        position: 'absolute',
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                        transform: position === 'top' || position === 'bottom'
                            ? 'translateX(-50%)'
                            : 'translateY(-50%)',
                        backgroundColor: '#2c3e50',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        zIndex: 9999,
                        pointerEvents: 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                >
                    {content}
                </div>,
                portalRoot
            )}
        </>
    );
}

// ============================================================================
// NOTIFICATION COMPONENT USING PORTAL
// ============================================================================

/**
 * Notification - A notification toast using portal pattern
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - Notification message
 * @param {string} [props.type='info'] - Notification type
 * @param {Function} props.onClose - Close handler
 * @returns {JSX.Element} Notification rendered in portal
 */
function Notification({ message, type = 'info', onClose }) {
    const portalRoot = usePortal('notification-root');

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const typeColors = {
        success: { bg: '#27ae60', icon: '✓' },
        error: { bg: '#e74c3c', icon: '✗' },
        warning: { bg: '#f39c12', icon: '⚠' },
        info: { bg: '#3498db', icon: 'ℹ' }
    };

    const config = typeColors[type];

    return createPortal(
        <div
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                backgroundColor: config.bg,
                color: 'white',
                padding: '16px 20px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                minWidth: '300px',
                zIndex: 9999,
                animation: 'slideIn 0.3s ease-out'
            }}
        >
            <style>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
            <span style={{ fontSize: '20px' }}>{config.icon}</span>
            <span style={{ flex: 1 }}>{message}</span>
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '0',
                    width: '20px',
                    height: '20px'
                }}
            >
                ×
            </button>
        </div>,
        portalRoot
    );
}

// ============================================================================
// DROPDOWN COMPONENT USING PORTAL
// ============================================================================

/**
 * Dropdown - A dropdown menu using portal pattern
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.trigger - Trigger element
 * @param {Array} props.items - Dropdown items
 * @returns {JSX.Element} Dropdown with trigger
 */
function Dropdown({ trigger, items }) {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const portalRoot = usePortal('dropdown-root');

    const updatePosition = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            setCoords({
                top: rect.bottom + scrollTop + 5,
                left: rect.left + scrollLeft
            });
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            updatePosition();
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (triggerRef.current && !triggerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <div ref={triggerRef} onClick={handleToggle}>
                {trigger}
            </div>
            {isOpen && createPortal(
                <div
                    style={{
                        position: 'absolute',
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        minWidth: '200px',
                        zIndex: 9999
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                item.onClick?.();
                                setIsOpen(false);
                            }}
                            style={{
                                padding: '12px 16px',
                                cursor: 'pointer',
                                borderBottom: index < items.length - 1 ? '1px solid #f0f0f0' : 'none'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'white';
                            }}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>,
                portalRoot
            )}
        </>
    );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

/**
 * PortalPatternDemo - Main demonstration component
 * 
 * @returns {JSX.Element} Complete demonstration of portal pattern
 */
function PortalPatternDemo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const addNotification = (type) => {
        const id = Date.now();
        const messages = {
            success: 'Operation completed successfully!',
            error: 'An error occurred!',
            warning: 'Warning: Please check your input!',
            info: 'Here is some information.'
        };

        setNotifications(prev => [...prev, { id, type, message: messages[type] }]);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

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
                        Portal Pattern
                    </h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '16px'
                    }}>
                        Render components outside the parent DOM hierarchy
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    {/* Modal Demo */}
                    <div style={{
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ marginTop: 0, color: '#2c3e50' }}>🪟 Modal Portal</h3>
                        <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                            Modals rendered outside parent DOM
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#3498db',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Open Modal
                        </button>
                    </div>

                    {/* Tooltip Demo */}
                    <div style={{
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ marginTop: 0, color: '#2c3e50' }}>💬 Tooltip Portal</h3>
                        <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                            Tooltips that escape overflow constraints
                        </p>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <Tooltip content="Top tooltip" position="top">
                                <button style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#27ae60',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}>
                                    Hover Top
                                </button>
                            </Tooltip>
                            <Tooltip content="Bottom tooltip" position="bottom">
                                <button style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#9b59b6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}>
                                    Hover Bottom
                                </button>
                            </Tooltip>
                        </div>
                    </div>

                    {/* Notification Demo */}
                    <div style={{
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ marginTop: 0, color: '#2c3e50' }}>🔔 Notification Portal</h3>
                        <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                            Toast notifications in fixed position
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {['success', 'error', 'warning', 'info'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => addNotification(type)}
                                    style={{
                                        padding: '8px 12px',
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

                    {/* Dropdown Demo */}
                    <div style={{
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ marginTop: 0, color: '#2c3e50' }}>📋 Dropdown Portal</h3>
                        <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                            Dropdown menus that escape parent overflow
                        </p>
                        <Dropdown
                            trigger={
                                <button style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#f39c12',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}>
                                    Open Menu ▼
                                </button>
                            }
                            items={[
                                { label: '📝 Edit', onClick: () => alert('Edit clicked') },
                                { label: '📋 Copy', onClick: () => alert('Copy clicked') },
                                { label: '🗑️ Delete', onClick: () => alert('Delete clicked') }
                            ]}
                        />
                    </div>
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
                        💡 Portal Pattern Benefits
                    </h3>
                    <ul style={{ color: '#34495e', lineHeight: '1.8' }}>
                        <li><strong>Escape Constraints:</strong> Break out of parent overflow and z-index</li>
                        <li><strong>Event Bubbling:</strong> Events still bubble through React tree</li>
                        <li><strong>Accessibility:</strong> Maintain proper focus management</li>
                        <li><strong>Clean DOM:</strong> Render overlays at document root</li>
                        <li><strong>Positioning:</strong> Easier absolute positioning</li>
                    </ul>
                </div>
            </div>

            {/* Modal Portal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Portal Modal Example"
            >
                <p style={{ margin: '0 0 16px 0', color: '#2c3e50' }}>
                    This modal is rendered using a portal, which means it's rendered
                    outside the parent component's DOM hierarchy.
                </p>
                <p style={{ margin: '0 0 16px 0', color: '#7f8c8d' }}>
                    This allows it to escape any overflow or z-index constraints from
                    parent components.
                </p>
                <button
                    onClick={() => setIsModalOpen(false)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Close Modal
                </button>
            </Modal>

            {/* Notification Portals */}
            {notifications.map((notification, index) => (
                <div
                    key={notification.id}
                    style={{
                        position: 'fixed',
                        top: `${20 + index * 80}px`,
                        right: '20px',
                        zIndex: 9999
                    }}
                >
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => removeNotification(notification.id)}
                    />
                </div>
            ))}
        </div>
    );
}

export default PortalPatternDemo;
