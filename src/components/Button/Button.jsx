import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { LoadMoreButton } from './Button.styled';

export default function Button({ pages }) {
  const scrollToBtn = () => {
    pages();
    scroll.scrollToBottom();
  };

  return (
    <LoadMoreButton type="button" onClick={scrollToBtn}>
      Load More
    </LoadMoreButton>
  );
}
