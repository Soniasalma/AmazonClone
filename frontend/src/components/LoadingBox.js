import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const LoadingBox = (props) => {
  return (
    <div className="flex justify-center">
      <RotatingLines
        visible={true}
        width="50"
        color={props.color}
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoadingBox;
