export interface DragItem {
  type: string;
  componentType: string;
  id?: string;
}

export enum DROP_TYPES {
   /** 组件区拖拽过来的组件 */
  COMPONENT = 'component',
  /** 画布区的组件进行拖拽排序 */
  COMPONENT_ITEM = 'componentItem',
}
