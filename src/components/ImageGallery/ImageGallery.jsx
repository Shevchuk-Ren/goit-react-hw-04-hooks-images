import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import ImageGalleryItem from '../ImageGalleryItem';
import Spinner from '../Loader';
import { List } from './ImageGallery.styled';
import { Wrapper } from '../Loader/Loader.styled';

export default function ImageGallery({ onClick, status, gallery, spinner }) {
  const toggleModal = largeImage => {
    onClick(largeImage);
  };

  if (status === 'idle') {
    return <div></div>;
  }
  if (status === 'pending') {
    return <Spinner type="ThreeDots" color="#00BFFF" height={80} width={80} />;
  }
  if (status === 'resolved') {
    return (
      <Wrapper>
        <List className="ImageGallery">
          {gallery.map(({ webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={uuidv4()}
              webformatURL={webformatURL}
              largeImage={largeImageURL}
              onClick={toggleModal}
              alt={tags}
            />
          ))}
        </List>
        {spinner && (
          <Spinner type="ThreeDots" color="#00BFFF" height={80} width={80} />
        )}
      </Wrapper>
    );
  }
  if (status === 'rejected') {
    return <div></div>;
  }
}

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  status: PropTypes.func.isRequired,
  gallery: PropTypes.func.isRequired,
  spinner: PropTypes.func.isRequired,
};
