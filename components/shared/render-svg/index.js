import { useEffect, useState } from 'react';

const RenderSVG = ({ svg }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    setUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [svg]);

  return (
    <div className="w-[600px] flex flex-col justify-center text-center">
      <img src={url} />
    </div>
  );
};

export default RenderSVG;
