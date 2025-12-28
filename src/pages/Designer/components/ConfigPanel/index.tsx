import { useMemo } from 'react';
import { Drawer } from 'antd';
import { observer } from 'mobx-react-lite';
import { useLocalObservable } from 'mobx-react-lite';
import { useStore } from '@/store/componentStore';
import { ConfigStore, StoreContext } from '@/store/configStore';
import SetConfig from './SetConfig';
import { getComponentCategory } from '../ComponentPanel/config/componentCategories';

const ConfigPanel = observer(() => {
  const { setOpenPropertyPanel, openPropertyPanel, selectedId, components } = useStore();
  const store = useLocalObservable(() => new ConfigStore());

  const currentComponent = useMemo(() => {
    return components.find((item) => item.id === selectedId);
  }, [components, selectedId]);

  // 获取当前组件分类，base基础组件都需要强制重新设置label和name，不然禁止关闭弹窗。
  const currentComponentType = useMemo(() => {
    if (currentComponent) {
      return getComponentCategory(currentComponent.name);
    }
  }, [currentComponent]);

  const onClose = () => {
    setOpenPropertyPanel(false);
  };

  return (
    <StoreContext.Provider value={store}>
      <Drawer title="组件配置" width={500} onClose={onClose} open={openPropertyPanel}>
        {currentComponent && (
          <SetConfig
            currentComponent={currentComponent}
            currentComponentType={currentComponentType}
          />
        )}
      </Drawer>
    </StoreContext.Provider>
  );
});

export default ConfigPanel;
