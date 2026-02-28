import { FormRenderer } from 'react-mario-core';
import { Button } from 'antd';
import { useDrag } from 'react-dnd';
import type { ComponentConfig } from 'react-mario-core';
import { observer } from 'mobx-react-lite';
import { useMemo, useEffect } from 'react';
import { FormModel } from 'react-antd-xform';
import dayjs from 'dayjs';
import { useStore } from '@/store/componentStore';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { DROP_TYPES } from '@/types';
import styles from './index.module.css';

interface Props {
  component: ComponentConfig;
}

const RenderComponent = observer((props: Props) => {
  const { component } = props;
  const { selectedId, selectComponent, deleteComponent, setOpenPropertyPanel } = useStore();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DROP_TYPES.COMPONENT_ITEM,
    item: { componentConfig: component, type: DROP_TYPES.COMPONENT_ITEM },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const isSelected = selectedId === component.id;

  const model = useMemo(() => {
    const formModel = new FormModel<Record<string, any>>({});
    if (component.name && component.defaultProps?.defaultValue !== undefined) {
      let val = component.defaultProps.defaultValue;
      if (['datePicker', 'timePicker'].includes(component.component as string) && typeof val === 'string') {
        val = dayjs(val);
      } else if (['dateRangePicker', 'timeRangePicker'].includes(component.component as string) && Array.isArray(val)) {
        val = val.map((v: any) => v ? dayjs(v) : v);
      }
      formModel.values[component.name] = val;
    }
    return formModel;
  }, [component.defaultProps?.defaultValue, component.name, component.component]);

  useEffect(() => {
    if (component.name && component.defaultProps?.defaultValue !== undefined) {
      const currentValue = model.values[component.name];
      const nextValue = component.defaultProps.defaultValue;
      
      const isDifferent = (() => {
        if (currentValue === nextValue) return false;
        if (typeof currentValue === 'object' && typeof nextValue === 'object' && currentValue !== null && nextValue !== null) {
          return JSON.stringify(currentValue) !== JSON.stringify(nextValue);
        }
        return true;
      })();

      if (isDifferent) {
        let val = nextValue;
        if (['datePicker', 'timePicker'].includes(component.component as string) && typeof val === 'string') {
          val = dayjs(val);
        } else if (['dateRangePicker', 'timeRangePicker'].includes(component.component as string) && Array.isArray(val)) {
          val = val.map((v: any) => v ? dayjs(v) : v);
        }
        model.values[component.name] = val;
      }
    } else {
      if (component.name && model.values[component.name] !== undefined) {
        model.values[component.name] = undefined;
      }
    }
  }, [component.defaultProps?.defaultValue, component.name, model]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component.id) {
      selectComponent(component.id);
    } else {
      selectComponent(null);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component.id) {
      setOpenPropertyPanel(true);
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

  const handleSetting = () => {
    setOpenPropertyPanel(true);
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
      onDoubleClick={handleDoubleClick}
    >
      <FormRenderer config={[component]} showButtons={false} model={model} />
      {isSelected && (
        <div className={styles.componentActions}>
          <div className={styles.action}>
            <Button type="text" size="small" icon={<SettingOutlined />} onClick={handleSetting} />
          </div>
          <div className={styles.action}>
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default RenderComponent;
