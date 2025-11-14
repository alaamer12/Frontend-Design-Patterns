# Strategy Pattern in React

## Overview

Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets the algorithm vary independently from clients that use it.

## Why Use Strategy Pattern?

- **Flexibility**: Switch algorithms at runtime
- **Encapsulation**: Each strategy is self-contained
- **Open/Closed**: Easy to add new strategies
- **Testability**: Test strategies independently
- **Clean Code**: Avoid conditional logic

## Basic Pattern

```jsx
const strategies = {
  creditCard: (amount) => `Processing $${amount} via Credit Card`,
  paypal: (amount) => `Processing $${amount} via PayPal`,
  crypto: (amount) => `Processing $${amount} via Cryptocurrency`
};

function PaymentProcessor({ strategy, amount }) {
  const process = strategies[strategy];
  return <div>{process(amount)}</div>;
}
```

## When to Use

✅ Multiple algorithms for same task
✅ Runtime algorithm selection
✅ Avoid complex conditionals
✅ Encapsulate varying behavior

❌ Few algorithms
❌ Algorithms rarely change
❌ Simple conditional logic

## Summary

Strategy pattern enables flexible algorithm selection at runtime, promoting clean, maintainable code by encapsulating varying behaviors.
