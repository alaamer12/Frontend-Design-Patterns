# State Reducer Pattern in React

## Overview

The State Reducer pattern uses `useReducer` to manage complex state logic in a predictable way. It's especially useful for components with multiple state transitions and complex update logic.

## Why Use State Reducer?

- **Predictable**: State updates follow clear patterns
- **Centralized**: All state logic in one place
- **Testable**: Easy to test reducer functions
- **Debuggable**: Clear action history
- **Scalable**: Better for complex state

## Basic Pattern

```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return initialState;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

## When to Use

✅ Complex state logic
✅ Multiple state transitions
✅ State depends on previous state
✅ Need for time-travel debugging
✅ Testing state logic

❌ Simple state (use useState)
❌ Single value state
❌ No complex transitions

## vs useState

**Use useReducer when:**
- Multiple related state values
- Complex state transitions
- Next state depends on previous
- Need to test state logic

**Use useState when:**
- Simple, independent state
- Single value
- No complex logic

## Summary

State Reducer pattern provides predictable, testable state management for complex scenarios. Use `useReducer` when state logic becomes too complex for `useState`.
