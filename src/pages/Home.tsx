import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';

export const Home: FC = () => {
  return (
    <div className="page-container">
      <Card title="Що таке Інтернет?">
        <div className="intro">
          <p>
            Інтернет — це глобальна мережа, що з'єднує мільярди пристроїв по всьому світу.
            Через неї ми можемо отримувати інформацію, спілкуватися та користуватися сервісами.
          </p>
          <p>
            Цей додаток демонструє, як ваш браузер робить запити до публічних API
            і отримує дані в реальному часі.
          </p>
        </div>
        
        <div className="demo-grid">
          <Link to="/weather" className="demo-card">
            <span className="emoji">🌤️</span>
            <h3>Погода</h3>
            <p>Погода за вашою геолокацією</p>
          </Link>
          
          <Link to="/crypto" className="demo-card">
            <span className="emoji">💰</span>
            <h3>Криптовалюти</h3>
            <p>Топ-10 монет з CoinGecko</p>
          </Link>
          
          <Link to="/network" className="demo-card">
            <span className="emoji">🌐</span>
            <h3>Мережа</h3>
            <p>Ваш IP та випадкові факти</p>
          </Link>
        </div>
      </Card>
    </div>
  );
};

