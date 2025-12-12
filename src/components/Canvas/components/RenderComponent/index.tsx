import { FormRenderer } from 'react-mario-core';
import type { ComponentConfig } from 'react-mario-core';
import { useStore } from '@/store/useStore';
import styles from './index.module.css';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDrag } from 'react-dnd';
import { DROP_TYPES } from '@/types';

interface Props {
  component: ComponentConfig;
}

const RenderComponent = (props: Props) => {
  const { component } = props;
  const { selectedId, selectComponent, deleteComponent } = useStore();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DROP_TYPES.COMPONENT_ITEM,
    item: { componentConfig: component, type: DROP_TYPES.COMPONENT_ITEM },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const isSelected = selectedId === component.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component.id) {
      selectComponent(component.id);
    } else {
      selectComponent(null);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!component.id) {
      return;
    }
    deleteComponent(component.id);
  };

  return (
    <div
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      ref={drag}
      className={`${styles.renderComponent} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <FormRenderer config={[component]} showButtons={false} />
      {isSelected && (
        <div className={styles.componentActions}>
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default RenderComponent;
