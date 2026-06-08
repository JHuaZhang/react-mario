/** 基础组件枚举 */
export enum BaseComponent {
  Input = 'input',
  Select = 'select',
  MultiSelect = 'multiSelect',
  Radio = 'radio',
  Checkbox = 'checkbox',
  DatePicker = 'datePicker',
  DateRangePicker = 'dateRangePicker',
  TimePicker = 'timePicker',
  TimeRangePicker = 'timeRangePicker',
  TextArea = 'textArea',
  InputNumber = 'inputNumber',
  Slider = 'slider',
  Switch = 'switch',
  Rate = 'rate',
  ColorPicker = 'colorPicker',
}

export namespace BaseComponent {
  export function getAll(): string[] {
    return Object.values(BaseComponent).filter((value) => typeof value === 'string') as string[];
  }
}

/** 组件分类 */
export enum ComponentClassification {
  /** 基础组件 */
  BASE = 'base',
}

/** 模板状态 */
export enum TemplateStatus {
  /** 草稿 */
  DRAFT = 'draft',
  /** 已提交 */
  SUBMITTED = 'submitted',
}

/** 向导步骤 */
export enum WizardStep {
  /** 基本信息 */
  BASIC_INFO = 0,
  /** 玩法搭建 */
  BUILD = 1,
  /** 活动配置 */
  ACTIVITY_CONFIG = 2,
  /** 提交 */
  SUBMIT = 3,
}
