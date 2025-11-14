# Flux Pattern in React

## Overview

Flux is an application architecture for building user interfaces with unidirectional data flow. It emphasizes a clear separation between data and view layers.

## Basic Pattern

```jsx
// Store
const store = {
  state: { count: 0 },
  listeners: [],
  getState: () => store.state,
  dispatch: (action) => {
    if (action.type === 'INCREMENT') store.state.count++;
    store.listeners.forEach(listener => listener());
  },
  subscribe: (listener) => store.listeners.push(listener)
};
```

## When to Use

✅ Complex state management
✅ Multiple data sources
✅ Predictable state updates
✅ Large applications

## Summary

Flux provides unidirectional data flow, making state management predictable and easier to debug in complex applications.
