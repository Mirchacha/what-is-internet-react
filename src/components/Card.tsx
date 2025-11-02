import { FC, ReactNode } from 'react';
import styles from '../styles/card.module.css';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

