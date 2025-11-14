
# Higher-Order Components in React

## About

Higher-order components (HOCs) are a pattern in React that allows you to reuse component logic. HOCs are not a part of the React API, but are a pattern that emerges from React's compositional nature. A higher-order component is a function that takes a component and returns a new component.

### 1. Normal Component

A normal component is just a regular React component. It can be a class component or a functional component.

**Example: A simple component that displays a message.**

```jsx
// src/components/Message.jsx
import React from 'react';

const Message = ({ message }) => (
  <div>{message}</div>
);

export default Message;
```

### 2. Higher-Order Component

A higher-order component is a function that takes a component as an argument and returns a new component. The new component can add new props to the original component, or it can wrap the original component in other components.

**Example: A higher-order component that adds a loading spinner to a component.**

```jsx
// src/hocs/withLoading.jsx
import React, { useState, useEffect } from 'react';

const withLoading = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulate a network request
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoading;
```

### Usage

Here's how you would use the `withLoading` HOC to add a loading spinner to the `Message` component:

```jsx
// src/App.jsx
import React from 'react';
import Message from './components/Message';
import withLoading from './hocs/withLoading';

const MessageWithLoading = withLoading(Message);

const App = () => (
  <div>
    <h1>Higher-Order Component</h1>
    <MessageWithLoading message="Hello, World!" />
  </div>
);

export default App;
```

## Note

- **Reusability:** HOCs allow you to reuse component logic, which can help to reduce code duplication and make your code more maintainable.
- **Separation of Concerns:** HOCs can help to separate the logic of your components from the presentation, which can make your code easier to reason about.
- **Composition:** HOCs can be composed together to create more complex logic.
- **Alternatives:** With the introduction of hooks, HOCs are not as common as they used to be. However, they are still a useful pattern to know, and they can be a good choice for certain use cases.
