import React from 'react';
import Icon from 'react-icon-base';
import { primaryLight, accent, primary } from 'constants/colors';

const CodeIcon = props => (
  <Icon viewBox="0 0 40 40" {...props}>
    <g><path fill="url(#linear)" d="m12.8 30.4l-1 1.1q-0.2 0.2-0.5 0.2t-0.5-0.2l-9.7-9.7q-0.2-0.2-0.2-0.5t0.2-0.4l9.7-9.7q0.2-0.2 0.5-0.2t0.5 0.2l1 1q0.2 0.2 0.2 0.5t-0.2 0.5l-8.1 8.1 8.1 8.2q0.2 0.2 0.2 0.5t-0.2 0.4z m12.3-22.1l-7.8 26.8q0 0.3-0.3 0.4t-0.5 0.1l-1.3-0.4q-0.2-0.1-0.4-0.3t0-0.5l7.7-26.8q0.1-0.3 0.4-0.4t0.4-0.1l1.3 0.4q0.3 0 0.4 0.3t0.1 0.5z m13.6 13.5l-9.7 9.7q-0.2 0.2-0.4 0.2t-0.5-0.2l-1-1.1q-0.3-0.2-0.3-0.4t0.3-0.5l8.1-8.2-8.1-8.1q-0.3-0.2-0.3-0.5t0.3-0.5l1-1q0.2-0.2 0.5-0.2t0.4 0.2l9.7 9.7q0.2 0.2 0.2 0.4t-0.2 0.5z" /></g>
    <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor={primaryLight} />
      <stop offset="50%" stopColor={accent} />
      <stop offset="100%" stopColor={primary} />
    </linearGradient>
  </Icon>
);

export default CodeIcon;
