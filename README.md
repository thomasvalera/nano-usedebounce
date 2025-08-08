# nano-usedebounce

A lightweight React hook to debounce API calls and functions. Perfect for optimizing performance by reducing the frequency of expensive operations like API calls, search queries, or any function that should only execute after a period of inactivity.

## Features

- 🚀 **Lightweight** - Minimal bundle size with zero dependencies
- 🎯 **TypeScript Support** - Full TypeScript support with proper type inference
- ⚡ **Performance Optimized** - Efficient implementation using React refs
- 🔄 **Memory Safe** - Automatically cleans up timers to prevent memory leaks
- 📦 **Simple API** - Easy to use with just two parameters

## Installation

```bash
npm install nano-usedebounce
```

## Usage

### Basic Example

```tsx
import { useDebounce } from "nano-usedebounce";

function SearchComponent() {
  const debouncedSearch = useDebounce((searchTerm: string) => {
    // This will only be called after 500ms of inactivity
    // Do something with the search term
    // e.g. call an API to search your database
    console.log("debouncedSearch", searchTerm);
  }, 500);

  // Handle the input change on every key press
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSearch(e.target.value);
  }

  return <input type="text" placeholder="Search..." onChange={handleSearch} />;
}
```

### Advanced Example with API Call

```tsx
import { useState, useEffect } from "react";
import { useDebounce } from "nano-usedebounce";

const DEBOUNCE_DELAY = 300;

function UserSearch() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(async (term: string) => {
    if (!term.trim()) {
      setUsers([]);
      return;
    }

    // This API call will only be executed after 300ms of inactivity
    try {
      const response = await fetch(
        `/api/users?search=${encodeURIComponent(term)}`
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  }, DEBOUNCE_DELAY);

  // Handle the input change on every key press
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    // Set loading outside the debounce callback
    // to show it right away
    setLoading(true);
    debouncedSearch(e.target.value);
  }

  return (
    <div>
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search users..."
      />
      {loading && <div>Searching...</div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Example with Multiple Parameters

```tsx
import { useDebounce } from "nano-usedebounce";

// The delay to debounce
const DEBOUNCE_DELAY = 1000;

function FilterComponent() {
  const debouncedFilter = useDebounce(
    (category: string, price: number, inStock: boolean) => {
      // This function will only execute after 1000ms of inactivity
      console.log("Applying filters:", { category, price, inStock });
      // Apply filters to your data
    },
    DEBOUNCE_DELAY
  );

  const handleFilterChange = (
    category: string,
    price: number,
    inStock: boolean
  ) => {
    debouncedFilter(category, price, inStock);
  };

  return <div>{/* Your filter UI components */}</div>;
}
```

## API Reference

### `useDebounce<T>(callback: T, delay: number)`

Creates a debounced version of the provided callback function.

#### Parameters

- `callback` (T): The function to debounce. Can be any function with any number of parameters.
- `delay` (number): The delay in milliseconds. The callback will only execute after this delay of inactivity.

#### Returns

- `debounced`: A debounced version of the original callback function with the same signature.

#### Type Parameters

- `T`: The type of the callback function. Automatically inferred from the provided callback.

## How It Works

The hook uses React's `useRef` to store references to the callback function and timer. This ensures that:

1. **The callback reference is stable** - The debounced function maintains the same reference across re-renders
2. **Timers are properly managed** - Previous timers are cleared before setting new ones
3. **Memory leaks are prevented** - Timers are automatically cleaned up

## Common Use Cases

- **Search inputs** - Debounce API calls while users type
- **Form validation** - Debounce validation checks
- **Window resize handlers** - Debounce resize event handlers
- **Scroll event handlers** - Debounce scroll event processing
- **Filter applications** - Debounce filter operations
- **Auto-save functionality** - Debounce save operations

## Performance Benefits

- **Reduced API calls** - Prevents excessive network requests
- **Better user experience** - Eliminates UI lag from frequent function calls
- **Resource optimization** - Reduces CPU usage and memory consumption
- **Battery friendly** - Especially important for mobile applications

## License

MIT
