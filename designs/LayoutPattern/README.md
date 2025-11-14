# Layout Pattern in React

## Overview

Layout pattern provides reusable layout components that define the structure of pages, promoting consistency and reducing duplication.

## Basic Pattern

```jsx
function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

## When to Use

✅ Consistent page structure
✅ Shared headers/footers
✅ Multiple page layouts
✅ Responsive designs

## Summary

Layout pattern provides reusable page structures, ensuring consistency and reducing code duplication across your application.
