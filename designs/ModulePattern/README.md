# Module Pattern in React

## Overview

Module pattern encapsulates private and public members, providing a clean way to organize code and prevent global namespace pollution.

## Basic Pattern

```jsx
const UserModule = (() => {
  let privateData = [];
  
  return {
    addUser: (user) => privateData.push(user),
    getUsers: () => [...privateData],
    clearUsers: () => privateData = []
  };
})();
```

## When to Use

✅ Encapsulation
✅ Private state
✅ Namespace management
✅ Utility modules

## Summary

Module pattern provides encapsulation and namespace management, keeping private data hidden while exposing public API.
