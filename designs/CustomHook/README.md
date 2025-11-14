
# Custom Hooks in React

## About

Custom hooks are a powerful feature in React that allow you to extract and reuse stateful logic from your components. They are a way to share logic between components without having to use higher-order components or render props. Custom hooks are just regular JavaScript functions that start with the word `use` and can call other hooks.

## Creating a Custom Hook

To create a custom hook, you simply create a function that starts with the word `use` and calls other hooks. For example, you could create a custom hook that fetches data from an API and returns the data, loading state, and error state.

**Example: A custom hook that fetches data from an API.**

```jsx
// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
```

## Using a Custom Hook

To use a custom hook, you simply call it from your component just like you would any other hook.

**Example: A component that uses the `useFetch` hook.**

```jsx
// src/App.jsx
import React from 'react';
import useFetch from './hooks/useFetch';

const App = () => {
  const { data, loading, error } = useFetch('https://api.example.com/users');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

## Note

- **Reusability:** Custom hooks allow you to reuse stateful logic between components, which can help to reduce code duplication and make your code more maintainable.
- **Separation of Concerns:** Custom hooks can help to separate the logic of your components from the presentation, which can make your code easier to reason about.
- **Composability:** Custom hooks can be composed together to create more complex logic.
- **Not a Strict Design Pattern:** While custom hooks are not a design pattern in the strictest sense, they are a powerful tool that can help you to write better React code.
