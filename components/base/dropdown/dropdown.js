import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';

const Dropdown = ({ button, className, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover.Root open={isOpen}>
      <Popover.Trigger asChild>{button({ open: isOpen, setOpen: setIsOpen })}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={className} sideOffset={7}>
          {typeof children === 'function'
            ? children({ open: isOpen, setOpen: setIsOpen })
            : children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Dropdown;
