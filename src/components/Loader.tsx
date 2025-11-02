import { FC } from 'react';
import styles from '../styles/globals.css';

export const Loader: FC = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Завантаження...</p>
    </div>
  );
};

