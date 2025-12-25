import React from 'react';
import { Layout } from 'antd';
import { DndProvider } from 'react-dnd';
import { ComponentProvider } from 'react-mario-core';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ComponentPanel from './components/ComponentPanel';
import Canvas from './components/Canvas';
import ConfigPanel from './components/ConfigPanel';

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
          <ConfigPanel />
        </Layout>
      </DndProvider>
    </ComponentProvider>
  );
};

export default Designer;
