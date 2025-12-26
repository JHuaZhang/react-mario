import { useMemo } from 'react';
import { Drawer } from 'antd';
import { useStore } from '@/store/useStore';

const ConfigPanel = () => {
  const { setOpenPropertyPanel, openPropertyPanel, selectedId, components } = useStore();

  const currentComponent = useMemo(() => {
    return components.find((item) => item.id === selectedId);
  }, [components, selectedId]);

  console.log(currentComponent, 'currentComponent');

  const onClose = () => {
    setOpenPropertyPanel(false);
  };

  return (
    <Drawer title="组件配置" onClose={onClose} open={openPropertyPanel}>
      {selectedId}
    </Drawer>
  );
};

export default ConfigPanel;
