import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Designer from '@/pages/Designer/index';
import Builder from '@/pages/Builder/index';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/designer" replace />} />
        <Route path="/designer" element={<Designer />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
