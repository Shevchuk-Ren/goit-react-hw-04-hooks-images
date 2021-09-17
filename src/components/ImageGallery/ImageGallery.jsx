import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import ImageGalleryItem from '../ImageGalleryItem';
import apiFetch from '../../services/fetch-api';
import Spinner from '../Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { List } from './ImageGallery.styled';
import { Wrapper } from '../Loader/Loader.styled';

class ImageGallery extends React.Component {
  static defaultProps = {
    totalHits: 0,
    gallery: [],
    page: 1,
    status: 'idle',
  };
  state = {
    totalHits: this.props.totalHits,
    gallery: this.props.gallery,
    page: this.props.page,
    status: this.props.status,
    spinner: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const currentSearch = this.props.search;
    const prevSearch = prevProps.search;
    const currentPage = this.state.page;
    const prevPage = prevState.page;
    const prevGallery = this.state.gallery;

    if (currentSearch !== prevSearch) {
      this.setState({ status: 'pending', gallery: [], page: 1 });
   

      apiFetch
        .fetchApi(currentSearch, currentPage)
        .then(gallery => {
          if (gallery.hits.length === 0) {
            const notify = () =>
              toast.error(`No result with name ${currentSearch}`, {
                position: 'top-center',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
              });

            this.setState({
              status: 'rejected',
            });
            notify();
            return;
          }
          this.setState({
            gallery: gallery.hits,
            status: 'resolved',
            totalHits: gallery.hits.length,
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (currentPage !== prevPage) {
      this.setState({ spinner: true });

      apiFetch
        .fetchApi(currentSearch, currentPage)
        .then(gallery => {
          this.setState({
            spinner: false,
            gallery: [...prevGallery, ...gallery.hits],
            totalHits: gallery.hits.length,
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleButton = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  toggleModal = largeImage => {
    this.props.onClick(largeImage);
  };

  render() {
    const { gallery, status, totalHits, spinner } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }
    if (status === 'pending') {
      return (
        <Spinner type="ThreeDots" color="#00BFFF" height={80} width={80} />
      );
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
                onClick={this.toggleModal}
                alt={tags}
              />
            ))}
          </List>
          {spinner && (
            <Spinner type="ThreeDots" color="#00BFFF" height={80} width={80} />
          )}
          {totalHits === 12 && <Button pages={this.handleButton} />}
        </Wrapper>
      );
    }
    if (status === 'rejected') {
      return <div></div>;
    }
  }
}

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default ImageGallery;
