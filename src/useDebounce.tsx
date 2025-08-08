import { useRef } from "react";

/**
 * Debounce a callback function to execute only after a delay of inactivity.
 * @param callback - The callback to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced callback
 * @example
 * const debouncedSearch = useDebounce((searchTerm: string) => {
 *   // This will only be called after 500ms of inactivity
 *   // Do something with the search term
 *   // e.g. call an API to search your database
 *   console.log("debouncedSearch", searchTerm);
 * }, 500);
 *
 * // Handle the input change on every key press
 * function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
 *   debouncedSearch(e.target.value);
 * }
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  // Store a reference to the callback and timer
  // for the lifetime of the component
  const callbackRef = useRef(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Create the debounced callback
  const debounced = (...args: Parameters<T>) => {
    // Cancel the previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer
    timerRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  };

  return debounced;
}
