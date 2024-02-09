import { cloneElement, useContext } from 'react';
import { DropdownContext } from './dropdown-context';

export function DropdownTrigger(props) {
  const { children } = props;
  const { onTriggerEnter, onTriggerLeave } = useContext(DropdownContext);

  return cloneElement(children, {
    onMouseEnter: (event) => {
      children.props.onMouseEnter?.(event);
      onTriggerEnter(event);
    },
    onMouseLeave: (event) => {
      children.props.onMouseLeave?.(event);
      onTriggerLeave(event);
    }
  });
}