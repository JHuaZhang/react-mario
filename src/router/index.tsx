import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/Dashboard';
import Designer from '@/pages/Designer/index';
import Builder from '@/pages/Builder/index';
import TemplateList from '@/pages/TemplateList';
import TemplateWizard from '@/pages/TemplateWizard';

const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* 后台管理页面 */}
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/templates" element={<TemplateList />} />
          <Route path="/templates/create" element={<TemplateWizard />} />
          <Route path="/templates/edit/:id" element={<TemplateWizard />} />
          <Route path="/builder" element={<Builder />} />
        </Route>

        {/* 独立全屏页面（设计器不需要后台布局） */}
        <Route path="/designer" element={<Designer />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
