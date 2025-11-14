# Portal Pattern in React

## Overview

Portals provide a way to render children into a DOM node that exists outside the parent component's DOM hierarchy. This is essential for modals, tooltips, dropdowns, and other overlay components that need to escape parent constraints.

## Why Use Portals?

- **Escape Constraints**: Break out of parent overflow and z-index
- **Event Bubbling**: Events still bubble through React tree
- **Accessibility**: Maintain proper focus management
- **Clean DOM**: Render overlays at document root
- **Positioning**: Easier absolute positioning

## Basic Pattern

```jsx
import { createPortal } from 'react-dom';

function Modal({ isOpen, children }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.body
  );
}
```

## When to Use

✅ Modals and dialogs
✅ Tooltips
✅ Dropdown menus
✅ Toast notifications
✅ Context menus
✅ Popovers

❌ Regular content
❌ Simple components
❌ No positioning issues

## Summary

Portals are essential for rendering components that need to escape parent DOM constraints while maintaining React's event system and component hierarchy.
