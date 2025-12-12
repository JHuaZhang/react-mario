import { create } from 'zustand';
import type { ComponentConfig } from 'react-mario-core';
import { v4 as uuidv4 } from 'uuid';

interface Store {
  /** 画布上组件集合 */
  components: ComponentConfig[];
  /** 被选中的组件的id */
  selectedId: string | null;
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
}

export const useStore = create<Store>((set, get) => ({
  /** 画布上组件集合 */
  components: [],
  /** 被选中的组件的id */
  selectedId: null,

  /** 添加组件 */
  addComponent: (component) => {
    const newComponent = {
      ...component,
      id: component.id || uuidv4(),
    };
    set((state) => ({
      components: [...state.components, newComponent],
    }));
  },

  /** 插入组件 */
  insertComponent: (component, index) => {
    const newComponent = {
      ...component,
      id: component.id || uuidv4(),
    };
    set((state) => {
      const newComponents = [...state.components];
      newComponents.splice(index, 0, newComponent);
      return { components: newComponents };
    });
  },

  /** 更新组件 */
  updateComponent: (id, updates) => {
    set((state) => ({
      components: state.components.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp)),
    }));
  },

  /** 删除组件 */
  deleteComponent: (id) => {
    set((state) => ({
      components: state.components.filter((comp) => comp.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    }));
  },

  /** 移动组件 */
  moveComponent: (oldIndex: number, newIndex: number) => {
    console.log(oldIndex, 'oldIndex');
    console.log(newIndex, 'newIndex');
    set((state) => {
      const { components } = state;
      if (
        oldIndex === newIndex ||
        oldIndex < 0 ||
        newIndex < 0 ||
        oldIndex > components.length ||
        newIndex > components.length
      ) {
        return state;
      }
      const newComponents = [...components];
      const [movedItem] = newComponents.splice(oldIndex, 1);
      console.log(movedItem, 'movedItem');
      const insertIndex = oldIndex < newIndex ? newIndex - 1 : newIndex;
      newComponents.splice(insertIndex, 0, movedItem);
      console.log(newComponents, 'newComponents');
      return { components: newComponents };
    });
  },

  /** 选择组件 */
  selectComponent: (id) => {
    set({ selectedId: id });
  },

  /** 获取被选中的组件 */
  getSelectedComponent: () => {
    const { components, selectedId } = get();
    return components.find((comp) => comp.id === selectedId) || null;
  },

  /** 清空组件 */
  clearComponents: () => {
    set({ components: [], selectedId: null });
  },

  /** 导入组件 */
  importComponents: (components) => {
    set({ components, selectedId: null });
  },
}));
