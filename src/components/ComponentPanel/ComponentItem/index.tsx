import React from 'react';
import { useDrag } from 'react-dnd';
import { Popover } from 'antd';
import { FormRenderer } from 'react-mario-core';
import type { ComponentConfig } from 'react-mario-core';
import { DROP_TYPES } from '@/types';
import { EyeOutlined } from '@ant-design/icons';
import styles from './index.module.css';

interface ComponentItemProps {
  componentConfig: ComponentConfig;
}
const ComponentItem: React.FC<ComponentItemProps> = ({ componentConfig }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DROP_TYPES.COMPONENT,
    item: { componentConfig, type: DROP_TYPES.COMPONENT },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      className={styles.componentItem}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <div className={styles.componentLabel}>
        <span style={{ marginRight: 4 }}>{componentConfig?.label}</span>
        <Popover
          content={<FormRenderer showButtons={false} config={[componentConfig]} />}
          trigger="click"
        >
          <EyeOutlined />
        </Popover>
      </div>
    </div>
  );
};

export default ComponentItem;
