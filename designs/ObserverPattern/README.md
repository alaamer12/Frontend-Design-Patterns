# Observer Pattern in React

## Overview

The Observer pattern defines a one-to-many dependency between objects where when one object changes state, all its dependents are notified automatically. This enables event-driven architecture and loose coupling.

## Why Use Observer Pattern?

- **Loose Coupling**: Publishers don't know about observers
- **Scalability**: Easy to add/remove observers
- **Event-Driven**: Reactive updates
- **Flexibility**: Multiple observers per event
- **Maintainability**: Clear separation

## Basic Pattern

```jsx
class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return () => this.unsubscribe(event, callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(cb => cb(data));
    }
  }

  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}
```

## When to Use

✅ Event-driven architecture
✅ Real-time updates
✅ Notification systems
✅ State synchronization
✅ Pub/sub messaging

❌ Simple parent-child communication
❌ Direct component interaction
❌ Synchronous operations

## Summary

Observer pattern enables loose coupling through event-driven communication, perfect for building scalable, reactive applications where multiple components need to respond to state changes.
