import React from 'react';
import PropTypes from 'prop-types';
import Container from 'components/Container';
import Topbar from '../Topbar';

const MainLayout = props => (
  <div>
    <Topbar />
    <Container>
      {props.children}
    </Container>
  </div>
);

MainLayout.propTypes = {
  children: React.PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(React.PropTypes.element),
  ]),
};

MainLayout.defaultProps = {
  children: null,
};

export default MainLayout;
