import { CloseIcon } from '@/components/icons';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

/**
 * @typedef ModalProps
 * @property {boolean} open
 * @property {string} [title]
 * @property {() => void} onClose
 * @property {React.ReactNode} children
 * @property {React.ReactNode} [footer]
 * @property {string} [className]
 * @property {string} [backdropClassname]
 * @property {string} [parentClassname]
 * @property {boolean} [withHeader]
 * @property {string} id must be set for handle overflow of body
 */

/**
 * @param {ModalProps} props
 */
const Modal = ({
  open,
  title = '',
  onClose = () => {},
  children = null,
  footer = null,
  className = '',
  backdropClassname = '',
  parentClassname = '',
  withHeader = true,
  id = null,
}) => {
  const modalRef = useRef(null);

  const closeHandler = () => {
    if (onClose) {
      document.body.classList.remove('modal-open');
      onClose();
    }
  };

  useEffect(() => {
    if (!id) return;
    const element = document.getElementById(id);

    if (element) {
      if (open) document.body.classList.add('modal-open');
    }

    if (!open) document.body.classList.remove('modal-open');
  }, [open, id]);

  if (typeof document == 'undefined') return null;

  return ReactDOM.createPortal(
    open ? (
      <>
        <div
          id={id}
          ref={modalRef}
          className={clsx(
            'fixed bottom-0 left-0 right-0 top-0 z-20 flex w-full items-start justify-center overflow-y-scroll',
            parentClassname
          )}
          onClick={e => {
            if (e.target.isSameNode(modalRef.current)) {
              closeHandler();
            }
          }}
        >
          <section className={clsx('my-7 w-[500px] rounded-lg bg-white shadow-lg', className)}>
            {withHeader ? (
              <header className="flex items-center justify-between border-b border-c-gray-300 p-5">
                <h3 className="font-bold">{title}</h3>
                <CloseIcon className="h-5 w-5 cursor-pointer" onClick={closeHandler} />
              </header>
            ) : null}
            <main className="p-5">{children}</main>
            {footer ? <footer className="border-t border-c-gray-300 p-5">{footer}</footer> : null}
          </section>
        </div>
        <div
          className={clsx('fixed left-0 top-0 z-10 h-full w-full bg-black/20', backdropClassname)}
          onClick={closeHandler}
        />
      </>
    ) : null,
    document.body
  );
};

export default Modal;
