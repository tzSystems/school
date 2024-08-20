

// ImageViewerComponent.js
import React from 'react';

const ImageViewerComponent = ({ url }) => {
  return (
    <img src={url} alt="attachment" style={{ maxWidth: '100%', borderRadius: '5px' }} />
  );
};

export default ImageViewerComponent;
