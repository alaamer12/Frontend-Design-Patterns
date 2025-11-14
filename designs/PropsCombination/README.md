# Props Combination in React

## About

Props combination is a pattern in React that allows you to create more flexible and reusable components by combining related props. This pattern is particularly useful when you have a component that can be rendered in different ways depending on the props it receives.

## The Pattern

The props combination pattern involves creating a component that accepts a set of related props and then uses those props to determine how the component should be rendered. This can be done in a variety of ways, but a common approach is to use a `switch` statement or a series of `if` statements to check the props and then render the appropriate output.

### Example: A Flexible Button Component

Here is an example of a `Button` component that uses the props combination pattern to render different types of buttons:

```jsx
// src/components/Button.jsx
import React from 'react';

const Button = ({ variant, children, ...rest }) => {
  const styles = {
    primary: {
      backgroundColor: 'blue',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'gray',
      color: 'black',
    },
    danger: {
      backgroundColor: 'red',
      color: 'white',
    },
  };

  return (
    <button style={styles[variant]} {...rest}>
      {children}
    </button>
  );
};

export default Button;
```

### Usage

Here's how you would use the `Button` component in your application:

```jsx
// src/App.jsx
import React from 'react';
import Button from './components/Button';

const App = () => (
  <div>
    <h1>Props Combination</h1>
    <Button variant="primary">Primary Button</Button>
    <Button variant="secondary">Secondary Button</Button>
    <Button variant="danger">Danger Button</Button>
  </div>
);

export default App;
```

## Note

- **Flexibility:** The props combination pattern allows you to create more flexible and reusable components.
- **Readability:** This pattern can make your code more readable and easier to understand.
- **Maintainability:** This pattern can make your code more maintainable by reducing the need for multiple components that do similar things.
- **Combination with other patterns:** This pattern can be used in conjunction with other patterns, such as the compound components pattern, to create even more powerful and flexible components.