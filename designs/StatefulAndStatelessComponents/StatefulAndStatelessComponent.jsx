import React from 'react';

// Stateful Component
function StatefulComponent(props) {
    const [state, setState] = React.useState(0);

    return (
        <div>
            <CounterDisplay value={state} />
            <button onClick={() => setState(state + 1)}>Increment</button>
        </div>
    );
}

// Stateless Component
function CounterDisplay(props) {
    return (
        <div>{props.value}</div>
    );
}

function StatefulAndStatelessComponent(props) {
    return (
        <div></div>
    );
}

export default StatefulAndStatelessComponent;