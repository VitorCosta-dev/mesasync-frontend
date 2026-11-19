import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import EmentaDigital from './pages/ementa/EmentaDigital';
import HistoricoCaixa from './pages/caixa/HistoricoCaixa';
import './style.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ementa" element={<EmentaDigital />} />
      <Route path="/caixa" element={<HistoricoCaixa />} />
    </Routes>
  </BrowserRouter>
);