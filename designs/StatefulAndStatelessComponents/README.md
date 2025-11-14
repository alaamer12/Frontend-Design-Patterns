
# Stateful and Stateless Components in React

## About

The stateful and stateless component pattern is a fundamental concept in React. It involves dividing your components into two categories: stateful components, which manage state, and stateless components, which do not.

### 1. Stateful Component

A stateful component is a component that has its own state or manages the state of other components. Stateful components are typically class components, but they can also be functional components that use the `useState` hook.

**Example: A stateful counter component.**

```jsx
// src/components/Counter.jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
```

### 2. Stateless Component

A stateless component is a component that does not have its own state. Stateless components are typically functional components, and they are used to render data that is passed to them as props.

**Example: A stateless display component.**

```jsx
// src/components/Display.jsx
import React from 'react';

const Display = ({ message }) => (
  <h1>{message}</h1>
);

export default Display;
```

### Usage

Here's how you would use the `Counter` and `Display` components in your application:

```jsx
// src/App.jsx
import React from 'react';
import Counter from './components/Counter';
import Display from './components/Display';

const App = () => (
  <div>
    <Display message="Stateful and Stateless Components" />
    <Counter />
  </div>
);

export default App;
```

## Note

- **Separation of Concerns:** The stateful and stateless component pattern can help you to separate the concerns of your application by allowing you to keep your state management logic in one place.
- **Reusability:** Stateless components are highly reusable, as they are not tied to any specific state management logic.
- **Readability:** This pattern can make your code more readable and easier to understand.
- **Atomicity:** Stateless components are often the basic building blocks of your application, similar to atoms in atomic design.
