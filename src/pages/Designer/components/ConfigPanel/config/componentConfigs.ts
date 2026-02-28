import { FormItemConfig } from 'react-mario-core';

export const baseConfig: FormItemConfig[] = [
  { name: 'name', label: '字段标识', component: 'input', required: true },
  { name: 'label', label: '字段名称', component: 'input', required: true },
];

export const placeholderConfig: FormItemConfig = {
  name: 'defaultProps.placeholder',
  label: '占位提示',
  component: 'input',
};

export const allowClearConfig: FormItemConfig = {
  name: 'defaultProps.allowClear',
  label: '允许清空',
  component: 'switch',
};

export const disabledConfig: FormItemConfig = {
  name: 'defaultProps.disabled',
  label: '禁用状态',
  component: 'switch',
};

export const defaultValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'input',
};

export const defaultNumberValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'inputNumber',
};

export const defaultSwitchValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'switch',
};

export const defaultComplexValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'textArea',
  help: '多选或范围请填JSON数组，如 ["1", "2"]',
  componentProps: {
    rows: 2,
  },
};


export const optionsConfig: FormItemConfig = {
  name: 'defaultProps.options',
  label: '选项配置',
  // 使用 json 格式配置，或者多行文本
  component: 'textArea',
  help: '请填入合法的JSON数组，例如: [{"label": "选项1", "value": "1"}]',
  componentProps: {
    rows: 4,
  },
};

export const componentConfigMap: Record<string, FormItemConfig[]> = {
  input: [
    ...baseConfig,
    defaultValueConfig,
    placeholderConfig,
    allowClearConfig,
    disabledConfig,
  ],
  select: [
    ...baseConfig,
    defaultValueConfig,
    placeholderConfig,
    allowClearConfig,
    disabledConfig,
    optionsConfig,
  ],
  multiSelect: [
    ...baseConfig,
    defaultComplexValueConfig,
    placeholderConfig,
    allowClearConfig,
    disabledConfig,
    optionsConfig,
  ],
  radio: [
    ...baseConfig,
    defaultValueConfig,
    disabledConfig,
    optionsConfig,
  ],
  checkbox: [
    ...baseConfig,
    defaultComplexValueConfig,
    disabledConfig,
    optionsConfig,
  ],
  datePicker: [
    ...baseConfig,
    defaultValueConfig,
    placeholderConfig,
    disabledConfig,
  ],
  dateRangePicker: [
    ...baseConfig,
    defaultComplexValueConfig,
    disabledConfig,
  ],
  timePicker: [
    ...baseConfig,
    defaultValueConfig,
    placeholderConfig,
    disabledConfig,
  ],
  timeRangePicker: [
    ...baseConfig,
    defaultComplexValueConfig,
    disabledConfig,
  ],
  textArea: [
    ...baseConfig,
    defaultValueConfig,
    placeholderConfig,
    allowClearConfig,
    disabledConfig,
  ],
  inputNumber: [
    ...baseConfig,
    defaultNumberValueConfig,
    placeholderConfig,
    disabledConfig,
  ],
  slider: [
    ...baseConfig,
    defaultNumberValueConfig,
    disabledConfig,
  ],
  switch: [
    ...baseConfig,
    defaultSwitchValueConfig,
    disabledConfig,
  ],
  rate: [
    ...baseConfig,
    defaultNumberValueConfig,
    disabledConfig,
  ],
  colorPicker: [
    ...baseConfig,
    defaultValueConfig,
    disabledConfig,
  ],
};
