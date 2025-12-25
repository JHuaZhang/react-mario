import { Drawer } from 'antd';
import { useStore } from '@/store/useStore';

const ConfigPanel = () => {
  const { setOpenPropertyPanel, openPropertyPanel } = useStore();

  const onClose = () => {
    setOpenPropertyPanel(false);
  };

  return (
    <Drawer title="组件配置" onClose={onClose} open={openPropertyPanel}>
      index
    </Drawer>
  );
};

export default ConfigPanel;
