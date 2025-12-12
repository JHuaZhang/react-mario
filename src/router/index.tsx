import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Designer from '@/pages/Designer/index';
import Builder from '@/pages/Builder/index';

const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/designer" replace />} />
        <Route path="/designer" element={<Designer />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
