import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal/Modal';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Container } from './App.styled';
import apiFetch from '../../services/fetch-api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../Button/Button';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [photo, setPhoto] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (!search) return;

    apiFetch
      .fetchApi(search, page)
      .then(gallery => {
        console.log(gallery, `gallery 1`);
        if (gallery.hits.length === 0) {
          const notify = () =>
            toast.error(`No result with name ${search}`, {
              position: 'top-center',
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            });

          setStatus('rejected');
          setTotalHits(gallery.hits.length);
          notify();
          return;
        }

        setSpinner(false);
        setImages(images => [...images, ...gallery.hits]);
        setStatus('resolved');
        setTotalHits(gallery.hits.length);
      })
      .catch(error => setStatus('rejected'));
  }, [search, page]);

  const handleButton = () => {
    setPage(page + 1);
    setSpinner(true);
  };

  const toggleModal = photo => {
    setPhoto(photo);
    setShowModal(!showModal);
  };
  const handleFormSubmit = searchInput => {
    if (search === searchInput) return;
    setSearch(searchInput);
    setImages([]);
    setPage(1);

    setStatus('pending');
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      <ImageGallery
        gallery={images}
        onClick={toggleModal}
        status={status}
        spinner={spinner}
      ></ImageGallery>
      {totalHits === 12 && <Button pages={handleButton} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={photo} alt="" />
        </Modal>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        icon={false}
      />
    </Container>
  );
}
