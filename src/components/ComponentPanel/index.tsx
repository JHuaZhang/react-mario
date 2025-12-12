import React from 'react';
import { Typography } from 'antd';
import type { ComponentConfig } from 'react-mario-core';
import { useComponentRegistry } from 'react-mario-core';
import ComponentItem from './ComponentItem';
import styles from './index.module.css';

const { Title } = Typography;

const ComponentPanel: React.FC = () => {
  const components = useComponentRegistry();
  const allComponents = components.getAllComponents();
  
  let componentList: Array<ComponentConfig> = [];
  allComponents.forEach((item) => {
    componentList.push(item);
  });

  return (
    <div className={styles.componentPanel}>
      <div className={styles.panelHeader}>
        <Title level={4}>组件库</Title>
      </div>
      <div className={styles.componentContainer}>
        {componentList.map((comp) => (
          <ComponentItem key={comp.name} componentConfig={comp} />
        ))}
      </div>
    </div>
  );
};

export default ComponentPanel;
