import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImagesWithSearch } from './services/fetchImages';
import Searchbar from './components/Searchbar';
import Button from './components/Button';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Modal from './components/Modal';
import { showError, showWarning } from './utils/ToastNotification';

class App extends Component {
  state = {
    query: '',
    currentPage: 1,
    perPage: 12,
    gallery: [],
    currentImage: null,
    showLoader: false,
    showModal: false,
    showLoadButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, currentPage } = this.state;
    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      this.handleFetchImages();
    }
  }

  searchSubmit = query => {
    this.setState(prevState => {
      if (prevState.query === query) {
        return;
      }
      return { query, currentPage: 1, gallery: [] };
    });
  };

  onloadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  shouldShowLoadButton = (hits, totalHits) => {
    const { currentPage, perPage } = this.state;
    return !(
      hits.length === 0 || Math.ceil(totalHits / perPage) === currentPage
    );
  };

  onImageClick = imageData => {
    const { largeImageURL, tags } = imageData;
    this.setState({
      currentImage: { src: largeImageURL, alt: tags },
      showModal: true,
    });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFetchImages = () => {
    const { query, currentPage, perPage } = this.state;
    this.setState({ showLoader: true });
    getImagesWithSearch(query, currentPage, perPage)
      .then(({ hits, totalHits }) => {
        hits.length === 0 && showWarning('No images found');
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...hits],
          showLoadButton: this.shouldShowLoadButton(hits, totalHits),
        }));
      })
      .catch(error => showError(error.message))
      .finally(() => {
        this.setState({ showLoader: false });
      });
  };

  render() {
    const { showLoadButton, gallery, showLoader, showModal, currentImage } =
      this.state;
    return (
      <>
        <ToastContainer />
        <Searchbar onSubmit={this.searchSubmit} />
        <div className={'App'}>
          {gallery.length > 0 && (
            <ImageGallery images={gallery} onImageClick={this.onImageClick} />
          )}
          {showLoader && <Loader />}
          {showLoadButton && (
            <Button onClick={this.onloadMore}>Load More</Button>
          )}
        </div>
        {showModal && currentImage && (
          <Modal close={this.toggleModal}>
            <img src={currentImage.src} alt={currentImage.alt} />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
