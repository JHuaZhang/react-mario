import React, { useMemo } from 'react';
import { Typography } from 'antd';
import { useComponentRegistry } from 'react-mario-core';
import { ComponentItemConfig } from '@/types/components';
import Card from './components/Card';
import styles from './index.module.css';
import {
  componentCategories,
  getComponentCategory,
  getComponentCategoriesInfo,
} from './config/componentCategories';
import { getIcon } from './config/iconConfig';

const { Title } = Typography;

const ComponentPanel: React.FC = () => {
  const components = useComponentRegistry();
  const allComponents = components.getAllComponents();

  let componentList: Array<ComponentItemConfig> = [];
  allComponents.forEach((item) => {
    const icon = getIcon(item.component || item.name);
    componentList.push({ ...item, icon });
  });

  // 分类组件,基础组件和业务组件分类等,并给组件增加展示的icon
  const categorizedComponents = useMemo(() => {
    const result: Record<string, ComponentItemConfig[]> = {};
    Object.keys(componentCategories).forEach((category) => {
      result[category] = [];
    });
    Object.values(componentList).forEach((item) => {
      const componentName = item.component || item.name;
      const category = getComponentCategory(componentName);
      result[category].push(item);
    });
    return result;
  }, [componentList]);

  return (
    <div className={styles.componentPanel}>
      <div className={styles.panelHeader}>
        <Title level={4}>React Mario</Title>
      </div>
      <div className={styles.componentContainer}>
        {Object.entries(categorizedComponents).map(([categoryKey, comps]) => {
          if (comps.length === 0) return null;
          const categoryInfo = getComponentCategoriesInfo(
            categoryKey as keyof typeof componentCategories
          );
          return <Card componentList={comps} key={categoryKey} title={categoryInfo.title} />;
        })}
      </div>
    </div>
  );
};

export default ComponentPanel;
