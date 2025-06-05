import React from 'react';

// Normal component
function NormalComponent(props) {
    return (
        <div>
            <p>Normal Component</p>
        </div>
    );
}

// Higher-Order Component (HOC)
function withHOC(WrappedComponent) {
    return function HOC(props) {
        return (
            <div>
                <p>HOC Component</p>
                <WrappedComponent {...props} />
            </div>
        );
    };
}

// Export the HOC-wrapped component
export default withHOC(NormalComponent);
