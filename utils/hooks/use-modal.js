import { useCallback, useState } from 'react';

/**
 * @param {boolean} initial
 * @returns {useModalReturn}
 */
const useModal = initial => {
  const [isOpen, setIsOpen] = useState(initial);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const set = useCallback(value => setIsOpen(value), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    set,
  };
};

export default useModal;

/**
 * @typedef {Object} useModalReturn
 * @property {boolean} isOpen
 * @property {() => void} open
 * @property {() => void} close
 * @property {() => void} toggle
 * @property {(value: boolean) => void} set
 */
