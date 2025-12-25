import { Popover } from 'antd';
import { useDrag } from 'react-dnd';
import { EyeOutlined } from '@ant-design/icons';
import { FormRenderer } from 'react-mario-core';
import { DROP_TYPES } from '@/types';
import styles from './index.module.css';
import { ComponentItemConfig } from '@/types/components';

interface ComponentItemProps {
  componentItemConfig: ComponentItemConfig;
}
const ComponentItem = (props: ComponentItemProps) => {
  const { componentItemConfig } = props;
  const { icon, ...componentConfig } = componentItemConfig;

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
      <div className={styles.componentIconContainer}>
        <div className={styles.componentIcon}>{icon}</div>
        <div className={styles.componentName}>
          {componentConfig?.label}
          <Popover
            content={<FormRenderer showButtons={false} config={[componentConfig]} />}
            trigger="click"
          >
            <EyeOutlined />
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ComponentItem;
