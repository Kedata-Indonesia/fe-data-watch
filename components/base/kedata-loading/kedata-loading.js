import clsx from 'clsx';
import { omit } from 'lodash/fp';

/**
 * @param {import('react').SVGProps<SVGSVGElement>} props
 * @returns {JSX.Element}
 */
const KedataLoading = props => {
  return (
    <svg
      viewBox="0 0 138 118"
      className={clsx('kedata-loading', props?.className)}
      {...omit(['className'], props)}
    >
      <g className="opacity">
        <path
          className="stepOne"
          d="M45.2833 59H26.893L26.6097 58.5L48.4263 20L66.75 20L57.75 36L45 58.5L45.2833 59Z"
        />
        <path className="stepFour" d="M26.893 59L48.4263 97H66.75L57.75 81L45.2833 59H26.893Z" />
        <path
          className="stepThree"
          d="M103.412 118L137.714 59L103.412 4.48973e-06L35.0012 0L35 0.00203428L44.1988 16V16.0132L44.2065 16L94.2065 16L119.207 59L94.2065 102L44.2065 102L44.1988 101.987V102L35 117.998L35.0012 118L103.412 118Z"
        />
        <path
          className="stepTwo"
          d="M19.2377 59L44.2377 16L44.2389 16L35.0389 4.48973e-06L35.0323 0L0.730011 59L19.2377 59Z"
        />
        <path
          className="stepFive"
          d="M35.0389 118L35.0323 118L0.730011 59H19.2377L44.2377 102H44.2389L35.0389 118Z"
        />
      </g>
      <path
        className="loading--stepOne"
        d="M45.2833 59H26.893L26.6097 58.5L48.4263 20L66.75 20L57.75 36L45 58.5L45.2833 59Z"
      />
      <path
        className="loading--stepFour"
        d="M26.893 59L48.4263 97H66.75L57.75 81L45.2833 59H26.893Z"
      />
      <path
        className="loading--stepThree"
        d="M103.412 118L137.714 59L103.412 4.48973e-06L35.0012 0L35 0.00203428L44.1988 16V16.0132L44.2065 16L94.2065 16L119.207 59L94.2065 102L44.2065 102L44.1988 101.987V102L35 117.998L35.0012 118L103.412 118Z"
      />
      <path
        className="loading--stepTwo"
        d="M19.2377 59L44.2377 16L44.2389 16L35.0389 4.48973e-06L35.0323 0L0.730011 59L19.2377 59Z"
      />
      <path
        className="loading--stepFive"
        d="M35.0389 118L35.0323 118L0.730011 59H19.2377L44.2377 102H44.2389L35.0389 118Z"
      />
    </svg>
  );
};

export default KedataLoading;
