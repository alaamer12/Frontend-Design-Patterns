# State Reducer in React

## About

The state reducer pattern is an advanced pattern that allows you to give consumers of your component more control over its state. It involves providing a reducer function as a prop, which can be used to override the component's default state management logic.

### 1. States

States are pieces of data that can be changed over time. In React, state is managed by components, and it can be updated in response to user input or other events.

### 2. Reducer

A reducer is a function that takes the current state and an action, and returns a new state. Reducers are a pure function, which means that they do not have any side effects.

### 3. Reducer Provider

The reducer provider is the component that provides the reducer function to the consumer. It is responsible for managing the state of the component, and it uses the reducer function to update the state.

### 4. Reducer Consumer

The reducer consumer is the component that consumes the reducer function. It can use the reducer function to override the default state management logic of the component.

## Example: A Toggle Component with a State Reducer

Here is an example of a `Toggle` component that uses the state reducer pattern:

```jsx
// src/components/Toggle.jsx
import React, { useReducer } from 'react';

const toggleReducer = (state, action) => {
  switch (action.type) {
    case 'toggle':
      return { on: !state.on };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

const Toggle = ({ on: controlledOn, onChange, reducer = toggleReducer }) => {
  const [{ on }, dispatch] = useReducer(reducer, { on: controlledOn });

  const handleToggle = () => {
    dispatch({ type: 'toggle' });
    onChange(!on);
  };

  return <button onClick={handleToggle}>{on ? 'On' : 'Off'}</button>;
};

export default Toggle;
```

### Usage

Here's how you would use the `Toggle` component in your application:

```jsx
// src/App.jsx
import React, { useState } from 'react';
import Toggle from './components/Toggle';

const App = () => {
  const [on, setOn] = useState(false);

  const handleToggleChange = (newOn) => {
    setOn(newOn);
  };

  const customReducer = (state, action) => {
    if (action.type === 'toggle' && on) {
      // Prevent the toggle from being turned off
      return { on: true };
    }
    return toggleReducer(state, action);
  };

  return (
    <div>
      <h1>State Reducer</h1>
      <Toggle on={on} onChange={handleToggleChange} reducer={customReducer} />
    </div>
  );
};

export default App;
```

## Note

- **Complexity:** The state reducer pattern can add some complexity to your application, so it is important to use it judiciously.
- **Control:** This pattern gives consumers of your component more control over its state, which can be useful in certain situations.
- **Flexibility:** The state reducer pattern can make your components more flexible and reusable.