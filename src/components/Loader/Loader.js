import { MagnifyingGlass } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.LoaderWrapper}>
      <MagnifyingGlass
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};

export default Loader;
