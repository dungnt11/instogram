import * as React from 'react';
import ImagePicker from './ImagePicker';
import Camera from './Camera';

const CameraScreen = (props) => {
  return (
    <>
      <Camera />
      <ImagePicker {...props} />
    </>
  )
}

export default CameraScreen;
