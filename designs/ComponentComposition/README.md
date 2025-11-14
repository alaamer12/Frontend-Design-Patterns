
# Component Composition in React

## About

Component composition is a fundamental concept in React that allows you to build complex user interfaces by combining smaller, reusable components. This pattern emphasizes a clear separation of concerns, typically by dividing components into two main categories: container components and presentational components.

### 1. Container Components

Container components are responsible for the logic and state management of your application. They handle tasks such as fetching data from an API, managing state, and passing data and behavior down to their children. These components are often class-based components or functional components that use hooks (e.g., `useState`, `useEffect`, `useContext`).

**Key characteristics of container components:**

- **Concerned with how things work.**
- **Manage state and logic.**
- **Fetch and pass down data.**
- **Often render presentational components.**

**Example: A container component that fetches and manages a list of users.**

```jsx
// src/components/containers/UserListContainer.jsx
import React, { useState, useEffect } from 'react';
import UserList from '../presentational/UserList';

const UserListContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <UserList users={users} />;
};

export default UserListContainer;
```

### 2. Presentational Components

Presentational components are responsible for the look and feel of your application. They receive data and behavior as props from their parent components and are primarily concerned with rendering UI elements. These components are often functional components and are typically stateless.

**Key characteristics of presentational components:**

- **Concerned with how things look.**
- **Receive data and behavior via props.**
- **Are often stateless and functional.**
- **Can be easily reused throughout the application.**

**Example: A presentational component that renders a list of users.**

```jsx
// src/components/presentational/UserList.jsx
import React from 'react';

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
);

export default UserList;
```

## Note

- **Separation of Concerns**: The primary benefit of this pattern is the clear separation between logic and presentation. This makes your code easier to understand, test, and maintain.
- **Reusability**: Presentational components can be easily reused with different data sources, as they are not tied to any specific logic.
- **Flexibility**: This pattern allows you to easily swap out the UI of a component without affecting the underlying logic, and vice versa.
- **Modern React**: With the introduction of hooks, the distinction between container and presentational components has become less rigid. However, the underlying principle of separating concerns remains a valuable best practice.
