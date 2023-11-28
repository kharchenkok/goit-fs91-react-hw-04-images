import React, { Component } from 'react';
import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { image, onClick } = this.props;

    return (
      <li className={styles.ImageGalleryItem} onClick={() => onClick(image)}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={styles.ImageGalleryItemImage}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
