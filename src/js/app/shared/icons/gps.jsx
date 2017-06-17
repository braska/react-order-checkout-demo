import React from 'react';
import Icon from 'react-icon-base';

const GpsIcon = (props) => {
  const properties = { ...props };
  delete properties.blink;
  return (
    <Icon viewBox="0 0 40 40" {...properties}>
      <g><path d="m20 31.6q4.8 0 8.2-3.4t3.4-8.2-3.4-8.2-8.2-3.4-8.2 3.4-3.4 8.2 3.4 8.2 8.2 3.4z m14.9-13.2h3.5v3.2h-3.5q-0.5 5.3-4.3 9t-9 4.3v3.5h-3.2v-3.5q-5.3-0.5-9-4.3t-4.3-9h-3.5v-3.2h3.5q0.5-5.3 4.3-9t9-4.3v-3.5h3.2v3.5q5.3 0.5 9 4.3t4.3 9z" /></g>
    </Icon>
  );
};

export default GpsIcon;