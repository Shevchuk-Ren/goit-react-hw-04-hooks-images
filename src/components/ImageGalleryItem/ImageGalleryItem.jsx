import React from 'react';
import PropTypes from 'prop-types';
import { Item, ItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImage, onClick, alt }) => (
  <Item onClick={() => onClick(largeImage)}>
    <ItemImage src={webformatURL} alt={alt} />
  </Item>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
