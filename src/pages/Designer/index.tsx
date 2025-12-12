import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Layout } from 'antd';
import ComponentPanel from '@/components/ComponentPanel';
import Canvas from '@/components/Canvas';
import PropertyPanel from '@/components/PropertyPanel';
import { ComponentProvider } from 'react-mario-core';

const { Sider, Content } = Layout;

const Designer: React.FC = () => {
  return (
    <ComponentProvider components={[]}>
      <DndProvider backend={HTML5Backend}>
        <Layout style={{ height: '100vh' }}>
          <Sider width={250} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
            <ComponentPanel />
          </Sider>
          <Content style={{ display: 'flex', flexDirection: 'column' }}>
            <Canvas />
          </Content>
          <Sider width={300} theme="light" style={{ borderLeft: '1px solid #f0f0f0' }}>
            <PropertyPanel />
          </Sider>
        </Layout>
      </DndProvider>
    </ComponentProvider>
  );
};

export default Designer;
