# Controlled Props in React

## About

Controlled props is a pattern in React that allows a parent component to control the state of a child component. This pattern is useful when you want to create a component that can be used in both controlled and uncontrolled modes. In a controlled component, the parent component manages the state and passes it down to the child component as props. In an uncontrolled component, the child component manages its own state internally.

### 1. Controlled Component

A controlled component is a component that receives its state as props from a parent component. The child component does not have its own internal state, and it relies on the parent component to manage its state. When the state of the child component needs to be updated, it notifies the parent component, which then updates the state and passes it back down to the child component.

**Example: A controlled input component.**

```jsx
// src/components/ControlledInput.jsx
import React from 'react';

const ControlledInput = ({ value, onChange }) => (
  <input type="text" value={value} onChange={onChange} />
);

export default ControlledInput;
```

### 2. Uncontrolled Component (Parent Component)

An uncontrolled component, or parent component, is a component that manages the state of a child component. It passes the state down to the child component as props, and it also provides a way for the child component to update the state.

**Example: A parent component that uses the `ControlledInput` component.**

```jsx
// src/App.jsx
import React, { useState } from 'react';
import ControlledInput from './components/ControlledInput';

const App = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <h1>Controlled Input</h1>
      <ControlledInput value={value} onChange={handleChange} />
      <p>Current value: {value}</p>
    </div>
  );
};

export default App;
```

## Note

- **Flexibility:** The controlled props pattern allows you to create components that can be used in a variety of different ways. You can use them as controlled components, where the parent component manages the state, or as uncontrolled components, where the child component manages its own state.
- **State Management:** This pattern provides a clear separation of concerns between the parent and child components. The parent component is responsible for managing the state, while the child component is responsible for rendering the UI.
- **Reusability:** Controlled components are highly reusable, as they are not tied to any specific state management logic.
- **Variations:** There are many different variations of this pattern. For example, you can create a component that can be used in both controlled and uncontrolled modes by providing a default value for the state.