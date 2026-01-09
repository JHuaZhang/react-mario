import { useMemo } from 'react';
import { Drawer } from 'antd';
import { observer } from 'mobx-react-lite';
import { useLocalObservable } from 'mobx-react-lite';
import { useStore } from '@/store/componentStore';
import { ConfigStore, StoreContext } from '@/store/configStore';
import SetConfig from './SetConfig';
import styles from './index.module.css';

const ConfigPanel = observer(() => {
  const {
    setOpenPropertyPanel,
    openPropertyPanel,
    selectedId,
    components,
    setIsFirstSetting,
    isFirstSetting,
  } = useStore();
  const store = useLocalObservable(() => new ConfigStore());

  const currentComponent = useMemo(() => {
    return components.find((item) => item.id === selectedId);
  }, [components, selectedId]);

  const onClose = () => {
    setOpenPropertyPanel(false);
    setIsFirstSetting(false);
  };

  return (
    <StoreContext.Provider value={store}>
      <Drawer
        closable={!isFirstSetting}
        maskClosable={!isFirstSetting}
        title={
          <div>
            组件配置<span className={styles.warnText}>默认组件需强制设置带*号属性</span>
          </div>
        }
        width={500}
        onClose={onClose}
        open={openPropertyPanel}
      >
        {currentComponent && <SetConfig currentComponent={currentComponent} />}
      </Drawer>
    </StoreContext.Provider>
  );
});

export default ConfigPanel;
