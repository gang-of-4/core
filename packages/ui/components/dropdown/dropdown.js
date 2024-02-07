import { useCallback, useRef, useState } from 'react';
import { DropdownContext } from './dropdown-context';

export function Dropdown(props) {
  const { children, delay = 50 } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const cleanupRef = useRef(null);

  const handleTriggerEnter = useCallback((event) => {
    clearTimeout(cleanupRef.current);
    setAnchorEl(event.currentTarget);
  }, []);

  const handleTriggerLeave = useCallback((_) => {
    cleanupRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, delay);
  }, [delay]);

  const handleMenuEnter = useCallback((_) => {
    clearTimeout(cleanupRef.current);
  }, []);

  const handleMenuLeave = useCallback((_) => {
    cleanupRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, delay);
  }, [delay]);

  const open = Boolean(anchorEl);

  return (
    <DropdownContext.Provider
      value={{
        anchorEl,
        onMenuEnter: handleMenuEnter,
        onMenuLeave: handleMenuLeave,
        onTriggerEnter: handleTriggerEnter,
        onTriggerLeave: handleTriggerLeave,
        open
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
}