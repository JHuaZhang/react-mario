import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import type { ComponentConfig } from 'react-mario-core';
import { v4 as uuidv4 } from 'uuid';
interface Store {
  /** 画布上组件集合 */
  components: ComponentConfig[];
  /** 被选中的组件的id */
  selectedId: string | null;
  /** 打开组件设置区 */
  openPropertyPanel: boolean;
  /** 添加组件 */
  addComponent: (component: ComponentConfig) => void;
  /** 插入组件 */
  insertComponent: (component: ComponentConfig, index: number) => void;
  /** 更新组件 */
  updateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
  /** 删除组件 */
  deleteComponent: (id: string) => void;
  /** 选择组件 */
  selectComponent: (id: string | null) => void;
  /** 获取被选中的组件 */
  getSelectedComponent: () => ComponentConfig | null;
  /** 清空组件 */
  clearComponents: () => void;
  /** 导入组件 */
  importComponents: (components: ComponentConfig[]) => void;
  /** 移动组件 */
  moveComponent: (oldIndex: number, newIndex: number) => void;
  /** 打开组件设置区方法 */
  setOpenPropertyPanel: (open: boolean) => void;
}

export class ComponentStore implements Store {
  /** 画布上组件集合 */
  components: ComponentConfig[] = [];
  /** 被选中的组件的id */
  selectedId: string | null = null;
  /** 打开组件设置区 */
  openPropertyPanel = false;
  constructor() {
    makeAutoObservable(this, {});
  }

  /** 添加组件 */
  addComponent = (component: ComponentConfig) => {
    const newComponent = {
      ...component,
      id: component.id || uuidv4(),
    };
    runInAction(() => {
      this.components = [...this.components, newComponent];
    });
  };

  /** 插入组件 */
  insertComponent = (component: ComponentConfig, index: number) => {
    const newComponent = {
      ...component,
      id: component.id || uuidv4(),
    };
    runInAction(() => {
      const newComponents = [...this.components];
      newComponents.splice(index, 0, newComponent);
      this.components = newComponents;
    });
  };

  /** 更新组件 */
  updateComponent = (id: string, updates: Partial<ComponentConfig>) => {
    runInAction(() => {
      this.components = this.components.map((comp) =>
        comp.id === id ? { ...comp, ...updates } : comp
      );
    });
  };

  /** 删除组件 */
  deleteComponent = (id: string) => {
    runInAction(() => {
      this.components = this.components.filter((comp) => comp.id !== id);
      if (this.selectedId === id) {
        this.selectedId = null;
      }
    });
  };

  /** 移动组件 */
  moveComponent = (oldIndex: number, newIndex: number) => {
    runInAction(() => {
      const { components } = this;
      if (
        oldIndex === newIndex ||
        oldIndex < 0 ||
        newIndex < 0 ||
        oldIndex >= components.length ||
        newIndex >= components.length
      ) {
        return;
      }
      const newComponents = [...components];
      const [movedItem] = newComponents.splice(oldIndex, 1);
      const insertIndex = oldIndex < newIndex ? newIndex - 1 : newIndex;
      newComponents.splice(insertIndex, 0, movedItem);
      this.components = newComponents;
    });
  };

  /** 选择组件 */
  selectComponent = (id: string | null) => {
    runInAction(() => {
      this.selectedId = id;
    });
  };

  /** 获取被选中的组件 */
  getSelectedComponent = (): ComponentConfig | null => {
    return this.components.find((comp) => comp.id === this.selectedId) || null;
  };

  /** 清空组件 */
  clearComponents = () => {
    runInAction(() => {
      this.components = [];
      this.selectedId = null;
    });
  };

  /** 导入组件 */
  importComponents = (components: ComponentConfig[]) => {
    runInAction(() => {
      this.components = components;
      this.selectedId = null;
    });
  };

  /** 打开/关闭组件设置区方法 */
  setOpenPropertyPanel = (open: boolean) => {
    runInAction(() => {
      this.openPropertyPanel = open;
    });
  };
}

export const StoreContext = React.createContext<ComponentStore>({} as ComponentStore);

export function useStore() {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.');
  }
  return store;
}
