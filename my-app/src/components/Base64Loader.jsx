import React, { useState, useEffect } from 'react';

const Base64Loader = ({ imageBase64 }) => {
      console.log("data in the loader",imageBase64)

  //   const [imageBase64, setImageBase64] = useState(null);

  return (
      <>
      {imageBase64 ? <img src={`data:image/png;base64,${imageBase64}`} alt="Fetched from backend" className='image-of-data-visualisation'/> : <p>Loading image...</p>}
      </>
//     <div className='each-image'>
      
  );
};

export default Base64Loader;
