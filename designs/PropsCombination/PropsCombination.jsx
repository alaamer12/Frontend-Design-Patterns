import React from 'react';

function PropsCombination({ type, message, dismissible }) {
    const renderIcon = () => {
    switch (type) {
        case 'success':
            return '✔️';
        case 'error':
            return '❌';
        case 'info':
            return 'ℹ️';
        default:
            return '🔔';
        }
    };
    return (
        <div className={`notification ${type}`}>
            <span className="icon">{renderIcon()}</span>
            <span className="message">{message}</span>
            {dismissible &&
                <button className="close-btn">X
                </button>
            }
        </div>
    );
}

export default PropsCombination;