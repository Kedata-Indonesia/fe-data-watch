import { forwardRef } from 'react';

/**
 * @param {ExplorationSectionProps} props
 */
const ExplorationSection = ({ id, title, renderTitle, children }) => {
  return (
    <div id={id} className="p-6 text-gray-600">
      {renderTitle ?? <h1 className="text-heading-3 font-bold">{title}</h1>}
      {children}
    </div>
  );
};

export default ExplorationSection;

/**
 * @typedef ExplorationSectionProps
 * @property {string} id
 * @property {string} title
 * @property {React.ReactNode} renderTitle
 * @property {React.ReactNode} children
 */
