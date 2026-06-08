import React from 'react';
import { Layout } from 'antd';
import { DndProvider } from 'react-dnd';
import { ComponentProvider } from 'react-mario-core';
import { useLocalObservable } from 'mobx-react-lite';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ComponentStore, StoreContext } from '@/store/componentStore';
import ComponentPanel from './components/ComponentPanel';
import Canvas from './components/Canvas';
import ConfigPanel from './components/ConfigPanel';

const { Sider, Content } = Layout;

interface DesignerProps {
  /** 可选外部 store，向导内嵌时传入以便读写画布 schema；不传则自建（独立 /designer 路由使用） */
  store?: ComponentStore;
}

const Designer: React.FC<DesignerProps> = ({ store: externalStore }) => {
  const localStore = useLocalObservable(() => new ComponentStore());
  const store = externalStore || localStore;
  return (
    <StoreContext.Provider value={store}>
      <ComponentProvider components={[]}>
        <DndProvider backend={HTML5Backend}>
          <Layout style={{ height: '100%' }}>
            <Sider width={280} theme="light" style={{ borderRight: '1px solid #f0f0f0', overflow: 'auto' }}>
              <ComponentPanel />
            </Sider>
            <Content style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
              <Canvas />
            </Content>
            <ConfigPanel />
          </Layout>
        </DndProvider>
      </ComponentProvider>
    </StoreContext.Provider>
  );
};

export default Designer;
