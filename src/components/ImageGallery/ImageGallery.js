import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';

class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;

    return (
      <ul className={styles.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={onImageClick}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
