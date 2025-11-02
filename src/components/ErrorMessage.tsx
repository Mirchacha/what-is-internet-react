import { FC } from 'react';
import { AppError } from '../types';

interface ErrorMessageProps {
  error: AppError | string;
  onRetry?: () => void;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ error, onRetry }) => {
  const message = typeof error === 'string' ? error : error.message;
  const status = typeof error === 'string' ? undefined : error.status;

  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3>Помилка</h3>
        <p>{message}</p>
        {status && <p className="error-status">HTTP {status}</p>}
        {onRetry && (
          <button onClick={onRetry} className="retry-button">
            Спробувати ще раз
          </button>
        )}
      </div>
    </div>
  );
};

