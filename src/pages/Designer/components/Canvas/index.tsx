import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/useStore';
import type { ComponentConfig } from 'react-mario-core';
import Header from './components/Header';
import styles from './index.module.css';
import RenderComponent from './components/RenderComponent';
import { DROP_TYPES } from '@/types';

const Canvas: React.FC = observer(() => {
  const { components, addComponent, insertComponent, moveComponent, selectComponent } = useStore();
  const dropIndexRef = useRef<number | null>(null);
  // 当前拖拽到的组件索引
  const [visualDropIndex, setVisualDropIndex] = useState<number | null>(null);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [DROP_TYPES.COMPONENT, DROP_TYPES.COMPONENT_ITEM],
      drop: (item: { componentConfig: ComponentConfig; type: DROP_TYPES }) => {
        switch (item.type) {
          case DROP_TYPES.COMPONENT:
            const index = dropIndexRef.current;
            handleDrop(item.componentConfig, index);
            dropIndexRef.current = null;
            setVisualDropIndex(null);
            break;
          case DROP_TYPES.COMPONENT_ITEM:
            if (typeof visualDropIndex === 'number') {
              const itemIndex = components.findIndex(
                (component) => component.id === item.componentConfig.id
              );
              moveComponent(itemIndex, visualDropIndex);
            }
            setVisualDropIndex(null);
            break;
          default:
            break;
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [visualDropIndex]
  );

  const handleDrop = (componentConfig: ComponentConfig, index: number | null = null) => {
    if (index !== null) {
      insertComponent(componentConfig, index);
    } else {
      addComponent(componentConfig);
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dropIndexRef.current = index;
    setVisualDropIndex(index);
  };

  const handleDragLeave = () => {
    dropIndexRef.current = null;
    setVisualDropIndex(null);
  };

  return (
    <div className={styles.canvasContainer}>
      <Header />
      <div
        ref={drop}
        onClick={() => {
          selectComponent(null);
        }}
        className={styles.canvasContent}
        style={{
          backgroundColor: isOver ? '#e6f7ff' : '#fff',
          border: isOver ? '2px dashed #1890ff' : '2px dashed #d9d9d9',
        }}
      >
        {components.length === 0 ? (
          <div className={styles.canvasEmpty}>
            <p>拖拽左侧组件到此处开始设计</p>
          </div>
        ) : (
          <div>
            {components.map((component, index) => (
              <div key={component.id}>
                <div
                  className={styles.dropZone}
                  style={{
                    height: visualDropIndex === index ? '40px' : '4px',
                    backgroundColor: visualDropIndex === index ? '#e6f7ff' : 'transparent',
                    border: visualDropIndex === index ? '2px dashed #1890ff' : 'none',
                  }}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                />
                <RenderComponent component={component} />
              </div>
            ))}
            {components.length > 0 && (
              <div
                className={styles.dropZone}
                style={{
                  height: visualDropIndex === components.length ? '40px' : '4px',
                  backgroundColor:
                    visualDropIndex === components.length ? '#e6f7ff' : 'transparent',
                  border: visualDropIndex === components.length ? '2px dashed #1890ff' : 'none',
                }}
                onDragOver={(e) => handleDragOver(e, components.length)}
                onDragLeave={handleDragLeave}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default Canvas;
