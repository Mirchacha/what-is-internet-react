import { FC } from 'react';
import { BrowserRouter, Link, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import '../styles/globals.css';

const Navigation: FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        🌐 Що таке Інтернет?
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Головна
          </Link>
        </li>
        <li>
          <Link to="/weather" className={isActive('/weather') ? 'active' : ''}>
            Погода
          </Link>
        </li>
        <li>
          <Link to="/crypto" className={isActive('/crypto') ? 'active' : ''}>
            Крипто
          </Link>
        </li>
        <li>
          <Link to="/network" className={isActive('/network') ? 'active' : ''}>
            Мережа
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <Navigation />
        </header>
        <main className="main">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
};

