import { useRef, useEffect } from 'react';

// Store components state to use as a 'previous' state when it changes
export default function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }