import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={styles.ImageGalleryItem} onClick={() => onClick(image)}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
