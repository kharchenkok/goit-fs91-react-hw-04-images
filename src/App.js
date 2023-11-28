import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImagesWithSearch } from './services/fetchImages';
import Searchbar from './components/Searchbar';
import Button from './components/Button';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Modal from './components/Modal';
import { showError, showWarning } from './utils/ToastNotification';

function App() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);
  const [gallery, setGallery] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoadButton, setShowLoadButton] = useState(false);

  const searchSubmit = useCallback(
    newQuery => {
      if (query === newQuery) return;
      setQuery(newQuery);
      setCurrentPage(1);
      setGallery([]);
    },
    [query]
  );

  const onloadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const onImageClick = imageData => {
    const { largeImageURL, tags } = imageData;
    setCurrentImage({ src: largeImageURL, alt: tags });
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  useEffect(() => {
    if (!query) return;
    const fetchImages = () => {
      setShowLoader(true);
      getImagesWithSearch(query, currentPage, perPage)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) showWarning('No images found');
          const shouldShowLoadButton = !(
            hits.length === 0 || Math.ceil(totalHits / perPage) === currentPage
          );
          setGallery(prevGallery => [...prevGallery, ...hits]);
          setShowLoadButton(shouldShowLoadButton);
        })
        .catch(error => showError(error.message))
        .finally(() => {
          setShowLoader(false);
        });
    };

    fetchImages();
  }, [query, currentPage, perPage]);

  return (
    <>
      <ToastContainer />
      <Searchbar onSubmit={searchSubmit} />
      <div className={'App'}>
        {gallery.length > 0 && (
          <ImageGallery images={gallery} onImageClick={onImageClick} />
        )}
        {showLoader && <Loader />}
        {showLoadButton && <Button onClick={onloadMore}>Load More</Button>}
      </div>
      {showModal && currentImage && (
        <Modal close={toggleModal}>
          <img src={currentImage.src} alt={currentImage.alt} />
        </Modal>
      )}
    </>
  );
}

export default App;
