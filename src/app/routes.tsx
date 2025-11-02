import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Weather } from '../pages/Weather';
import { Crypto } from '../pages/Crypto';
import { Network } from '../pages/Network';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/crypto" element={<Crypto />} />
      <Route path="/network" element={<Network />} />
    </Routes>
  );
};

