import clsx from 'clsx';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import ReactDOM from 'react-dom';
import { RefObject } from 'react';
import { flip, offset, useFloating, Placement } from '@floating-ui/react-dom';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';

/**
 * @typedef DropdownTooltipProps
 * @property {string} [message]
 * @property {"top" | "right" | "bottom" | "left"} [position]
 * @property {string} [width]
 */

/**
 * @typedef DropdownMenuRenderProps
 * @property {boolean} isOpen
 * @property {RefObject<HTMLElement>} containerRef
 * @property {() => void} open
 */

/**
 * @typedef DropdownMenuOption
 * @property {string} value
 * @property {string} label
 * @property {string} [className] classname for child item. see example: https://imgur.com/a/bUIqICP (on line 86)
 * @property {string} [childMenuClassName] classname for child menu (dropdown box). see example: https://imgur.com/a/bUIqICP (on line 58)
 * @property {React.ReactNode} [icon]
 * @property {DropdownMenuOption[]} [options]
 * @property {DropdownTooltipProps} [tooltip]
 */

/**
 * @typedef DropdownMenuProps
 * @property {React.ReactNode} children
 * @property {DropdownMenuOption[]} options
 * @property {string} [className]
 * @property {string} [firstMenuClassName]
 * @property {string} [id]
 * @property {object} [rowData]
 * @property {Placement} [placement]
 * @property {Function} [onChange]
 * @property {number} [menuHeight]
 * @property {string|number} [menuWidth]
 * @property {string|number} [menuChildWidth]
 * @property {string} [tooltipBackground] Apply `backgroundColor` of tooltip for parent and child menu
 * @property {"left"|"right"} [nestedPosition]
 * @property {HTMLElement} [renderElement]
 * @property {(props: DropdownMenuRenderProps) => void} [renderChild]
 */

/**
 * @typedef DropdownMenuItemProps
 * @property {typeof React.Children} children
 * @property {() => void} [onMouseEnter]
 * @property {() => void} [onMouseLeave]
 * @property {() => void} [onClick]
 * @property {string} [className]
 * @property {string} id
 * @property {DropdownMenuOption} option
 */

/**
 * @typedef DropdownMenuChildProps
 * @property {DropdownMenuOption} option
 * @property {DropdownMenuOption} active
 * @property {() => void} [onMouseEnter]
 * @property {() => void} [onMouseLeave]
 * @property {string} [menuChildWidth]
 * @property {(option: DropdownMenuOption) => void} [onItemClick]
 * @property {string} id
 */

/**
 * @typedef DropdownMenuListProps
 * @property {string} [menuChildWidth]
 * @property {React.CSSProperties} [style]
 * @property {DropdownMenuOption[]} options
 * @property {() => void} [onMouseEnter]
 * @property {() => void} [onMouseLeave]
 * @property {(option: DropdownMenuOption) => void} [onItemClick]
 * @property {string} [className]
 * @property {string} id
 */

const menuClassName = 'rounded-md bg-white border border-c-gray-300 py-1 shadow-lg absolute z-50';

const itemClassName =
  'px-5 py-3 cursor-pointer flex items-center hover:bg-c-red-50 hover:!text-c-red-600';

/**
 * @type {React.FunctionComponent<DropdownMenuItemProps>}
 *
 * @description The single item for dropdown
 */
const Item = forwardRef(
  (
    { children = null, onMouseEnter, onMouseLeave, className, onClick, option = {}, id = '' },
    ref
  ) => {
    const hasOptions = !!option.options?.length;
    const Icon = option.icon;
    const tooltip = option.tooltip;
    const tooltipId = `dropdown-tooltip__${id}__${option.value}`;

    return (
      <div
        ref={ref}
        className={clsx(itemClassName, className, option.className)}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-for={tooltip ? tooltipId : null}
        data-tip={tooltip?.message}
      >
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {children}
        {hasOptions && <ChevronRightIcon className="ml-auto h-4 w-4" />}
        {tooltip && (
          <ReactTooltip
            effect="solid"
            id={tooltipId}
            place={tooltip?.position ?? 'top'}
            overridePosition={({ top, left }, _currentEvent, _currentTarget, node) => {
              tooltip?.width && (node.style.width = tooltip?.width);
              node.style.textAlign = 'center';
              return {
                top,
                left,
              };
            }}
          />
        )}
      </div>
    );
  }
);
Item.displayName = 'Item';

/**
 * @type {React.FunctionComponent<DropdownMenuChildProps>}
 *
 * @description Wrap Item and List for nested dropdown
 */
const Child = ({
  option = {},
  onItemClick,
  active,
  onMouseEnter,
  onMouseLeave,
  id = '',
  menuChildWidth,
}) => {
  const hasOption = option.options;
  const [fontSize, setFontSize] = useState(null);
  const {
    refs: { setReference: reference, setFloating: floating },
    x,
    y,
    strategy,
  } = useFloating({
    placement: 'right-start',
    middleware: [flip(), offset({ crossAxis: -fontSize * 0.25 - 1 })],
  });

  useEffect(() => {
    const text = window.getComputedStyle(document.body, null).getPropertyValue('font-size');

    setFontSize(parseInt(text));
  }, []);

  return (
    <>
      <Item
        id={id}
        ref={reference}
        onMouseEnter={() => onMouseEnter(option)}
        onMouseLeave={() => onMouseLeave(option)}
        className={clsx(active && hasOption && 'bg-c-red-50 !text-c-red-600')}
        onClick={() => onItemClick(option)}
        option={option}
      >
        {option.label}
      </Item>
      {hasOption && active && (
        <List
          id={id}
          options={option.options}
          ref={floating}
          onItemClick={onItemClick}
          onMouseEnter={() => onMouseEnter(option)}
          onMouseLeave={() => onMouseLeave(option)}
          className={option?.childMenuClassName || ''}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: menuChildWidth,
          }}
        />
      )}
    </>
  );
};

/**
 * @type {React.FunctionComponent<DropdownMenuListProps>}
 *
 * @description List of Child
 */
const List = forwardRef(
  (
    {
      style = {},
      options = [],
      onItemClick = () => {},
      onMouseEnter,
      onMouseLeave,
      className = '',
      id,
      menuChildWidth,
    },
    ref
  ) => {
    const [active, setActive] = useState(null);

    return (
      <div
        ref={ref}
        style={style}
        className={clsx(menuClassName, className)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {options.map(option => {
          return (
            <Child
              key={option.value}
              active={active?.value === option.value}
              option={option}
              menuChildWidth={menuChildWidth}
              id={id}
              onMouseEnter={option => {
                setActive(option);
              }}
              onMouseLeave={() => {
                setActive(null);
              }}
              onItemClick={option => {
                if (!option.options?.length) {
                  onItemClick(option);
                }
              }}
            />
          );
        })}
      </div>
    );
  }
);
List.displayName = 'List';

/**
 * @param {DropdownMenuProps} props
 *
 * @description
 * Cara handle click di luar component https://stackoverflow.com/a/45323523/9905881
 */
const DropdownMenu = ({
  children,
  options = [],
  className = '',
  firstMenuClassName = '',
  rowData = null,
  onChange = () => {},
  id = '',
  menuWidth = '200px',
  menuChildWidth = menuWidth,
  renderChild = () => {},
  renderElement = null,
  placement = 'bottom-end',
}) => {
  const [isShow, setIsShow] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const [fontSize, setFontSize] = useState(null);
  useEffect(() => {
    const text = window.getComputedStyle(document.body, null).getPropertyValue('font-size');

    setFontSize(parseInt(text));
  }, []);

  const {
    refs: { setReference: reference, setFloating: floating },
    x,
    y,
    strategy,
  } = useFloating({
    placement,
    middleware: [flip(), offset(fontSize * 0.3)],
  });

  const toggle = useCallback(() => {
    setIsShow(state => !state);
  }, []);

  const documentClickHandler = useCallback(
    e => {
      if (renderElement && !renderElement?.contains(e.target)) {
        setIsShow(false);
        return;
      }

      if (menuRef.current && !menuRef.current.contains(e.target) && !renderElement) {
        setIsShow(false);
        return;
      }
    },
    [renderElement]
  );

  useEffect(() => {
    document.addEventListener('mousedown', documentClickHandler, true);
    return () => {
      document.removeEventListener('mousedown', documentClickHandler, true);
    };
  }, [documentClickHandler]);

  return (
    <section
      ref={el => {
        menuRef.current = el;
        reference(el);
      }}
      className={clsx(className, 'relative')}
      id={id}
      onClick={children ? toggle : null}
    >
      {children ? children : renderChild({ isOpen: isShow, open: toggle, containerRef: menuRef })}
      {isShow && (
        <>
          {renderElement ? (
            <>
              {ReactDOM.createPortal(
                <List
                  id={id}
                  ref={el => {
                    dropdownRef.current = el;
                    floating(el);
                  }}
                  options={options}
                  onItemClick={data => {
                    toggle();
                    onChange({
                      ...data,
                      data: rowData,
                    });
                  }}
                  className={firstMenuClassName}
                  menuChildWidth={menuChildWidth}
                  style={{
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                    width: menuWidth,
                  }}
                />,
                renderElement
              )}
            </>
          ) : (
            <List
              id={id}
              menuChildWidth={menuChildWidth}
              ref={el => {
                dropdownRef.current = el;
                floating(el);
              }}
              className={firstMenuClassName}
              options={options}
              onItemClick={data => {
                onChange({
                  ...data,
                  data: rowData,
                });
              }}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: menuChildWidth,
              }}
            />
          )}
        </>
      )}
    </section>
  );
};

export default DropdownMenu;
