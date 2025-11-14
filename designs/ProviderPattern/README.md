# Provider Pattern in React

## About

The provider pattern is a way to share data and functionality between components without having to pass props down through the component tree. This is done by creating a `Provider` component that holds the data and functionality, and then wrapping the components that need access to that data and functionality in the `Provider` component.

### 1. Provider Component

The provider component is a component that holds the data and functionality that you want to share. It uses the React Context API to make the data and functionality available to all of its children.

**Example: A theme provider component.**

```jsx
// src/components/ThemeProvider.jsx
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
```

### 2. Consumer Components

Consumer components are the components that need access to the data and functionality that is provided by the `Provider` component. They can access the data and functionality by using the `useContext` hook.

**Example: A component that consumes the theme context.**

```jsx
// src/components/ThemedButton.jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#000',
        color: theme === 'light' ? '#000' : '#fff',
      }}
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
};

export default ThemedButton;
```

### Usage

Here's how you would use the `ThemeProvider` and `ThemedButton` components in your application:

```jsx
// src/App.jsx
import React from 'react';
import ThemeProvider from './components/ThemeProvider';
import ThemedButton from './components/ThemedButton';

const App = () => (
  <ThemeProvider>
    <div>
      <h1>Provider Pattern</h1>
      <ThemedButton />
    </div>
  </ThemeProvider>
);

export default App;
```

## Note

- **Global State:** The provider pattern is a great way to manage global state in your application.
- **Separation of Concerns:** This pattern can help to separate the concerns of your application by allowing you to keep your data and functionality in one place.
- **Reusability:** The provider pattern can make your components more reusable by allowing them to be used in different contexts.
- **Not a Strict Design Pattern:** The provider pattern is not a strict design pattern, but it is a common pattern that is used in many React applications.