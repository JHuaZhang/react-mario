import { BaseComponent, ComponentClassification } from '@/types/enum';

/** 分类配置 */
export const componentCategories = {
  [ComponentClassification.BASE]: {
    title: '基础组件',
    description: '表单输入、选择等基础交互组件',
    components: BaseComponent.getAll(),
  },
};
/** 获取组件的分类 */
export const getComponentCategory = (componentName: string): string => {
  for (const [category, config] of Object.entries(componentCategories)) {
    if (config.components.includes(componentName)) {
      return category;
    }
  }
  return '';
};

export const getComponentCategoriesInfo = (
  key: keyof typeof componentCategories
): (typeof componentCategories)[keyof typeof componentCategories] => {
  return componentCategories[key];
};
