# Render Props in React

## About

The render props pattern is a way to share code and logic between components. It involves passing a function as a prop to a component, and then calling that function to render the component's output. This allows you to create components that are highly reusable and flexible.

### 1. Provider Component

The provider component is a component that provides data or props to be rendered later. It is similar to a container component in that it encapsulates the logic of the component.

**Example: A mouse provider component.**

```jsx
// src/components/MouseProvider.jsx
import React, { useState } from 'react';

const MouseProvider = ({ render }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
};

export default MouseProvider;
```

### 2. Render Props Component

The render props component is a component that is used in the provider component. It uses the props that are passed to it to render its output. It is similar to a presentational component in that it is responsible for displaying data to the user.

**Example: A component that displays the mouse position.**

```jsx
// src/components/MousePosition.jsx
import React from 'react';

const MousePosition = ({ x, y }) => (
  <p>The mouse position is ({x}, {y})</p>
);

export default MousePosition;
```

### Usage

Here's how you would use the `MouseProvider` and `MousePosition` components in your application:

```jsx
// src/App.jsx
import React from 'react';
import MouseProvider from './components/MouseProvider';
import MousePosition from './components/MousePosition';

const App = () => (
  <div>
    <h1>Render Props</h1>
    <MouseProvider
      render={(position) => <MousePosition {...position} />}
    />
  </div>
);

export default App;
```

## Note

- **Flexibility:** The render props pattern is a very flexible pattern that can be used to create a wide variety of components.
- **Reusability:** The render props pattern can help you to create reusable components that can be used in different contexts.
- **Separation of Concerns:** The render props pattern can help you to separate the concerns of your application by allowing you to keep your data and logic in one place.
- **Alternatives:** With the introduction of hooks, the render props pattern is not as common as it used to be. However, it is still a useful pattern to know, and it can be a good choice for certain use cases.