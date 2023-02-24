import React, { useState } from 'react';
interface Props {
  width: string;
  height?: string;
}
const EmoticonPic: React.FC<Props> = (props) => {
  const { width = '200px', height = 'auto' } = props;
  const [picIndex] = useState(Math.floor(Math.random() * 10) + 1);

  return (
    <img
      src={`./mofish/img_mofish_${picIndex}.jpg`}
      style={{ width: width, height: height }}
    />
  );
};

export default EmoticonPic;
