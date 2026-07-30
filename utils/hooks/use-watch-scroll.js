import throttle from 'lodash/throttle';
import { useEffect, useRef, useState } from 'react';

/**
 * @param {object} props
 * @param {string} props.menuElements
 * @param {string} props.defaultActive
 * @param {React.MutableRefObject<null>} props.customContainerRef
 * @returns {{active: string, containerRef: React.MutableRefObject<null>}}
 */
const useWatchScroll = ({
  menuElements = 'body',
  defaultActive = null,
  customContainerRef = null,
}) => {
  const containerRef = useRef(null);
  const [active, setActive] = useState(defaultActive);

  const scrollHandler = throttle(() => {
    const menuItems = document.querySelectorAll(menuElements);

    let prevBBox = null;
    let currentMenuId = active;

    for (let i = 0; i < menuItems.length; i++) {
      const menuItemId = menuItems[i].getAttribute('href').split('#')[1];
      const section = document.getElementById(menuItemId);

      if (!currentMenuId) {
        currentMenuId = menuItemId ?? null;
      }

      const bbox = section?.getBoundingClientRect();
      const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0;
      const offset = Math.max(200, prevHeight / 4);

      if (bbox.top - offset < 0) {
        currentMenuId = menuItemId ?? null;

        prevBBox = bbox;
        continue;
      }

      break;
    }

    setActive(currentMenuId);
  }, 200);

  useEffect(() => {
    const container = customContainerRef ? customContainerRef.current : containerRef.current;
    container.addEventListener('scroll', scrollHandler);

    scrollHandler();

    return () => {
      container.removeEventListener('scroll', scrollHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { active, containerRef };
};

export default useWatchScroll;
