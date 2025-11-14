# Singleton Pattern in React

## Overview

Singleton ensures a class has only one instance and provides a global point of access to it. Useful for configuration, caching, and shared resources.

## Basic Pattern

```jsx
class Singleton {
  static instance = null;

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
```

## When to Use

✅ Configuration management
✅ Caching
✅ Logging
✅ Database connections
✅ Shared resources

❌ When you need multiple instances
❌ Testing (hard to mock)
❌ Concurrent access issues

## Summary

Singleton provides controlled access to a single instance, perfect for managing shared resources and global state.
