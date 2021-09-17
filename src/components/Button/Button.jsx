import React from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import { LoadMoreButton } from './Button.styled';

class Button extends React.Component {
  scroll = () => {
    this.props.pages();
    scroll.scrollToBottom();
  };

  render() {
    return (
      <LoadMoreButton type="button" onClick={this.scroll}>
        Load More
      </LoadMoreButton>
    );
  }
}

export default Button;
