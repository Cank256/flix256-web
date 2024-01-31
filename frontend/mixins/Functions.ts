/**
 * Debounce
 */
export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): T => {
  let timeoutID: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutID!);

    timeoutID = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  } as T; // Use "as T" to assert the function type
};

/**
 * Check if localStorage is supported
 */
export const supportsLocalStorage = (): boolean => {
  let supports = true;

  try {
    const testKey = '__vue-localStorage-check';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
  } catch (error) {
    supports = false;
  }

  return supports;
};
